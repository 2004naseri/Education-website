import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Allow external connections
    port: 5173, // Explicit port (avoid random ports)
    // strictPort: true, // Prevent automatic port switching
    // cors: true, // Enable CORS headers (optional)
    proxy: {
      "/uploads": {
        target: "https://245fa6b54bc0.ngrok-free.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // server: {
  //   proxy: {
  //     "/api": "http://localhost:5000",
  //   },
  // },
});
