import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  /* deployed under https://<user>.github.io/waypoint/ */
  base: mode === "production" ? "/waypoint/" : "/",
  plugins: [react(), tailwindcss()],
}));
