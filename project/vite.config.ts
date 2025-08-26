import vue from "@vitejs/plugin-vue";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
});
