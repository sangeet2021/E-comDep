import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/E-comDep/', // Add this line with your repository name
  build: {
    outDir: 'build', // Set the output directory to 'build'
  },
});