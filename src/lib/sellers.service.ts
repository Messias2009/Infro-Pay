import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { firestore } from "@/lib/firebase-config";
import { LEVELS, levelFor, type Level } from "@/lib/legends.functions";
import { supabase } from "@/integrations/supabase/client";

export interface TopSeller {
  id: string;
  name: string;
  avatar_url?: string | null;
  revenue_cents: number;
  sales_count: number;
  level: Level;
  rank: number;
}

export async function getTopSellers(): Promise<TopSeller[]> {
  try {
    const agg = new Map<
      string,
      { name: string; avatar?: string | null; revenue: number; count: number }
    >();

    // 1. Check Firestore sales
    try {
      const salesRef = collection(firestore, "sales");
      const snap = await getDocs(salesRef);
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        if (d.status === "paid" || d.status === "pago") {
          const sellerId = d.sellerId || d.producer_id || d.userId || "infropay";
          const sellerName = d.sellerName || d.producerName || d.seller_name || "Produtor InfroPay";
          const cur = agg.get(sellerId) ?? { name: sellerName, avatar: null, revenue: 0, count: 0 };
          const gross =
            (d.grossAmount ?? d.gross_cents ?? 0) * (typeof d.grossAmount === "number" ? 100 : 1);
          cur.revenue += Math.round(gross);
          cur.count += 1;
          if (sellerName && sellerName !== "Produtor InfroPay") cur.name = sellerName;
          agg.set(sellerId, cur);
        }
      });
    } catch (err) {
      console.warn("Aviso ao ler vendas do Firestore para ranking:", err);
    }

    // 2. Supplement from Supabase
    try {
      const { data: supaSales } = await supabase
        .from("sales")
        .select("producer_id, gross_cents")
        .eq("status", "pago");

      for (const s of supaSales ?? []) {
        if (!s.producer_id) continue;
        const cur = agg.get(s.producer_id) ?? {
          name: "Produtor",
          avatar: null,
          revenue: 0,
          count: 0,
        };
        cur.revenue += s.gross_cents ?? 0;
        cur.count += 1;
        agg.set(s.producer_id, cur);
      }
    } catch (err) {
      console.warn("Aviso ao ler ranking do Supabase:", err);
    }

    // If no real sales exist, return empty list (no fake mock sellers)
    if (agg.size === 0) {
      return [];
    }

    // Try to enrich names from users collection
    try {
      const usersRef = collection(firestore, "users");
      const userSnap = await getDocs(usersRef);
      userSnap.forEach((uDoc) => {
        const u = uDoc.data();
        if (agg.has(uDoc.id)) {
          const cur = agg.get(uDoc.id)!;
          if (u.displayName || u.full_name || u.name) {
            cur.name = u.displayName || u.full_name || u.name;
          }
          if (u.photoURL || u.avatar_url) {
            cur.avatar = u.photoURL || u.avatar_url;
          }
        }
      });
    } catch {
      // ignore
    }

    const list: TopSeller[] = [];
    for (const [id, data] of agg.entries()) {
      list.push({
        id,
        name: data.name,
        avatar_url: data.avatar,
        revenue_cents: data.revenue,
        sales_count: data.count,
        level: levelFor(data.revenue),
        rank: 0,
      });
    }

    list.sort((a, b) => b.revenue_cents - a.revenue_cents);
    return list.slice(0, 10).map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));
  } catch (err) {
    console.error("Erro ao obter top vendedores:", err);
    return [];
  }
}
