import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'


const app = createApp(App)
// global.localStorage=new LocalStorage("./storage")
app.use(router)

app.mount('#app')
