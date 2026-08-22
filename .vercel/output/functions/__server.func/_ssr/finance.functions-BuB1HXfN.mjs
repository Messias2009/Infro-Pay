import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D0SxN_qV.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BRaqugv5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/finance.functions-BuB1HXfN.js
var getMyWallet = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("bf3de193b23cd87165510b9899c15ad6694f04f1926a7e96554953adab4b0574"));
var getMyFinanceOverview = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("aba3f7101b38f82ad1538bbd465130fe2422c20e6327fd8b607959ae5edda2b3"));
var listMyTransactions = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("14515014247cf8108311dc0bc9082a3dab1bd287c8dc0ffab778bd2976e1c9d5"));
//#endregion
export { getMyWallet as n, listMyTransactions as r, getMyFinanceOverview as t };
