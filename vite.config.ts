import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default () =>
  defineConfig({
    plugins: [react(), svgr()],
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  });
