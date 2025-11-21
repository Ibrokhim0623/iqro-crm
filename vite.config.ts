import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@icons": path.resolve(__dirname, "src/assets/icons"),
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@routing": path.resolve(__dirname, "src/routing"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@queries": path.resolve(__dirname, "src/queries"),
      "@reducers": path.resolve(__dirname, "src/store/reducers"),
      "@lib": path.resolve(__dirname, "src/lib"),
    },
  },
});
