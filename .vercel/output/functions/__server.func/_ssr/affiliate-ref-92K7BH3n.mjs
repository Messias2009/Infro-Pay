//#region node_modules/.nitro/vite/services/ssr/assets/affiliate-ref-92K7BH3n.js
var KEY = "infropay_ref";
var TTL_MS = 2592e6;
function read() {
	if (typeof window === "undefined") return {};
	try {
		return JSON.parse(window.localStorage.getItem(KEY) ?? "{}");
	} catch {
		return {};
	}
}
/** Guarda o código de afiliado associado a um produto (30 dias). */
function saveRef(slug, code) {
	if (typeof window === "undefined") return;
	const store = read();
	store[slug] = {
		code,
		at: Date.now()
	};
	try {
		window.localStorage.setItem(KEY, JSON.stringify(store));
	} catch {}
}
/** Lê o código de afiliado válido para um produto. */
function getRef(slug) {
	const entry = read()[slug];
	if (!entry) return null;
	if (Date.now() - entry.at > TTL_MS) return null;
	return entry.code;
}
//#endregion
export { saveRef as n, getRef as t };
