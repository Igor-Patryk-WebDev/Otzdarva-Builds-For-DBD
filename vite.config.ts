import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import babelPlugin from "@rolldown/plugin-babel";
import path from "path";

export default defineConfig({
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    babelPlugin({
      presets: [reactCompilerPreset()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:5173",
    //     changeOrigin: true
    //   }
    // },
    watch: {
      ignored: ["**/.env", "**/.env**"],
    },
  },
  base: "/",
});
