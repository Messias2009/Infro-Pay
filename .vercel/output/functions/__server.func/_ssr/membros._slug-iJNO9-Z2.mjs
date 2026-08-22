import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { n as Route$13 } from "./router-DcboVFjc.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { At as CircleCheck, Tt as Circle, Xt as ArrowLeft, kt as CirclePlay, qt as Award } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { l as setLessonProgress, o as getMyCourse } from "./members.functions-Df7r0MfK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/membros._slug-iJNO9-Z2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/membros.$slug.tsx?tsr-split=component";
function embedUrl(url) {
	const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/);
	if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
	const vm = url.match(/vimeo\.com\/(\d+)/);
	if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
	return null;
}
function CursoAluno() {
	const { slug } = Route$13.useParams();
	const courseFn = useServerFn(getMyCourse);
	const progressFn = useServerFn(setLessonProgress);
	const { data, refetch, isLoading, error } = useQuery({
		queryKey: ["course", slug],
		queryFn: () => courseFn({ data: { slug } })
	});
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const lessons = (0, import_react.useMemo)(() => (data?.modules ?? []).flatMap((m) => m.lessons.map((l) => ({
		...l,
		moduleTitle: m.title
	}))), [data]);
	const active = lessons.find((l) => l.id === activeId) ?? lessons[0];
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-10 text-muted-foreground",
		children: "A carregar..."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 42,
		columnNumber: 25
	}, this);
	if (error) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-10 max-w-xl mx-auto text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "font-display text-2xl font-bold",
				children: "Sem acesso"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 45,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm text-muted-foreground mt-2",
				children: error.message
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 46,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/membros",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					className: "mt-5",
					variant: "outline",
					children: "Voltar"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 47,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 44,
		columnNumber: 12
	}, this);
	const embed = active?.video_url ? embedUrl(active.video_url) : null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "border-b border-border px-4 md:px-8 h-14 flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/membros",
				className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 58,
					columnNumber: 11
				}, this), " Meus cursos"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 57,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "ml-auto text-xs text-muted-foreground",
				children: [
					data?.enrollment?.progress_percent ?? 0,
					"% concluído",
					data?.enrollment?.certificate_issued && /* @__PURE__ */ (void 0)("span", {
						className: "ml-2 inline-flex items-center gap-1 text-gold",
						children: [/* @__PURE__ */ (void 0)(Award, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 63,
							columnNumber: 15
						}, this), "Certificado emitido"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 62,
						columnNumber: 52
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 60,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 56,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid lg:grid-cols-[1fr_340px]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-4 md:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "font-display text-2xl md:text-3xl font-bold",
					children: data?.product?.title
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 11
				}, this), !active ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "Este curso ainda não tem aulas publicadas."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 22
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-5 rounded-2xl overflow-hidden border border-border bg-card aspect-video",
					children: embed ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("iframe", {
						src: embed,
						title: active.title,
						allowFullScreen: true,
						className: "h-full w-full"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 26
					}, this) : active.video_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("video", {
						src: active.video_url,
						controls: true,
						className: "h-full w-full"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 133
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "h-full w-full grid place-items-center text-sm text-muted-foreground",
						children: "Aula sem vídeo"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 203
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 75,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-5 flex flex-wrap items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs uppercase tracking-widest text-muted-foreground",
								children: active.moduleTitle
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 82,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "font-display text-xl font-semibold mt-1",
								children: active.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 85,
								columnNumber: 19
							}, this),
							active.description && /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-muted-foreground mt-2",
								children: active.description
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 86,
								columnNumber: 42
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						className: active.completed ? "" : "gradient-brand text-primary-foreground shadow-glow",
						variant: active.completed ? "outline" : "default",
						onClick: async () => {
							try {
								const r = await progressFn({ data: {
									lesson_id: active.id,
									product_id: data.product.id,
									completed: !active.completed
								} });
								refetch();
								if (r.progress_percent === 100) toast.success("Curso concluído! Certificado emitido 🎉");
							} catch (e) {
								toast.error(e.message);
							}
						},
						children: active.completed ? "Marcar como não concluída" : "Marcar como concluída"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 80,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 74,
					columnNumber: 20
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 70,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: "border-t lg:border-t-0 lg:border-l border-border bg-card/40",
				children: data?.modules?.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground border-b border-border",
					children: m.title
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 111,
					columnNumber: 15
				}, this), m.lessons.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setActiveId(l.id),
					className: `w-full text-left px-5 py-3 flex items-center gap-3 border-b border-border/60 text-sm transition ${active?.id === l.id ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-accent/30"}`,
					children: [
						l.completed ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-4 w-4 text-success shrink-0" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 34
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Circle, { className: "h-4 w-4 shrink-0" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 95
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex-1 truncate",
							children: l.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 116,
							columnNumber: 19
						}, this),
						l.duration_minutes ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs",
							children: [l.duration_minutes, "m"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 117,
							columnNumber: 41
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CirclePlay, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 117,
							columnNumber: 98
						}, this)
					]
				}, l.id, true, {
					fileName: _jsxFileName,
					lineNumber: 114,
					columnNumber: 42
				}, this))] }, m.id, true, {
					fileName: _jsxFileName,
					lineNumber: 110,
					columnNumber: 43
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 109,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 69,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 55,
		columnNumber: 10
	}, this);
}
//#endregion
export { CursoAluno as component };
