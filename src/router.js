import Vue from 'vue'
import { auth } from '@/plugins/firebase'
import Router from 'vue-router'
import Categorie from './components/categorie/Categorie.vue'
import Article from './components/article/Article.vue'
import Login from './components/Users/login.vue'
import Index from './views/index.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/categorie',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/categorie',
          name: 'categorie',
          component: Categorie
        },
        {
          path: '/categorie/:id',
          component: Categorie
        },
        {
          path: '/article/:id',
          component: Article,
          name: 'article'
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('index')
  else next()
})

export default router