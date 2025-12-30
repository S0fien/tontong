import netlifyTanstack from "@netlify/vite-plugin-tanstack-start";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // netlify({ redirects: { enabled: true } }),
    netlifyTanstack(),
  ],
  // build: {
  //   assetsDir: ".",
  //   lib: {
  //     // Could also be a dictionary or array of multiple entry points
  //     entry: resolve(__dirname, "src/routes.tsx"),
  //     name: "MyLib",
  //     // the proper extensions will be added
  //     fileName: "my-lib",
  //   },

  //   rollupOptions: {
  //     preserveSymlinks: true,
  //     preserveEntrySignatures: "exports-only",
  //     output: {
  //       inlineDynamicImports: true,
  //       // assetFileNames: "hihi",
  //       preserveModulesRoot: ".",
  //     },
  //   },
  // },

  server: {
    allowedHosts: ["all", "*", "326bab1b924b81.lhr.life"],

    watch: {
      // glob pattern(s) or a function/regex accepted by chokidar
      ignored: ["**/output/**", "**/.git/**", "**/src-tauri/**"],
    },
  },
});
