import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server:{
    host: "0.0.0.0",
    port: 8000,
    allowedHosts: ["letsconnect-2fpb.onrender.com"], // Add your host here
  },
  plugins: [react(), tailwindcss()],
});
