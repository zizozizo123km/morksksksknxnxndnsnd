import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Standard port for modern web apps
    port: 3000,
    open: true,
  },
  build: {
    // Use modern targets for better performance
    target: 'es2020',
    // Optimize asset handling for production
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group major dependencies into separate chunks
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('axios') || id.includes('framer-motion')) {
              return 'vendor-libs';
            }
            return 'vendor';
          }
        },
      },
    },
    // Generate sourcemaps only if debugging is critical, otherwise disable for security/size
    sourcemap: false, 
  },
});