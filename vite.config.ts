import { copyFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';

// Имя репозитория = подпапка сайта на GitHub Pages
// (https://katymist.github.io/MiniGames-Story-1/). SPA-роутер работает на
// History API, поэтому base должен быть абсолютным: относительный './'
// ломает пути к скриптам на вложенных адресах вроде /library или /page/abc.
const PAGES_BASE = '/MiniGames-Story-1/';

// GitHub Pages не умеет history fallback: на любой неизвестный путь
// (/library, /unknown) он отдаёт 404.html. Кладём туда копию index.html --
// приложение загружается и уже само показывает нужную страницу (в том
// числе собственную страницу 404).
function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const outDir = path.resolve('dist');
      copyFileSync(path.resolve(outDir, 'index.html'), path.resolve(outDir, '404.html'));
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  root: '.',
  base: mode === 'production' ? PAGES_BASE : '/',
  plugins: [spaFallback()],
  build: {
    outDir: 'dist',
    sourcemap: mode !== 'production',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 4173,
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
}));
