import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // glob pattern(s) or a function/regex accepted by chokidar
      ignored: ["**/output/**", "**/.git/**", "**/src-tauri/**"],
    },
  },
});
