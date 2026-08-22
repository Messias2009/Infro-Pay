import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { u as Route$4 } from "./router-DcboVFjc.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { F as Plus, Xt as ArrowLeft, d as Trash2, kt as CirclePlay, ut as FolderPlus } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
import { t as Input } from "./input-DjHZoY-t.mjs";
import { t as Label } from "./label-STCOu1pl.mjs";
import { a as deleteModule, i as deleteLesson, n as createLesson, r as createModule, s as getMyCourseTree } from "./members.functions-Df7r0MfK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produtor.curso._id-Qh415ZU_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_authenticated/produtor.curso.$id.tsx?tsr-split=component";
function CursoEditor() {
	const { id } = Route$4.useParams();
	const treeFn = useServerFn(getMyCourseTree);
	const addModuleFn = useServerFn(createModule);
	const delModuleFn = useServerFn(deleteModule);
	const addLessonFn = useServerFn(createLesson);
	const delLessonFn = useServerFn(deleteLesson);
	const { data, refetch, isLoading, error } = useQuery({
		queryKey: ["course-tree", id],
		queryFn: () => treeFn({ data: { product_id: id } })
	});
	const [moduleTitle, setModuleTitle] = (0, import_react.useState)("");
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-10 text-muted-foreground",
		children: "A carregar..."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 35,
		columnNumber: 25
	}, this);
	if (error) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-10 text-destructive",
		children: error.message
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 36,
		columnNumber: 21
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "p-6 md:p-10 max-w-4xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/produtor/produtos",
				className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 39,
					columnNumber: 9
				}, this), " Voltar aos produtos"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 38,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-xs uppercase tracking-widest text-gold font-semibold",
						children: "Área de membros"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 42,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-display text-3xl font-bold mt-2",
						children: data?.product?.title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 45,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-muted-foreground mt-2",
						children: "Organize o conteúdo em módulos e aulas. Os alunos com compra aprovada terão acesso automático."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 46,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 41,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 rounded-2xl border border-border bg-card p-5 flex flex-col sm:flex-row gap-3 sm:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						className: "text-xs",
						children: "Novo módulo"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						className: "mt-1.5",
						value: moduleTitle,
						onChange: (e) => setModuleTitle(e.target.value),
						placeholder: "Módulo 1 — Fundamentos"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 55,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					className: "gradient-brand text-primary-foreground shadow-glow",
					disabled: moduleTitle.trim().length < 2,
					onClick: async () => {
						try {
							await addModuleFn({ data: {
								product_id: id,
								title: moduleTitle.trim(),
								description: null,
								sort_order: data?.modules?.length ?? 0
							} });
							setModuleTitle("");
							refetch();
							toast.success("Módulo criado");
						} catch (e) {
							toast.error(e.message);
						}
					},
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FolderPlus, { className: "h-4 w-4 mr-1" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 74,
						columnNumber: 11
					}, this), " Adicionar módulo"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 57,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 space-y-4",
				children: [!data?.modules?.length && /* @__PURE__ */ (void 0)("div", {
					className: "rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground",
					children: "Ainda não há módulos. Comece por criar o primeiro."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 79,
					columnNumber: 36
				}, this), data?.modules?.map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ModuleCard, {
					module: m,
					onDelete: async () => {
						await delModuleFn({ data: { id: m.id } });
						refetch();
					},
					onAddLesson: async (payload) => {
						try {
							await addLessonFn({ data: {
								module_id: m.id,
								sort_order: m.lessons.length,
								...payload
							} });
							refetch();
							toast.success("Aula adicionada");
						} catch (e) {
							toast.error(e.message);
						}
					},
					onDeleteLesson: async (lessonId) => {
						await delLessonFn({ data: { id: lessonId } });
						refetch();
					}
				}, m.id, false, {
					fileName: _jsxFileName,
					lineNumber: 82,
					columnNumber: 41
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 78,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 37,
		columnNumber: 10
	}, this);
}
function ModuleCard({ module: m, onDelete, onAddLesson, onDeleteLesson }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [video, setVideo] = (0, import_react.useState)("");
	const [minutes, setMinutes] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-2xl border border-border bg-card overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "px-5 py-4 border-b border-border flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-display font-semibold flex-1",
						children: m.title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 137,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs text-muted-foreground",
						children: [m.lessons.length, " aulas"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 138,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						size: "sm",
						variant: "destructive",
						onClick: onDelete,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 140,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 139,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 136,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "divide-y divide-border",
				children: m.lessons.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "px-5 py-3 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CirclePlay, { className: "h-4 w-4 text-primary-glow shrink-0" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 146,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-sm truncate",
								children: l.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs text-muted-foreground truncate",
								children: [
									l.duration_minutes ? `${l.duration_minutes} min` : "sem duração",
									" ·",
									" ",
									l.video_url ? "vídeo" : "sem vídeo"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 147,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => onDeleteLesson(l.id),
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 155,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 13
						}, this)
					]
				}, l.id, true, {
					fileName: _jsxFileName,
					lineNumber: 145,
					columnNumber: 36
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 144,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "px-5 py-4 border-t border-border grid gap-3 sm:grid-cols-4 items-end bg-background/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs",
							children: "Título da aula"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							className: "mt-1.5",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "Aula 1 — Introdução"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 163,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 161,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						className: "text-xs",
						children: "Link do vídeo"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 166,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						className: "mt-1.5",
						value: video,
						onChange: (e) => setVideo(e.target.value),
						placeholder: "https://…"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 11
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 165,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							className: "text-xs",
							children: "Min."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 171,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							className: "mt-1.5",
							type: "number",
							min: 0,
							value: minutes,
							onChange: (e) => setMinutes(e.target.value)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 172,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							className: "self-end",
							disabled: title.trim().length < 2,
							onClick: async () => {
								await onAddLesson({
									title: title.trim(),
									description: null,
									video_url: video || null,
									attachment_url: null,
									duration_minutes: minutes ? Number(minutes) : null,
									is_free: false
								});
								setTitle("");
								setVideo("");
								setMinutes("");
							},
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 187,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 174,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 169,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 160,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 135,
		columnNumber: 10
	}, this);
}
//#endregion
export { CursoEditor as component };
