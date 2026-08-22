import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import "../_libs/firebase.mjs";
import { i as uploadBytesResumable, r as ref, t as getDownloadURL } from "../_libs/firebase__storage.mjs";
import { n as auth, o as storage } from "./firebase-config-BpvLLNMw.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { Y as LoaderCircle, at as Image, ft as FileText, n as X } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-2_3vHNWL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MediaUpload-B1fhNNi7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
/**
* Uploads a file to Firebase Storage.
* Generates an authenticated user-scoped path by default:
* `uploads/{userId}/{folder}/{timestamp}-{safeName}`
*/
async function uploadFileToStorage(file, options = {}) {
	const userId = auth.currentUser?.uid || "public";
	const folder = options.folder || "media";
	let filePath = options.customPath;
	const fileName = options.filename || (file instanceof File ? file.name : `blob-${Date.now()}`);
	if (!filePath) {
		const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
		filePath = `uploads/${userId}/${folder}/${Date.now()}_${cleanFileName}`;
	}
	const storageRef = ref(storage, filePath);
	const meta = {
		contentType: options.metadata?.contentType || (file instanceof File ? file.type : "application/octet-stream") || "application/octet-stream",
		customMetadata: {
			uploadedBy: userId,
			originalName: fileName,
			...options.metadata?.customMetadata
		},
		...options.metadata
	};
	return new Promise((resolve, reject) => {
		const uploadTask = uploadBytesResumable(storageRef, file, meta);
		uploadTask.on("state_changed", (snapshot) => {
			if (snapshot.totalBytes > 0 && options.onProgress) {
				const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
				options.onProgress(progress);
			}
		}, (error) => {
			console.error("Firebase Storage upload error:", error);
			reject(error);
		}, async () => {
			try {
				const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
				if (options.onProgress) options.onProgress(100);
				resolve({
					downloadUrl,
					fullPath: uploadTask.snapshot.ref.fullPath,
					name: fileName,
					size: file.size,
					contentType: meta.contentType
				});
			} catch (err) {
				reject(err);
			}
		});
	});
}
var _jsxFileName = "/app/applet/src/components/MediaUpload.tsx";
function MediaUpload({ value, onChange, kind = "image", label, hint, accept, productKey }) {
	const inputRef = (0, import_react.useRef)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	async function pickFile(e) {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;
		const maxMB = kind === "image" ? 8 : 200;
		if (file.size > maxMB * 1024 * 1024) {
			toast.error(`Ficheiro maior que ${maxMB}MB`);
			return;
		}
		setUploading(true);
		setProgress(5);
		try {
			const uid = auth.currentUser?.uid;
			const folder = productKey ? `products/${productKey}` : kind === "image" ? "images" : "files";
			onChange((await uploadFileToStorage(file, {
				folder: uid ? `users/${uid}/${folder}` : `public/${folder}`,
				onProgress: (pct) => setProgress(pct)
			})).downloadUrl);
			toast.success("Upload concluído com sucesso");
		} catch (err) {
			console.error("Upload error:", err);
			toast.error(err.message || "Falha no envio do ficheiro");
		} finally {
			setUploading(false);
			setTimeout(() => setProgress(0), 400);
		}
	}
	const isImage = kind === "image";
	const Icon = isImage ? Image : FileText;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		label && /* @__PURE__ */ (void 0)("div", {
			className: "text-sm font-medium mb-1.5",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 67,
			columnNumber: 17
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
			ref: inputRef,
			type: "file",
			className: "hidden",
			accept: accept ?? (isImage ? "image/png,image/jpeg,image/webp,image/gif" : void 0),
			onChange: pickFile
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 68,
			columnNumber: 7
		}, this),
		value ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative rounded-xl border border-border bg-card overflow-hidden group",
			children: [isImage ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
				src: value,
				alt: "",
				className: "w-full h-48 object-cover"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 79,
				columnNumber: 13
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "h-10 w-10 rounded-lg bg-primary/10 grid place-items-center",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "h-5 w-5 text-primary-glow" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 83,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 82,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-sm truncate flex-1",
					children: "Ficheiro carregado"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 85,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 81,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "absolute top-2 right-2 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "button",
					size: "sm",
					variant: "secondary",
					onClick: () => inputRef.current?.click(),
					disabled: uploading,
					children: "Substituir"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 89,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "button",
					size: "icon",
					variant: "destructive",
					onClick: () => onChange(null),
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 88,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 77,
			columnNumber: 9
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
			type: "button",
			onClick: () => inputRef.current?.click(),
			disabled: uploading,
			className: "w-full rounded-xl border-2 border-dashed border-border hover:border-primary/60 hover:bg-primary/5 transition p-6 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground",
			children: uploading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary-glow" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 112,
				columnNumber: 15
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
				"A carregar... ",
				progress,
				"%"
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 113,
				columnNumber: 15
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 13
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "h-10 w-10 rounded-lg bg-primary/10 grid place-items-center",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-5 w-5 text-primary-glow" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 118,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 117,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "font-medium text-foreground",
					children: isImage ? "Clique para enviar imagem" : "Clique para enviar ficheiro"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 120,
					columnNumber: 15
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-xs",
					children: isImage ? "PNG, JPG, WEBP · até 8MB" : "Qualquer formato · até 200MB"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 123,
					columnNumber: 15
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 116,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 104,
			columnNumber: 9
		}, this),
		hint && /* @__PURE__ */ (void 0)("p", {
			className: "text-xs text-muted-foreground mt-1",
			children: hint
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 130,
			columnNumber: 16
		}, this),
		uploading && progress > 0 && progress < 100 && /* @__PURE__ */ (void 0)("div", {
			className: "h-1 mt-2 rounded-full bg-muted overflow-hidden",
			children: /* @__PURE__ */ (void 0)("div", {
				className: "h-full gradient-brand transition-all",
				style: { width: `${progress}%` }
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 133,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 132,
			columnNumber: 9
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 66,
		columnNumber: 5
	}, this);
}
//#endregion
export { MediaUpload as t };
