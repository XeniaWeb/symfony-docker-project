import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import symfonyPlugin from 'vite-plugin-symfony'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    symfonyPlugin(),
  ],
  build: {
    outDir: 'public/build',
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'assets/app.js'),
        styles: resolve(__dirname, 'assets/css/app.css'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    manifest: true,
    sourcemap: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'assets/js'),
    },
  },
})
