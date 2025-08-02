import { createApp } from 'vue';
import App from './components/App.vue';
import vuetify from './plugins/vuetify';

// Создаем Vue приложение
const app = createApp(App);

// Подключаем Vuetify
app.use(vuetify);

// Монтируем приложение в элемент с id 'app'
app.mount('#app'); 