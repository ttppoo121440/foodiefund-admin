import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import dotenv from 'dotenv';
import terser from '@rollup/plugin-terser';

dotenv.config();
/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'development' ? '/' : '/foodiefund-admin/',
    plugins: [react(), eslintPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    build: {
      rollupOptions: {
        plugins: [terser()],
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
        },
      },
    },
  };
});
