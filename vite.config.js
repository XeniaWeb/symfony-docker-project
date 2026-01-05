import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import symfonyPlugin from 'vite-plugin-symfony'
import { resolve } from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [
    vue(),
    symfonyPlugin(),
  ],
  build: {
    outDir: 'public/build',
    cssCodeSplit: false, // Все CSS в одном файле для упрощения подключения
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'assets/app.js'),
      },
      output: {
        format: 'es',
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Переименовываем style.css в app.css для соответствия entry point
          if (assetInfo.name === 'style.css') {
            return 'app.css';
          }
          return '[name].[ext]';
        },
        manualChunks: (id) => {
          // Разделяем vendor библиотеки на отдельные чанки (только JS)
          if (id.includes('node_modules')) {
            // Vuetify - большая библиотека, выносим отдельно
            if (id.includes('vuetify')) {
              return 'vendor-vuetify';
            }
            // Vue и его зависимости
            if (id.includes('vue') || id.includes('@vue')) {
              return 'vendor-vue';
            }
            // Остальные node_modules
            return 'vendor';
          }
        }
      }
    },
    manifest: true,
    sourcemap: true,
    // Можно увеличить лимит предупреждения, но лучше оптимизировать через manualChunks
    // chunkSizeWarningLimit: 1000,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'localhost',
      port: 5173,
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'assets/js'),
    },
  },
})
