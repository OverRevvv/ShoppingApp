import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../dist', // Set the output directory outside of the root
  },
  server: {
    proxy: {
      "/api": {
        target: 'http://localhost:8000/' || 'http://localhost:10000/',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
