import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";
import { resolve } from "path";
import os from "os";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    https: {
      key: resolve(os.homedir(), "localhost-key.pem"),
      cert: resolve(os.homedir(), "localhost.pem"),
    },
  },
});
