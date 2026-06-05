// Purpose: Configures Vite to compile React JSX with the official React plugin,
// enabling the modern JSX runtime and fast refresh during development.
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173
  }
});
