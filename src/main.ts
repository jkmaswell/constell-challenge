import '@/assets/css/normalize.css'
import { router } from '@/router'
import '@/styles/styles.scss'
import { defaultConfig, plugin } from '@formkit/vue'
import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(plugin, defaultConfig)
  .mount('#app')
