// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = Boolean(process.env.VERCEL || process.env.NOW_BUILDER);
const targetPreset = process.env.NITRO_PRESET || (isVercel ? "vercel" : undefined);

export default defineConfig({
  nitro: {
    ...(targetPreset ? { preset: targetPreset } : {}),
    ...(isVercel
      ? {}
      : {
          output: {
            dir: "dist",
            serverDir: "dist/server",
            publicDir: "dist",
          },
        }),
  },
});

