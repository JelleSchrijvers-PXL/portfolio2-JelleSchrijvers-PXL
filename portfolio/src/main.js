import '../src/assets/css/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import i18n from './i18n'

const faviconHref = `${import.meta.env.BASE_URL}favicon_portfolio.png`

document.getElementById('portfolio-favicon')?.setAttribute('href', faviconHref)
document.getElementById('portfolio-apple-touch-icon')?.setAttribute('href', faviconHref)

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app');
