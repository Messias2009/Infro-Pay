import { collection, doc, getDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { firestore, auth } from "@/lib/firebase-config";
import { getProducerProducts } from "./products.service";

export interface WalletData {
  producer_id: string;
  available_cents: number;
  pending_cents: number;
  currency: string;
}

export interface FinanceOverviewData {
  today: { gross: number; count: number };
  week: { gross: number; count: number };
  month: { gross: number; count: number };
  avgTicket: number;
  salesCount: number;
  totalGross: number;
  totalNet: number;
  totalFees: number;
  totalViews: number;
  conversion: number;
  series: { date: string; gross: number; net: number; count: number }[];
  seriesDaily: { label: string; gross: number; net: number; count: number }[];
  seriesWeekly: { label: string; gross: number; net: number; count: number }[];
  seriesMonthly: { label: string; gross: number; net: number; count: number }[];
  seriesYearly: { label: string; gross: number; net: number; count: number }[];
  topProducts: any[];
}

export async function getProducerWalletFirestore(userId?: string): Promise<WalletData> {
  const uid = userId || auth.currentUser?.uid;
  if (!uid) {
    return { producer_id: "", available_cents: 0, pending_cents: 0, currency: "AOA" };
  }

  try {
    const walletRef = doc(firestore, "wallets", uid);
    const snap = await getDoc(walletRef);
    if (snap.exists()) {
      const d = snap.data();
      return {
        producer_id: uid,
        available_cents: Math.round(
          (d.availableBalance ?? d.available_cents ?? 0) *
            (typeof d.availableBalance === "number" ? 100 : 1),
        ),
        pending_cents: Math.round(
          (d.pendingBalance ?? d.pending_cents ?? 0) *
            (typeof d.pendingBalance === "number" ? 100 : 1),
        ),
        currency: "AOA",
      };
    }
  } catch (err) {
    console.warn("Erro ao ler carteira no Firestore:", err);
  }

  return { producer_id: uid, available_cents: 0, pending_cents: 0, currency: "AOA" };
}

export async function getProducerFinanceOverviewFirestore(
  userId?: string,
): Promise<FinanceOverviewData> {
  const uid = userId || auth.currentUser?.uid;
  const prods = await getProducerProducts(uid);
  const totalViews = prods.reduce((acc, p) => acc + (p.views_count || 0), 0);

  const salesRows: any[] = [];
  if (uid) {
    try {
      const salesRef = collection(firestore, "sales");
      const snap = await getDocs(salesRef);
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        if (d.sellerId === uid || d.producer_id === uid || d.userId === uid) {
          salesRows.push({ id: docSnap.id, ...d });
        }
      });
    } catch (err) {
      console.warn("Erro ao buscar vendas no Firestore:", err);
    }
  }

  const paidSales = salesRows.filter((s) => s.status === "paid" || s.status === "pago");
  const salesCount = paidSales.length;

  let totalGrossCents = 0;
  let totalNetCents = 0;
  let totalFeesCents = 0;

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfWeek = now.getTime() - 7 * 24 * 60 * 60 * 1000;
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  let todayGross = 0;
  let todayCount = 0;
  let weekGross = 0;
  let weekCount = 0;
  let monthGross = 0;
  let monthCount = 0;

  paidSales.forEach((s) => {
    const gross = Math.round(
      (s.grossAmount ?? s.gross_cents ?? 0) * (typeof s.grossAmount === "number" ? 100 : 1),
    );
    const net = Math.round(s.sellerNetAmount ?? s.net_cents ?? gross * 0.98);
    const fee = Math.round(s.platformFeeAmount ?? s.platform_fee_cents ?? gross * 0.02);

    totalGrossCents += gross;
    totalNetCents += net;
    totalFeesCents += fee;

    const createdAtTime = new Date(s.createdAt || s.created_at || now).getTime();
    if (createdAtTime >= startOfDay) {
      todayGross += gross;
      todayCount += 1;
    }
    if (createdAtTime >= startOfWeek) {
      weekGross += gross;
      weekCount += 1;
    }
    if (createdAtTime >= startOfMonth) {
      monthGross += gross;
      monthCount += 1;
    }
  });

  const avgTicket = salesCount > 0 ? Math.round(totalGrossCents / salesCount) : 0;
  const conversion = totalViews > 0 ? (salesCount / totalViews) * 100 : 0;

  // Generate 14 days chart series
  const series: { date: string; gross: number; net: number; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}`;
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;

    const daySales = paidSales.filter((s) => {
      const t = new Date(s.createdAt || s.created_at || now).getTime();
      return t >= dayStart && t < dayEnd;
    });

    const dayGross = daySales.reduce(
      (acc, s) =>
        acc +
        Math.round(
          (s.grossAmount ?? s.gross_cents ?? 0) * (typeof s.grossAmount === "number" ? 100 : 1),
        ),
      0,
    );
    const dayNet = daySales.reduce(
      (acc, s) =>
        acc +
        Math.round(s.sellerNetAmount ?? s.net_cents ?? (s.grossAmount ? s.grossAmount * 98 : 0)),
      0,
    );

    series.push({
      date: label,
      gross: dayGross,
      net: dayNet,
      count: daySales.length,
    });
  }

  const seriesDaily = series.map((s) => ({ label: s.date, ...s }));

  // Top products by sales & revenue for this producer only
  const prodMap: Record<
    string,
    { id: string; title: string; cover_url?: string; count: number; net: number }
  > = {};
  prods.forEach((p) => {
    prodMap[p.id] = {
      id: p.id,
      title: p.title,
      cover_url: p.cover_url || undefined,
      count: 0,
      net: 0,
    };
  });

  paidSales.forEach((s) => {
    const prodId = s.productId || s.product_id;
    if (prodId && prodMap[prodId]) {
      prodMap[prodId].count += 1;
      const gross = Math.round(
        (s.grossAmount ?? s.gross_cents ?? 0) * (typeof s.grossAmount === "number" ? 100 : 1),
      );
      const net = Math.round(s.sellerNetAmount ?? s.net_cents ?? gross * 0.98);
      prodMap[prodId].net += net;
    }
  });

  const topProducts = Object.values(prodMap)
    .filter((p) => p.count > 0)
    .sort((a, b) => b.count - a.count || b.net - a.net)
    .slice(0, 5);

  return {
    today: { gross: todayGross, count: todayCount },
    week: { gross: weekGross, count: weekCount },
    month: { gross: monthGross, count: monthCount },
    avgTicket,
    salesCount,
    totalGross: totalGrossCents,
    totalNet: totalNetCents,
    totalFees: totalFeesCents,
    totalViews,
    conversion,
    series,
    seriesDaily,
    seriesWeekly: seriesDaily.slice(-8),
    seriesMonthly: seriesDaily.slice(-12),
    seriesYearly: seriesDaily.slice(-3),
    topProducts,
  };
}
