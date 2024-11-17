import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { VueQueryPlugin } from '@tanstack/vue-query'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHouse,
  faCartShopping,
  faArrowRightFromBracket,
  faCircleUser,
  faClockRotateLeft,
  faArrowLeft,
  faArrowRight,
  faEnvelope,
  faPhone,
  faCity,
  faTrash,
  faPlus,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faHouse,
  faArrowRightFromBracket,
  faCircleUser,
  faCartShopping,
  faClockRotateLeft,
  faArrowLeft,
  faArrowRight,
  faEnvelope,
  faPhone,
  faCity,
  faTrash,
  faPlus,
  faMagnifyingGlass
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app');
app.use(VueQueryPlugin);