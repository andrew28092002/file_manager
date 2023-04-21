import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: [".js", ".vue", ".json", ".scss"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
      styles: resolve("src/assets/scss"),
    },
  },
});
