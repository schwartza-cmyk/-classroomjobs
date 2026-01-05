import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    allowedHosts: [
      'warm-7e527ba5-vite.devcontainer-b36d8853-02a6-40df-a.svc.cluster.local'
    ],
    headers: {
      'X-Frame-Options': 'ALLOWALL'
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
