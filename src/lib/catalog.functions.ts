import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { getProductBySlugFirestore, getProducerProducts } from "./products.service";

function publicClient() {
  const url = process.env.SUPABASE_URL || "";
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || "";
  if (!url || !key) return null;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export const listCategories = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, slug, name, icon, sort_order")
        .order("sort_order");
      if (!error && data && data.length > 0) return data;
    } catch {
      // fallback
    }
  }
  return [
    { id: "1", slug: "ebooks", name: "Ebooks & Manuais", icon: "BookOpen", sort_order: 1 },
    { id: "2", slug: "cursos", name: "Cursos Online", icon: "GraduationCap", sort_order: 2 },
    { id: "3", slug: "softwares", name: "Softwares & Apps", icon: "Code", sort_order: 3 },
    { id: "4", slug: "mentorias", name: "Mentorias & Consultorias", icon: "Users", sort_order: 4 },
  ];
});

export const listPublishedProducts = createServerFn({ method: "GET" })
  .inputValidator(
    (d: { category?: string; limit?: number; sort?: "popular" | "recent" } | undefined) => d ?? {},
  )
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const recent = data?.sort === "recent";
    let rows: any[] = [];
    if (supabase) {
      try {
        let q = supabase
          .from("products")
          .select(
            "id, slug, title, short_description, cover_url, price_cents, promo_price_cents, currency, rating, reviews_count, sales_count, created_at, category:categories(name, slug)",
          )
          .eq("status", "publicado")
          .order(recent ? "created_at" : "sales_count", { ascending: false })
          .limit(data?.limit ?? 24);
        if (data?.category) {
          const { data: cat } = await supabase
            .from("categories")
            .select("id")
            .eq("slug", data.category)
            .maybeSingle();
          if (cat?.id) q = q.eq("category_id", cat.id);
        }
        const res = await q;
        if (!res.error && res.data) rows = res.data;
      } catch {
        // fallback
      }
    }

    // Also merge from Firestore
    try {
      const firestoreProds = await getProducerProducts();
      const published = firestoreProds.filter((p) => p.status === "publicado");
      const map = new Map<string, any>();
      rows.forEach((r) => map.set(r.slug, r));
      published.forEach((p) => {
        if (!map.has(p.slug)) map.set(p.slug, p);
      });
      return Array.from(map.values()).slice(0, data?.limit ?? 24);
    } catch {
      return rows;
    }
  });

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const supabase = publicClient();
    if (supabase) {
      try {
        const { data: row, error } = await supabase
          .from("products")
          .select(
            "*, category:categories(name, slug), producer:profiles!products_producer_id_fkey(full_name, username, avatar_url)",
          )
          .eq("slug", data.slug)
          .eq("status", "publicado")
          .maybeSingle();
        if (!error && row) return row;
      } catch {
        // fallback to Firestore
      }
    }

    // Fallback to Firestore
    const fProd = await getProductBySlugFirestore(data.slug);
    return fProd;
  });
