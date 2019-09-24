import Vue from 'vue'
import Router from 'vue-router'
import Categorie from './components/categorie/Categorie.vue'
import Article from './components/article/Article.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/categorie'
    },
    {
      path: '/categorie',
      component: Categorie
    },
    {
      path: '/article/:id',
      component: Article,
      name: 'article'
    }
  ]
})
