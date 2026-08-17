import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/AI-PREP.IO/', // 👈 Updated to match your exact repository name
  plugins: [
    tailwindcss(),
  ],
})
