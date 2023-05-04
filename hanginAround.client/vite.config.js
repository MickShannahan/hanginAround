import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import basicSSL from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), basicSSL()],
  build: {
    outDir: '../hanginAround/client',
    sourcemap: false
  },
  server: {
    port: 8080
  }
})
