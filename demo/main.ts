import { createApp } from 'vue';
import VCountdown from '../src/index';
import App from './App.vue';

// for demo purposes
const app = createApp(App)
app.use(VCountdown, { name: 'v-countdown' })
app.mount('#app');