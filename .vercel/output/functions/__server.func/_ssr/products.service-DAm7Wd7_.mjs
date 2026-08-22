import { a as limit, c as setDoc, d as collection, f as doc, i as getDocs, n as getDoc, s as query, t as deleteDoc, u as where } from "../_libs/@firebase/firestore+[...].mjs";
import "../_libs/firebase.mjs";
import { i as firestore, n as auth } from "./firebase-config-BpvLLNMw.mjs";
import { t as supabase } from "./client-DKzLsRIz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products.service-DAm7Wd7_.js
function normalizeProduct(id, data) {
	const price = typeof data.price_cents === "number" ? data.price_cents : typeof data.price === "number" ? Math.round(data.price * 100) : 0;
	const promoPrice = typeof data.promo_price_cents === "number" ? data.promo_price_cents : typeof data.promo_price === "number" ? Math.round(data.promo_price * 100) : null;
	let status = data.status || "publicado";
	if (status === "active") status = "publicado";
	if (status === "draft") status = "rascunho";
	if (status === "pending") status = "em_analise";
	const producerId = data.producer_id || data.sellerId || data.userId || "";
	const title = data.title || data.name || "Produto sem título";
	const coverUrl = data.cover_url || data.image || data.coverUrl || null;
	const createdAt = data.created_at || data.createdAt || (/* @__PURE__ */ new Date()).toISOString();
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
		created_at: typeof createdAt === "object" && createdAt?.toDate ? createdAt.toDate().toISOString() : String(createdAt),
		updated_at: data.updated_at || data.updatedAt || void 0,
		category: data.category || null,
		producer: data.producer || null
	};
}
/**
* Fetch all products in the entire platform (Admin only)
*/
async function getAllAdminProducts() {
	try {
		const itemsMap = /* @__PURE__ */ new Map();
		try {
			const productsRef = collection(firestore, "products");
			(await getDocs(productsRef)).forEach((docSnap) => {
				const p = normalizeProduct(docSnap.id, docSnap.data());
				itemsMap.set(p.id, p);
			});
		} catch (err) {
			console.warn("Aviso ao ler todos produtos admin Firestore:", err);
		}
		try {
			const { data: supaRows } = await supabase.from("products").select("*, category:categories(name, slug)");
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
async function getProducerProducts(userId) {
	try {
		const currentUid = userId || auth.currentUser?.uid;
		const currentEmail = auth.currentUser?.email?.toLowerCase();
		if (!currentUid && !currentEmail) return [];
		const itemsMap = /* @__PURE__ */ new Map();
		try {
			const productsRef = collection(firestore, "products");
			(await getDocs(productsRef)).forEach((docSnap) => {
				const data = docSnap.data();
				const p = normalizeProduct(docSnap.id, data);
				if (currentUid && (p.producer_id === currentUid || data.sellerId === currentUid || data.userId === currentUid || data.user_id === currentUid || data.seller_id === currentUid || data.producerId === currentUid) || currentEmail && (data.email === currentEmail || data.producer_email === currentEmail || data.seller_email === currentEmail || data.created_by_email === currentEmail)) {
					itemsMap.set(p.id, p);
					if (p.slug) itemsMap.set(p.slug, p);
				}
			});
		} catch (err) {
			console.warn("Aviso ao ler produtos do Firestore:", err);
		}
		if (currentUid || currentEmail) try {
			const { data: supaRows, error: supaErr } = await supabase.from("products").select("*, category:categories(name, slug)");
			if (!supaErr && supaRows && supaRows.length > 0) for (const raw of supaRows) {
				const p = normalizeProduct(raw.id, raw);
				const rawAny = raw;
				if (currentUid && (p.producer_id === currentUid || rawAny.producer_id === currentUid || rawAny.sellerId === currentUid || rawAny.userId === currentUid || rawAny.user_id === currentUid || rawAny.seller_id === currentUid) || currentEmail && (rawAny.email === currentEmail || rawAny.producer_email === currentEmail || rawAny.seller_email === currentEmail)) {
					if (!(itemsMap.get(p.id) || (p.slug ? itemsMap.get(p.slug) : void 0))) {
						itemsMap.set(p.id, p);
						if (p.slug) itemsMap.set(p.slug, p);
						if (currentUid) setDoc(doc(firestore, "products", p.id), {
							...raw,
							id: p.id,
							producer_id: currentUid,
							sellerId: currentUid,
							userId: currentUid,
							status: p.status,
							updated_at: (/* @__PURE__ */ new Date()).toISOString()
						}, { merge: true }).catch(() => {});
					}
				}
			}
		} catch (supaEx) {
			console.warn("Aviso ao sincronizar catálogo do Supabase:", supaEx);
		}
		const uniqueList = [];
		const seenIds = /* @__PURE__ */ new Set();
		for (const item of itemsMap.values()) if (!seenIds.has(item.id)) {
			seenIds.add(item.id);
			uniqueList.push(item);
		}
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
async function getProductById(id) {
	try {
		const docRef = doc(firestore, "products", id);
		const snap = await getDoc(docRef);
		if (snap.exists()) return normalizeProduct(snap.id, snap.data());
		const q = query(collection(firestore, "products"), where("slug", "==", id), limit(1));
		const snapSlug = await getDocs(q);
		if (!snapSlug.empty) return normalizeProduct(snapSlug.docs[0].id, snapSlug.docs[0].data());
		try {
			const { data: supaRow } = await supabase.from("products").select("*, category:categories(name, slug)").or(`id.eq.${id},slug.eq.${id}`).maybeSingle();
			if (supaRow) {
				const p = normalizeProduct(supaRow.id, supaRow);
				setDoc(doc(firestore, "products", p.id), supaRow, { merge: true }).catch(() => {});
				return p;
			}
		} catch {}
		return null;
	} catch (error) {
		console.error(`Erro ao obter produto ${id}:`, error);
		return null;
	}
}
/**
* Get product by slug from Firestore or Supabase
*/
async function getProductBySlugFirestore(slug) {
	try {
		const productsRef = collection(firestore, "products");
		const q = query(productsRef, where("slug", "==", slug), limit(1));
		const snap = await getDocs(q);
		if (!snap.empty) {
			const firstDoc = snap.docs[0];
			return normalizeProduct(firstDoc.id, firstDoc.data());
		}
		const byId = await getProductById(slug);
		if (byId) return byId;
		try {
			const { data: supaRow } = await supabase.from("products").select("*, category:categories(name, slug)").eq("slug", slug).maybeSingle();
			if (supaRow) {
				const p = normalizeProduct(supaRow.id, supaRow);
				setDoc(doc(firestore, "products", p.id), supaRow, { merge: true }).catch(() => {});
				return p;
			}
		} catch {}
		return null;
	} catch (error) {
		console.error(`Erro ao buscar produto por slug ${slug}:`, error);
		return null;
	}
}
/**
* Save / Create a new product in Firestore
*/
async function saveProductToFirestore(payload, customId) {
	const uid = auth.currentUser?.uid;
	if (!uid) throw new Error("Usuário não autenticado.");
	const id = customId || (payload.id && !payload.id.includes("/") ? payload.id : doc(collection(firestore, "products")).id);
	const now = (/* @__PURE__ */ new Date()).toISOString();
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
		price: (payload.price_cents ?? 0) / 100
	};
	const productRef = doc(firestore, "products", id);
	await setDoc(productRef, rawData, { merge: true });
	return normalizeProduct(id, rawData);
}
/**
* Update an existing product in Firestore
*/
async function updateProductInFirestore(id, patch) {
	if (!auth.currentUser?.uid) throw new Error("Usuário não autenticado.");
	const productRef = doc(firestore, "products", id);
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const updatePayload = {
		...patch,
		updated_at: now,
		updatedAt: now
	};
	if (typeof patch.price_cents === "number") updatePayload.price = patch.price_cents / 100;
	await setDoc(productRef, updatePayload, { merge: true });
	return normalizeProduct(id, (await getDoc(productRef)).data());
}
/**
* Delete a product from Firestore
*/
async function deleteProductFromFirestore(id) {
	if (!auth.currentUser?.uid) throw new Error("Usuário não autenticado.");
	const productRef = doc(firestore, "products", id);
	await deleteDoc(productRef);
}
/**
* Duplicate a product in Firestore
*/
async function duplicateProductInFirestore(id) {
	const original = await getProductById(id);
	if (!original) throw new Error("Produto original não encontrado.");
	const suffix = Date.now().toString(36).slice(-4);
	const newSlug = `${original.slug}-copia-${suffix}`.slice(0, 80);
	const newTitle = `${original.title} (cópia)`;
	return await saveProductToFirestore({
		...original,
		id: void 0,
		title: newTitle,
		slug: newSlug,
		status: "rascunho",
		sales_count: 0,
		views_count: 0,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	});
}
async function getProducerProductMetrics(userId) {
	const prods = await getProducerProducts(userId);
	const uid = userId || auth.currentUser?.uid;
	const salesRows = [];
	if (uid) try {
		const salesRef = collection(firestore, "sales");
		(await getDocs(salesRef)).forEach((docSnap) => {
			const d = docSnap.data();
			if (d.sellerId === uid || d.producer_id === uid || d.userId === uid) salesRows.push({
				id: docSnap.id,
				...d
			});
		});
	} catch (err) {
		console.warn("Erro ao ler vendas para metricas:", err);
	}
	return prods.map((p) => {
		const paid = salesRows.filter((x) => x.product_id === p.id || x.productId === p.id).filter((x) => x.status === "paid" || x.status === "pago");
		const views = p.views_count || 0;
		const clicks = 0;
		const base = views + clicks;
		const salesCount = paid.length;
		const revenue = paid.reduce((a, x) => a + Math.round((x.grossAmount ?? x.gross_cents ?? 0) * (typeof x.grossAmount === "number" ? 100 : 1)), 0);
		const net = paid.reduce((a, x) => a + Math.round(x.sellerNetAmount ?? x.net_cents ?? (x.grossAmount ? x.grossAmount * 98 : 0)), 0);
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
			conversion: base > 0 ? salesCount / base * 100 : 0,
			activeAffiliates: 0,
			commissionPaid: 0,
			commissionPending: 0
		};
	});
}
//#endregion
export { getProducerProducts as a, saveProductToFirestore as c, getProducerProductMetrics as i, updateProductInFirestore as l, duplicateProductInFirestore as n, getProductById as o, getAllAdminProducts as r, getProductBySlugFirestore as s, deleteProductFromFirestore as t };
