<template>
<div>
  <div class="columns is mobible">
    <div class="column is-three-fifths is-offset-one-fifth">
      <router-link class="navbar-item has-text-dark" to="/categorie">
        <span>Aide en ligne/Catégorie</span>
      </router-link>
      <div class="card" id="card" v-if="getArticles.length">
        <strong class="card-header-title" style="font-size: 3em; margin: auto">{{article.titre}}</strong>
        <div class="card-content" v-html="article.content"></div>
        <div class="card" id="card-foot">
            <span class="card-content" id="footer"> Ces informations vous-ont elles été utiles?
              <img src="./../../assets/images/smiling.png" alt="">
              <img src="./../../assets/images/confused.png" alt="">
              <img src="./../../assets/images/unhappy.png" alt="">
            </span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters} from 'vuex'
  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'getArticles'
      ]),
      article () {
        return this.getArticles.filter(art => art.id === this.$route.params.id)[0]
      }
    },
    methods: {},
    mounted () {}
  }
</script>
