import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'ant-design-vue/es/message/style/css'; //use ant-design-vue/es instead of ant-design-vue/lib

import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
