import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import qiankun from 'vite-plugin-qiankun';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), qiankun('vbenApp', { useDevMode: true })],
  server: {
    port: 8001,
  },
});
