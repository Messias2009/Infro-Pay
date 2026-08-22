import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D0SxN_qV.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/affiliate.functions-gSyk7-3T.js
/** Catálogo público de produtos abertos a afiliação. */
var listAffiliateOffers = createServerFn({ method: "GET" }).handler(createSsrRpc("e3c20dcb46c8a205ec414540eeae495d5dc5c79d8c854f9c76f2b02ec153af6c"));
/** Regista um clique num link de afiliado (idempotência é do lado do cliente). */
var registerAffiliateClick = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ code: stringType().trim().min(4).max(40) }).parse(d)).handler(createSsrRpc("40384c516644e6bf099b845c84cd515f66bd2c90020f1781531a63677b35a9f5"));
/** Gera (ou devolve) o link de afiliado do utilizador para um produto. */
var createAffiliateLink = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ product_id: stringType().uuid() }).parse(d)).handler(createSsrRpc("88d6d1034b99d5d47788bdd190029656b7b78e7a5980f8579708cbd761fb281d"));
/** Painel do afiliado: links, cliques, vendas e comissões. */
var getAffiliateOverview = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("a58636fba6d2212f4827a1705dcf2b46c0c9791c9dd197b0076b47799dfaf9c0"));
//#endregion
export { registerAffiliateClick as i, getAffiliateOverview as n, listAffiliateOffers as r, createAffiliateLink as t };
