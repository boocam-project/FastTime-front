import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [react()],
    server: {
      proxy:
        mode === 'development'
          ? {
              '/api': {
                target: 'http://3.36.128.110:8080/',
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
