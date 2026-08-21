import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { firestore, auth, handleFirestoreError, OperationType } from "@/lib/firebase-config";
import { supabase } from "@/integrations/supabase/client";

export interface UnifiedProduct {
  id: string;
  title: string;
  name?: string;
  slug: string;
  short_description?: string | null;
  description?: string | null;
  product_type: string;
  category_id?: string | null;
  cover_url?: string | null;
  banner_url?: string | null;
  file_url?: string | null;
  external_url?: string | null;
  price_cents: number;
  promo_price_cents?: number | null;
  currency: string;
  status: "rascunho" | "publicado" | "pausado" | "em_analise" | string;
  tags?: string[];
  guarantee_days?: number;
  delivery_kind?: string;
  stock_quantity?: number | null;
  requires_shipping?: boolean;
  shipping_fee_cents?: number;
  weight_grams?: number | null;
  app_version?: string | null;
  app_package?: string | null;
  app_requirements?: string | null;
  is_subscription?: boolean;
  billing_interval?: string | null;
  subscription_price_cents?: number | null;
  trial_days?: number;
  has_members_area?: boolean;
  allow_affiliates?: boolean;
  affiliate_commission_percent?: number;
  sales_count: number;
  views_count: number;
  reviews_count?: number;
  rating?: number;
  rejection_reason?: string | null;
  producer_id: string;
  sellerId?: string;
  created_at: string;
  updated_at?: string;
  category?: { name: string; slug?: string } | null;
  producer?: {
    full_name?: string;
    name?: string;
    username?: string | null;
    avatar_url?: string | null;
  } | null;
}

function normalizeProduct(id: string, data: any): UnifiedProduct {
  const price =
    typeof data.price_cents === "number"
      ? data.price_cents
      : typeof data.price === "number"
        ? Math.round(data.price * 100)
        : 0;

  const promoPrice =
    typeof data.promo_price_cents === "number"
      ? data.promo_price_cents
      : typeof data.promo_price === "number"
        ? Math.round(data.promo_price * 100)
        : null;

  let status = data.status || "publicado";
  if (status === "active") status = "publicado";
  if (status === "draft") status = "rascunho";
  if (status === "pending") status = "em_analise";

  const producerId = data.producer_id || data.sellerId || data.userId || "";
  const title = data.title || data.name || "Produto sem título";
  const coverUrl = data.cover_url || data.image || data.coverUrl || null;
  const createdAt = data.created_at || data.createdAt || new Date().toISOString();

  return {
    id,
    title,
    name: title,
    slug: data.slug || id,
    short_description: data.short_description || data.shortDescription || null,
    description: data.description || null,
    product_type: data.product_type || data.productType || "ebook",
    category_id: data.category_id || data.categoryId || null,
    cover_url: coverUrl,
    banner_url: data.banner_url || data.bannerUrl || null,
    file_url: data.file_url || data.fileUrl || null,
    external_url: data.external_url || data.externalUrl || null,
    price_cents: price,
    promo_price_cents: promoPrice,
    currency: data.currency || "AOA",
    status,
    tags: Array.isArray(data.tags) ? data.tags : [],
    guarantee_days: data.guarantee_days ?? 7,
    delivery_kind: data.delivery_kind || "digital",
    stock_quantity: data.stock_quantity ?? null,
    requires_shipping: !!data.requires_shipping,
    shipping_fee_cents: data.shipping_fee_cents ?? 0,
    weight_grams: data.weight_grams ?? null,
    app_version: data.app_version || null,
    app_package: data.app_package || null,
    app_requirements: data.app_requirements || null,
    is_subscription: !!data.is_subscription,
    billing_interval: data.billing_interval || null,
    subscription_price_cents: data.subscription_price_cents ?? null,
    trial_days: data.trial_days ?? 0,
    has_members_area: !!data.has_members_area,
    allow_affiliates: !!data.allow_affiliates,
    affiliate_commission_percent: data.affiliate_commission_percent ?? 30,
    sales_count: Number(data.sales_count || data.salesCount || 0),
    views_count: Number(data.views_count || data.viewsCount || 0),
    reviews_count: Number(data.reviews_count || 0),
    rating: Number(data.rating || 5),
    rejection_reason: data.rejection_reason || null,
    producer_id: producerId,
    sellerId: producerId,
    created_at:
      typeof createdAt === "object" && createdAt?.toDate
        ? createdAt.toDate().toISOString()
        : String(createdAt),
    updated_at: data.updated_at || data.updatedAt || undefined,
    category: data.category || null,
    producer: data.producer || null,
  };
}

/**
 * Fetch all products in the entire platform (Admin only)
 */
export async function getAllAdminProducts(): Promise<UnifiedProduct[]> {
  try {
    const itemsMap = new Map<string, UnifiedProduct>();

    // 1. Firestore
    try {
      const productsRef = collection(firestore, "products");
      const snapshot = await getDocs(productsRef);
      snapshot.forEach((docSnap) => {
        const p = normalizeProduct(docSnap.id, docSnap.data());
        itemsMap.set(p.id, p);
      });
    } catch (err) {
      console.warn("Aviso ao ler todos produtos admin Firestore:", err);
    }

    // 2. Supabase
    try {
      const { data: supaRows } = await supabase
        .from("products")
        .select("*, category:categories(name, slug)");
      for (const raw of supaRows ?? []) {
        const p = normalizeProduct(raw.id, raw);
        if (!itemsMap.has(p.id)) itemsMap.set(p.id, p);
      }
    } catch (err) {
      console.warn("Aviso ao ler todos produtos admin Supabase:", err);
    }

    const list = Array.from(itemsMap.values());
    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return list;
  } catch (err) {
    console.error("Erro ao listar todos produtos admin:", err);
    return [];
  }
}

/**
 * Fetch ONLY products belonging to the specific producer
 */
export async function getProducerProducts(userId?: string): Promise<UnifiedProduct[]> {
  try {
    const currentUid = userId || auth.currentUser?.uid;
    const currentEmail = auth.currentUser?.email?.toLowerCase();

    // If not authenticated and no userId specified, return empty
    if (!currentUid && !currentEmail) {
      return [];
    }

    const itemsMap = new Map<string, UnifiedProduct>();

    // 1. Fetch from Firestore
    try {
      const productsRef = collection(firestore, "products");
      const snapshot = await getDocs(productsRef);
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const p = normalizeProduct(docSnap.id, data);

        const matchesUser =
          (currentUid &&
            (p.producer_id === currentUid ||
              data.sellerId === currentUid ||
              data.userId === currentUid ||
              data.user_id === currentUid ||
              data.seller_id === currentUid ||
              data.producerId === currentUid)) ||
          (currentEmail &&
            (data.email === currentEmail ||
              data.producer_email === currentEmail ||
              data.seller_email === currentEmail ||
              data.created_by_email === currentEmail));

        if (matchesUser) {
          itemsMap.set(p.id, p);
          if (p.slug) itemsMap.set(p.slug, p);
        }
      });
    } catch (err) {
      console.warn("Aviso ao ler produtos do Firestore:", err);
    }

    // 2. Fetch from Supabase (strictly if author matches current user)
    if (currentUid || currentEmail) {
      try {
        const { data: supaRows, error: supaErr } = await supabase
          .from("products")
          .select("*, category:categories(name, slug)");

        if (!supaErr && supaRows && supaRows.length > 0) {
          for (const raw of supaRows) {
            const p = normalizeProduct(raw.id, raw);
            const rawAny = raw as any;

            const matchesSupaUser =
              (currentUid &&
                (p.producer_id === currentUid ||
                  rawAny.producer_id === currentUid ||
                  rawAny.sellerId === currentUid ||
                  rawAny.userId === currentUid ||
                  rawAny.user_id === currentUid ||
                  rawAny.seller_id === currentUid)) ||
              (currentEmail &&
                (rawAny.email === currentEmail ||
                  rawAny.producer_email === currentEmail ||
                  rawAny.seller_email === currentEmail));

            if (matchesSupaUser) {
              const existing = itemsMap.get(p.id) || (p.slug ? itemsMap.get(p.slug) : undefined);
              if (!existing) {
                itemsMap.set(p.id, p);
                if (p.slug) itemsMap.set(p.slug, p);

                if (currentUid) {
                  setDoc(
                    doc(firestore, "products", p.id),
                    {
                      ...raw,
                      id: p.id,
                      producer_id: currentUid,
                      sellerId: currentUid,
                      userId: currentUid,
                      status: p.status,
                      updated_at: new Date().toISOString(),
                    },
                    { merge: true },
                  ).catch(() => {});
                }
              }
            }
          }
        }
      } catch (supaEx) {
        console.warn("Aviso ao sincronizar catálogo do Supabase:", supaEx);
      }
    }

    // Deduplicate by ID
    const uniqueList: UnifiedProduct[] = [];
    const seenIds = new Set<string>();
    for (const item of itemsMap.values()) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        uniqueList.push(item);
      }
    }

    // Sort by created_at descending
    uniqueList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return uniqueList;
  } catch (error) {
    console.error("Erro ao carregar produtos do produtor:", error);
    return [];
  }
}

/**
 * Get a single product by ID from Firestore or Supabase
 */
export async function getProductById(id: string): Promise<UnifiedProduct | null> {
  try {
    const docRef = doc(firestore, "products", id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return normalizeProduct(snap.id, snap.data());
    }

    // Check by slug in Firestore
    const q = query(collection(firestore, "products"), where("slug", "==", id), limit(1));
    const snapSlug = await getDocs(q);
    if (!snapSlug.empty) {
      return normalizeProduct(snapSlug.docs[0].id, snapSlug.docs[0].data());
    }

    // Fallback to Supabase
    try {
      const { data: supaRow } = await supabase
        .from("products")
        .select("*, category:categories(name, slug)")
        .or(`id.eq.${id},slug.eq.${id}`)
        .maybeSingle();

      if (supaRow) {
        const p = normalizeProduct(supaRow.id, supaRow);
        // Cache to Firestore
        setDoc(doc(firestore, "products", p.id), supaRow, { merge: true }).catch(() => {});
        return p;
      }
    } catch {
      // ignore
    }

    return null;
  } catch (error) {
    console.error(`Erro ao obter produto ${id}:`, error);
    return null;
  }
}

/**
 * Get product by slug from Firestore or Supabase
 */
export async function getProductBySlugFirestore(slug: string): Promise<UnifiedProduct | null> {
  try {
    const productsRef = collection(firestore, "products");
    const q = query(productsRef, where("slug", "==", slug), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const firstDoc = snap.docs[0];
      return normalizeProduct(firstDoc.id, firstDoc.data());
    }

    // Try by ID in Firestore
    const byId = await getProductById(slug);
    if (byId) return byId;

    // Fallback to Supabase
    try {
      const { data: supaRow } = await supabase
        .from("products")
        .select("*, category:categories(name, slug)")
        .eq("slug", slug)
        .maybeSingle();

      if (supaRow) {
        const p = normalizeProduct(supaRow.id, supaRow);
        setDoc(doc(firestore, "products", p.id), supaRow, { merge: true }).catch(() => {});
        return p;
      }
    } catch {
      // ignore
    }

    return null;
  } catch (error) {
    console.error(`Erro ao buscar produto por slug ${slug}:`, error);
    return null;
  }
}

/**
 * Save / Create a new product in Firestore
 */
export async function saveProductToFirestore(
  payload: Partial<UnifiedProduct>,
  customId?: string,
): Promise<UnifiedProduct> {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error("Usuário não autenticado.");
  }

  const id =
    customId ||
    (payload.id && !payload.id.includes("/")
      ? payload.id
      : doc(collection(firestore, "products")).id);
  const now = new Date().toISOString();

  const rawData = {
    ...payload,
    id,
    producer_id: uid,
    sellerId: uid,
    userId: uid,
    status: payload.status || "publicado",
    created_at: payload.created_at || now,
    createdAt: payload.created_at || now,
    updated_at: now,
    updatedAt: now,
    sales_count: payload.sales_count ?? 0,
    views_count: payload.views_count ?? 0,
    price_cents: payload.price_cents ?? 0,
    price: (payload.price_cents ?? 0) / 100,
  };

  const productRef = doc(firestore, "products", id);
  await setDoc(productRef, rawData, { merge: true });

  return normalizeProduct(id, rawData);
}

/**
 * Update an existing product in Firestore
 */
export async function updateProductInFirestore(
  id: string,
  patch: Partial<UnifiedProduct>,
): Promise<UnifiedProduct> {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error("Usuário não autenticado.");
  }

  const productRef = doc(firestore, "products", id);
  const now = new Date().toISOString();

  const updatePayload: Record<string, any> = {
    ...patch,
    updated_at: now,
    updatedAt: now,
  };

  if (typeof patch.price_cents === "number") {
    updatePayload.price = patch.price_cents / 100;
  }

  await setDoc(productRef, updatePayload, { merge: true });

  const updatedDoc = await getDoc(productRef);
  return normalizeProduct(id, updatedDoc.data());
}

/**
 * Delete a product from Firestore
 */
export async function deleteProductFromFirestore(id: string): Promise<void> {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error("Usuário não autenticado.");
  }

  const productRef = doc(firestore, "products", id);
  await deleteDoc(productRef);
}

/**
 * Duplicate a product in Firestore
 */
export async function duplicateProductInFirestore(id: string): Promise<UnifiedProduct> {
  const original = await getProductById(id);
  if (!original) throw new Error("Produto original não encontrado.");

  const suffix = Date.now().toString(36).slice(-4);
  const newSlug = `${original.slug}-copia-${suffix}`.slice(0, 80);
  const newTitle = `${original.title} (cópia)`;

  return await saveProductToFirestore({
    ...original,
    id: undefined,
    title: newTitle,
    slug: newSlug,
    status: "rascunho",
    sales_count: 0,
    views_count: 0,
    created_at: new Date().toISOString(),
  });
}

export interface ProductMetricRow {
  id: string;
  title: string;
  slug: string;
  cover_url?: string | null;
  currency: string;
  status: string;
  views: number;
  clicks: number;
  sales: number;
  revenue: number;
  net: number;
  conversion: number;
  activeAffiliates: number;
  commissionPaid: number;
  commissionPending: number;
}

export async function getProducerProductMetrics(userId?: string): Promise<ProductMetricRow[]> {
  const prods = await getProducerProducts(userId);
  const uid = userId || auth.currentUser?.uid;

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
      console.warn("Erro ao ler vendas para metricas:", err);
    }
  }

  return prods.map((p) => {
    const s = salesRows.filter((x) => x.product_id === p.id || x.productId === p.id);
    const paid = s.filter((x) => x.status === "paid" || x.status === "pago");
    const views = p.views_count || 0;
    const clicks = 0;
    const base = views + clicks;
    const salesCount = paid.length;
    const revenue = paid.reduce(
      (a, x) =>
        a +
        Math.round(
          (x.grossAmount ?? x.gross_cents ?? 0) * (typeof x.grossAmount === "number" ? 100 : 1),
        ),
      0,
    );
    const net = paid.reduce(
      (a, x) =>
        a +
        Math.round(x.sellerNetAmount ?? x.net_cents ?? (x.grossAmount ? x.grossAmount * 98 : 0)),
      0,
    );

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      cover_url: p.cover_url,
      currency: p.currency,
      status: p.status,
      views,
      clicks,
      sales: salesCount,
      revenue,
      net,
      conversion: base > 0 ? (salesCount / base) * 100 : 0,
      activeAffiliates: 0,
      commissionPaid: 0,
      commissionPending: 0,
    };
  });
}
