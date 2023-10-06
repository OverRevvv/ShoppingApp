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
Todo: inovole express session id in auth by using it to check if user has the token allocated before doing any action
Todo: edit the endpoints for post and delete and make it call the "_id" instead of "id"
*/