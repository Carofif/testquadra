import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'
import Vue2Editor from "vue2-editor"
import store from './store'
import { auth } from '@/plugins/firebase'

Vue.use(Vue2Editor)
Vue.use(Buefy)
Vue.config.productionTip = false

let app = ''

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
