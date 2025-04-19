import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000, // Specify your desired port
  },
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
})
