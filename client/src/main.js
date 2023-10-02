import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(router);
app.mount('#app')

/* 
Todo: Add page transtion 
Todo: Make UI slightly more better
Todo: Optimize whole UI for Mobile and Tablet Devices.
*/