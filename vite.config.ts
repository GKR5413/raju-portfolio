import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  return {
    server: {
      host: "::",
      port: 8080,
    },
    base: "./",
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',
      target: ['es2015', 'safari11'], // Better browser compatibility
      rollupOptions: {
        output: {
          manualChunks: undefined,
          format: 'es', // Ensure ES modules
        },
      },
    },
  };
});
