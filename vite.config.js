import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/AI-PREP.IO/', // 👈 Make sure this matches your GitHub repo name exactly
  plugins: [
    tailwindcss(),
  ],
})
