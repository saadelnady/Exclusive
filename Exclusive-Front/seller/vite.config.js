// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    svgrPlugin({
      include: "**/*.svg",
      svgrOptions: {
        exportType: "default",
      },
    }),
  ],
  esbuild: {
    include: /\.[jt]sx?$/,
    exclude: [],
    loader: "jsx",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/variables.scss" as *;`,
      },
    },
  },
});
