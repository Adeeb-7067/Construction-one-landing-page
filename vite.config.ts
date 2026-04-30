import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      proxy: {
        '/api': {
          target: (env.VITE_API_BASE_URL || 'https://constructionone.smarttechbros.com').replace(/\/$/, ""),
          changeOrigin: true,
          secure: false,
        }
      }
    },
    plugins: [
      react(),
      tailwindcss(),
      tsconfigPaths(),
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});

