import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import pluginRewriteAll from 'vite-plugin-rewrite-all';

// export default {
//   plugins: [react(),pluginRewriteAll()]
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
