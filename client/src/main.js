import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import router from './router'
const app = createApp(App)
app.use(router,Vue3Toastify);
app.mount('#app')