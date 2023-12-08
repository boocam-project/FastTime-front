import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [react()],
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    server: {
      proxy:
        mode === 'development'
          ? {
              '/api': {
                target: 'https://backend.boocam.net/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                secure: false,
                ws: true,
              },
            }
          : undefined,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
        @import "src/styles/abstracts/variables.scss";
        @import "src/styles/abstracts/mixins.scss";`,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  });
