import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";      


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: false,
    rollupOptions: {
      preserveEntrySignatures: "allow-extension",
      output: {
        compact: true,
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
