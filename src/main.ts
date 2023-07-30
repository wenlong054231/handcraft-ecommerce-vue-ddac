import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import router from "@/config/routes";
import store from "@/config/store";

const app = createApp(App)
app.use(router)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
