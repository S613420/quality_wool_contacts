import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Set base path - use root for Firebase hosting
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'esnext',
    // Use esbuild for faster minification (much faster than terser)
    minify: 'esbuild',
    // Disable source maps in CI for faster builds (enable only in dev)
    sourcemap: process.env.NODE_ENV !== 'production',
    // Optimize build performance
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Firebase into smaller chunks for better loading
          'firebase-core': ['firebase/app'],
          'firebase-auth': ['firebase/auth'],
          'firebase-firestore': ['firebase/firestore'],
          'firebase-storage': ['firebase/storage'],
          // Split Vue ecosystem
          'vue-core': ['vue'],
          'vue-router': ['vue-router'],
          'vue-state': ['pinia'],
          // UI components
          'ui-components': ['@headlessui/vue', '@heroicons/vue'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
})