import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    assetsDir: "",
    minify: true,
    rollupOptions: {
      input: {
        main: resolve(path.dirname("."), "index.html"),
        nested: resolve(path.dirname("."), "index.html"),
      },
      preserveSymlinks: true,
      preserveEntrySignatures: "exports-only",
      output: {
        assetFileNames: "hihi",
        preserveModulesRoot: "/src",
        preserveModules: true,
      },
    },
  },

  server: {
    allowedHosts: ["all", "*", "326bab1b924b81.lhr.life"],

    watch: {
      // glob pattern(s) or a function/regex accepted by chokidar
      ignored: ["**/output/**", "**/.git/**", "**/src-tauri/**"],
    },
  },
});
