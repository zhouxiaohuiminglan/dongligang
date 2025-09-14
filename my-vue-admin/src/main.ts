import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import permission from './directives/permission'

import "./mock/index"
import "./router/guard"
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.directive("permission",permission);

const Pinia = createPinia();
app.use(Pinia)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
