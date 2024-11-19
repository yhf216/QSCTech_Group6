import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import './assets/blockify.css'
// import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import { createAuth0 } from '@auth0/auth0-vue';


const vuetify = createVuetify({
  ssr: true,
  // icons: {
  //   defaultSet: 'mdi',
  //   aliases,
  //   sets: {
  //     mdi,
  //   },
  // },
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.use(
  createAuth0({
    domain: "dev-71i2pspc6nxi6874.us.auth0.com",
    clientId: "LdX6uHhzF4fwZc3AzDPzUOdPmMfz9tOz",
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
);

app.mount('#app')
