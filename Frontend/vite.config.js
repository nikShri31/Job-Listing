import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/icons-material','@mui/system']
  },
  plugins: [
    react(),
  //   checker({
  //   eslint: {
  //     lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
  //   },
  // }),
],
})
