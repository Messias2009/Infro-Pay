import { n as createServerFn } from "./server-CT3XtuCd.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D0SxN_qV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legends.functions-CpKyibG2.js
var LEVELS = [
	{
		key: "bronze",
		name: "Bronze",
		min_cents: 0,
		color: "#B87333",
		gradient: "linear-gradient(135deg,#8B4513,#B87333)"
	},
	{
		key: "prata",
		name: "Prata",
		min_cents: 1e7,
		color: "#C0C0C0",
		gradient: "linear-gradient(135deg,#7C7C7C,#E8E8E8)"
	},
	{
		key: "ouro",
		name: "Ouro",
		min_cents: 5e7,
		color: "#F9A825",
		gradient: "linear-gradient(135deg,#B8860B,#FFD700)"
	},
	{
		key: "platina",
		name: "Platina",
		min_cents: 1e8,
		color: "#E5E4E2",
		gradient: "linear-gradient(135deg,#8FA6B3,#E5E4E2)"
	},
	{
		key: "diamante",
		name: "Diamante",
		min_cents: 5e8,
		color: "#B9F2FF",
		gradient: "linear-gradient(135deg,#4FC3F7,#B9F2FF)"
	},
	{
		key: "mestre",
		name: "Mestre",
		min_cents: 1e9,
		color: "#9C27B0",
		gradient: "linear-gradient(135deg,#6A1B9A,#CE93D8)"
	},
	{
		key: "elite",
		name: "Elite",
		min_cents: 25e8,
		color: "#F44336",
		gradient: "linear-gradient(135deg,#B71C1C,#FF7043)"
	},
	{
		key: "lenda",
		name: "Lenda",
		min_cents: 5e9,
		color: "#00BCD4",
		gradient: "linear-gradient(135deg,#006064,#4DD0E1)"
	},
	{
		key: "imortal",
		name: "Imortal",
		min_cents: 1e10,
		color: "#FFEB3B",
		gradient: "linear-gradient(135deg,#F57F17,#FFF176)"
	},
	{
		key: "infinito",
		name: "Infinito",
		min_cents: 25e9,
		color: "#7C4DFF",
		gradient: "linear-gradient(135deg,#311B92,#B388FF)"
	}
];
function levelFor(total) {
	let current = LEVELS[0];
	for (const l of LEVELS) if (total >= l.min_cents) current = l;
	return current;
}
var listLegends = createServerFn({ method: "GET" }).handler(createSsrRpc("c316399c5e9baf9c540f078df41f24750b8fb48203f870f53b12054168955e28"));
//#endregion
export { levelFor as n, listLegends as r, LEVELS as t };
