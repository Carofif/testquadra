<template>
  <div>
    <div class="columns is-mobile">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="ariaposition">
            <router-link :to="{ name: 'categorie'}">
              <p class="arialigne">Aide en ligne/ <strong class="ariacat">Catégorie</strong></p>
            </router-link>
        </div>
        <section class="container has-background-white">
          <article  class="media espace espacemargin" slot="trigger" aria-controls="contentIdForA11y1">
            <figure class="media-left">
              <p class="image is-64x64" >
              <img :src="categories.image" alt="">
              </p>
            </figure>
            <div class="media-content">
              <div class="container has-background-white">
              <p>
                  <strong class="has-text-black">{{categories.libelle}}</strong>
                  <br>
                  {{articlesCat(categories.id).length}} articles dans cette catégorie
              </p>
              </div>
            </div>
          </article>
          <div class="espace">
              <div class="content espace has-background-light" v-for="(art, y) in articlesCat(categories.id)" :key="y">
                 <router-link :to="{ name: 'article', params: { id: art.id }}">
                    <strong>{{art.titre}}</strong>
                    <br>
                    Mise à jour il y a  {{getDate(art.date)}}
                 </router-link>
              </div>
          </div>    
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import moment from "moment"

moment.locale("fr")

export default {
  name: "CategorieSelect",
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["getCategories", "getArticles"]),
    categories() {
      if (this.$route.params.id) {
        this.getCategories.filter(cat => cat.id == this.$route.params.id)
        return this.getCategories[0]
      }
      return this.getCategories
    }
  },
  methods: {
    articlesCat(id) {
      return this.getArticles.filter(art => art.idCat === id)
    },
    getDate(date) {
      return moment(date, "lll").fromNow()
    }
  }
}
</script>

<style>
</style>