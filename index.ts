import { createApp } from 'vue';
import plugin from './src/main';
import App from './App.vue';

// for demo purposes
createApp(App).use(plugin).mount('#app');