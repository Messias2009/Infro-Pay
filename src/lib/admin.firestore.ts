import { collection, getDocs, query, orderBy, where, doc, getDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase-config";
import type { UnifiedProduct } from "@/lib/products.service";

export interface AdminUserStats {
  uid: string;
  id: string;
  email: string;
  name: string;
  avatar_url?: string | null;
  photoURL?: string | null;
  role: string;
  status: string;
  createdAt: string;
  lastLoginAt?: string;
  productCount: number;
  salesCount: number;
  totalGrossAOA: number;
  totalNetAOA: number;
}

export interface AdminUserSale {
  id: string;
  productTitle: string;
  customerName?: string;
  customerEmail?: string;
  grossAmount: number;
  netAmount: number;
  currency: string;
  status: string;
  paymentMethod?: string;
  createdAt: string;
}

/**
 * Fetches all registered users/sellers and aggregates their total product count,
 * sales count, and volume.
 */
export async function fetchAdminUsersWithStats(): Promise<AdminUserStats[]> {
  try {
    // 1. Fetch all users
    const usersRef = collection(firestore, "users");
    const userSnapshots = await getDocs(query(usersRef, orderBy("createdAt", "desc"))).catch(
      async () => {
        return await getDocs(usersRef);
      },
    );

    const usersMap = new Map<string, AdminUserStats>();

    userSnapshots.forEach((docSnap) => {
      const data = docSnap.data();
      const uid = docSnap.id || data.uid || data.id;
      const createdAt =
        data.createdAt ||
        (data.created_at ? new Date(data.created_at).toISOString() : new Date().toISOString());

      usersMap.set(uid, {
        uid,
        id: uid,
        email: data.email || "Sem e-mail",
        name: data.name || data.displayName || data.full_name || "Utilizador",
        avatar_url: data.avatar_url || data.photoURL || null,
        photoURL: data.photoURL || data.avatar_url || null,
        role: data.role || "seller",
        status: data.status || "active",
        createdAt,
        lastLoginAt: data.lastLoginAt,
        productCount: 0,
        salesCount: 0,
        totalGrossAOA: 0,
        totalNetAOA: 0,
      });
    });

    // 2. Fetch all products to aggregate counts per user
    const productsRef = collection(firestore, "products");
    const prodSnapshots = await getDocs(productsRef);

    prodSnapshots.forEach((docSnap) => {
      const p = docSnap.data();
      const ownerId = p.producer_id || p.sellerId || p.userId;
      if (ownerId && usersMap.has(ownerId)) {
        const u = usersMap.get(ownerId)!;
        u.productCount += 1;
      } else if (ownerId && !usersMap.has(ownerId)) {
        // In case a product belongs to a user without a pre-existing user doc
        usersMap.set(ownerId, {
          uid: ownerId,
          id: ownerId,
          email: p.sellerEmail || "Utilizador da Loja",
          name: p.sellerName || "Produtor",
          role: "seller",
          status: "active",
          createdAt: p.created_at || p.createdAt || new Date().toISOString(),
          productCount: 1,
          salesCount: 0,
          totalGrossAOA: 0,
          totalNetAOA: 0,
        });
      }
    });

    // 3. Fetch all sales to aggregate per user
    const salesRef = collection(firestore, "sales");
    const salesSnapshots = await getDocs(salesRef);

    salesSnapshots.forEach((docSnap) => {
      const s = docSnap.data();
      const sellerId = s.sellerId || s.producer_id || s.seller_id;
      const gross =
        Number((s.grossAmount ?? s.amount ?? s.gross_cents) ? (s.gross_cents ?? 0) / 100 : 0) || 0;
      const net =
        Number((s.sellerNetAmount ?? s.net_cents) ? (s.net_cents ?? 0) / 100 : gross * 0.98) || 0;
      const isPaid = s.status === "pago" || s.status === "completed" || s.status === "paid";

      if (sellerId && usersMap.has(sellerId)) {
        const u = usersMap.get(sellerId)!;
        if (isPaid) {
          u.salesCount += 1;
          u.totalGrossAOA += gross;
          u.totalNetAOA += net;
        }
      }
    });

    return Array.from(usersMap.values()).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } catch (err) {
    console.error("fetchAdminUsersWithStats error:", err);
    return [];
  }
}

/**
 * Fetches all products and sales belonging to a specific user.
 */
export async function fetchUserProductsAndSales(userId: string): Promise<{
  products: UnifiedProduct[];
  sales: AdminUserSale[];
}> {
  try {
    // 1. Fetch user products
    const productsRef = collection(firestore, "products");
    const productsSnap = await getDocs(productsRef);
    const userProducts: UnifiedProduct[] = [];

    productsSnap.forEach((docSnap) => {
      const data = docSnap.data();
      const ownerId = data.producer_id || data.sellerId || data.userId;
      if (ownerId === userId) {
        userProducts.push({
          id: docSnap.id,
          title: data.title || "Produto sem título",
          slug: data.slug || docSnap.id,
          short_description: data.short_description || null,
          description: data.description || null,
          product_type: data.product_type || "ebook",
          cover_url: data.cover_url || null,
          price_cents: Number(data.price_cents ?? (data.price ? data.price * 100 : 0)),
          currency: data.currency || "AOA",
          status: data.status || "rascunho",
          sales_count: Number(data.sales_count || 0),
          views_count: Number(data.views_count || 0),
          producer_id: ownerId,
          sellerId: ownerId,
          created_at: data.created_at || data.createdAt || new Date().toISOString(),
        });
      }
    });

    // 2. Fetch user sales
    const salesRef = collection(firestore, "sales");
    const salesSnap = await getDocs(salesRef);
    const userSales: AdminUserSale[] = [];

    salesSnap.forEach((docSnap) => {
      const data = docSnap.data();
      const sellerId = data.sellerId || data.producer_id || data.seller_id;
      if (sellerId === userId) {
        const gross = Number(
          data.grossAmount ?? (data.gross_cents ? data.gross_cents / 100 : (data.amount ?? 0)),
        );
        const net = Number(
          data.sellerNetAmount ?? (data.net_cents ? data.net_cents / 100 : gross * 0.98),
        );

        userSales.push({
          id: docSnap.id,
          productTitle: data.productTitle || data.product_title || "Produto Digital",
          customerName: data.customerName || data.buyerName || data.buyer_name || "Cliente",
          customerEmail: data.customerEmail || data.buyerEmail || data.buyer_email || "—",
          grossAmount: gross,
          netAmount: net,
          currency: data.currency || "AOA",
          status: data.status || "pendente",
          paymentMethod: data.paymentMethod || data.payment_method || "Multicaixa Express",
          createdAt: data.createdAt || data.created_at || data.paid_at || new Date().toISOString(),
        });
      }
    });

    // Sort products and sales newest first
    userProducts.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    userSales.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return {
      products: userProducts,
      sales: userSales,
    };
  } catch (err) {
    console.error("fetchUserProductsAndSales error:", err);
    return { products: [], sales: [] };
  }
}
