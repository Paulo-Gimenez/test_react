import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
   test: {
        coverage: {
            provider: "v8",
            reporter: ['text', 'json'], 
            include: ["src/**/*.{ts,tsx}"],
            exclude: ["node_modules/", "dist/", "src/main.tsx", "src/vitest.setup.ts","src/**/index.ts"],
            clean: true,
            cleanOnRerun: true,
        },
    },
})