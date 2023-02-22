import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import Vant from 'vant'
import router from "./router";
import 'vant/lib/index.css'
import request from "./utils/request"
import mockRequest from "./utils/mockRequest";
import api from './utils/interface'
import carousel from './components/carousel.vue'
import store from "./store/index.js";
import './styles/index.css'
import './mock/mockServe.js'
const app=createApp(App)
app.config.globalProperties.$http=request
app.config.globalProperties.$a=api
app.config.globalProperties.$mock=mockRequest
app.component('Carousel',carousel)
app.use(Vant).use(router).use(store).mount('#app')
// router.isReady().then(()=>app.mount('#app'))
