import { defineConfig } from 'vite'

export default defineConfig({
  // Set base path for GitHub Pages deployment
  // Replace 'quality_wool_contacts' with your actual repository name
  base: process.env.NODE_ENV === 'production' ? '/quality_wool_contacts/' : '/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for debugging
    sourcemap: true,
    // Optimize build
    minify: 'terser',
    rollupOptions: {
      output: {
        // Optimize chunk splitting
        manualChunks: {
          vendor: ['firebase/app', 'firebase/firestore', 'firebase/auth'],
        }
      }
    }
  },
  
  // Development server configuration
  server: {
    port: 3000,
    open: true
  },
  
  // Handle environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }
});