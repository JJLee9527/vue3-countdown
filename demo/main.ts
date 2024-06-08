import { createApp } from 'vue';
import VCountdownPlugin from '../src/index';
import App from './index.vue';

// for demo purposes
const app = createApp(App)
app.use(VCountdownPlugin)
app.mount('#app');