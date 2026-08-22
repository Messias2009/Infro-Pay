import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D0SxN_qV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog.functions-DC0doerl.js
var listCategories = createServerFn({ method: "GET" }).handler(createSsrRpc("9093087a4fde30e7cbeefd735d6dccc2718ef5ec811563a10f9b01884489c6f6"));
var listPublishedProducts = createServerFn({ method: "GET" }).inputValidator((d) => d ?? {}).handler(createSsrRpc("de58f2eaa999ac8398bd09ad94f18c8e6810ce1495690211ce67ae8aeb592795"));
var getProductBySlug = createServerFn({ method: "GET" }).inputValidator((d) => d).handler(createSsrRpc("338e414efdb61533c60e3c1671e7aea82e763a0409c4afad4a1f474e3d8c65ce"));
//#endregion
export { listCategories as n, listPublishedProducts as r, getProductBySlug as t };
