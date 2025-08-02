/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.{js,vue,ts}",
    "./templates/**/*.html.twig",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      // Кастомные цвета, которые не конфликтуют с Vuetify
      colors: {
        'custom-blue': '#1e40af',
        'custom-green': '#059669',
        'custom-red': '#dc2626',
      },
      // Кастомные анимации
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
  // Важно: не переопределяем базовые классы Vuetify
  corePlugins: {
    preflight: false, // Отключаем reset CSS, чтобы не конфликтовать с Vuetify
  },
} 