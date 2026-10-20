import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Escuta em IPv4 e IPv6 (no Windows o "localhost" às vezes só abre em um deles)
  // e permite testar no celular pela mesma rede Wi-Fi.
  server: { host: true },
  preview: { host: true },
})
