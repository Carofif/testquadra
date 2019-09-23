import Vue from 'vue'
import Router from 'vue-router'
import Categorie from './components/categorie/Categorie.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    }
  ]
})
