/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// Импортируем стили в правильном порядке:
// 1. Сначала Vuetify стили
import 'vuetify/styles';
// 2. Material Design Icons
import '@mdi/font/css/materialdesignicons.css';
// 3. Tailwind CSS (последним, чтобы мог переопределять стили Vuetify)
import './css/app.css';

// Импортируем Vue приложение
import './js/app.js';
