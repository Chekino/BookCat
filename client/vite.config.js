import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ce middleware redirige toutes les routes vers index.html pour le routage côté client
  build: {
    outDir: "dist",
  },
});
