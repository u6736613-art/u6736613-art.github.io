import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/midterm-pos-app',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'midterm.html'),
      },
    },
  },
})