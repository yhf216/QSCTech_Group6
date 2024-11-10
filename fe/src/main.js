import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import './assets/blockify.css'

const vuetify = createVuetify({
  ssr: true,
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
