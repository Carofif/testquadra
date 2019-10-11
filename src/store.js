import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories : [],
    articles : [],
    currentArticle : {}
  },
  mutations: {
    SET_CATEGORIES: (state, data) => {
      state.categories = data
    },
    SET_ARTICLES: (state, data) => {
      state.articles = data 
    },
    SET_ARTICLE: (state, data) => {
      state.currentArticle = data
    }
  },
  getters: {
    getCategories: state => {
      return state.categories
    },
    getArticles: state => {
      return state.articles
    },
    getCurrentArticle: state => {
      return state.currentArticle
    }
  },
  actions: {
    updateCategories: (context, data) => {
      context.commit('SET_CATEGORIES', data)
    },
    updateArticles: (context, data) => {
      context.commit('SET_ARTICLES', data)
    },
    updateArticle: ({commit, state}, id) => {
      commit('SET_ARTICLE', state.articles.filter(art => art.id === id)[0])
      return state.articles.filter(art => art.id === id)[0]
    }
  }
})
