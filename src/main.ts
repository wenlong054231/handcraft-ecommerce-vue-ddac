import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import 'element-plus/theme-chalk/src/message.scss'
import router from "@/config/routes";
import store from "@/config/store";
import { faArrowLeft, faKey, faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faKey) // 用户登录相关icon
library.add(faArrowLeft)

const app = createApp(App)
app.use(router)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
