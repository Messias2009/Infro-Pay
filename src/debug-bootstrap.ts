import * as reactStart from "@tanstack/react-start";

console.log("[DEBUG-BOOTSTRAP] Checking @tanstack/react-start module exports:");
console.log("[DEBUG-BOOTSTRAP] typeof createMiddleware:", typeof reactStart.createMiddleware);
console.log("[DEBUG-BOOTSTRAP] typeof createStart:", typeof reactStart.createStart);
console.log("[DEBUG-BOOTSTRAP] Available keys:", Object.keys(reactStart));
