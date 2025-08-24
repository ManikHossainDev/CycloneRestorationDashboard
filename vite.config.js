import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: {
    // allowedHosts: ["maniknew5000.sobhoy.com", "maniknew5000.sobhoy.com"],
    host: "0.0.0.0",
    port: 5000,
  },
});
