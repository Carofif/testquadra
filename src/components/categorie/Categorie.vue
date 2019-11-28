<template>
  <div>
      <div class="columns is-mobile">
        <div class="column is-three-fifths is-offset-one-fifth">
          <router-link v-if="isCategorie" class="navbar-item has-text-dark" to="/categorie">
            <span>Aide en ligne/Catégorie</span>
          </router-link>
          <section class="container has-background-white" v-for="(item, index) in categories" :key="index" @click="setIsCategorie(!isCategorie)">
            <b-collapse :open="false" aria-id="contentIdForA11y1">
              <article class="media espace espacemargin"
                  slot="trigger"
                  aria-controls="contentIdForA11y1">
                <figure class="media-left">
                    <p class="image is-64x64">
                      <img :src="item.image" alt="">
                    </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                        <strong>{{item.libelle}}</strong>
                        <br>
                        {{articlesCat(item.id).length}} articles dans cette catégorie
                    </p>
                  </div>
                </div>
              </article>
                <div class="espace">
                  <div class="content espace has-background-light" v-for="(art, y) in articlesCat(item.id)" :key="y">
                    <router-link :to="{ name: 'article', params: { id: art.id }}">
                      <strong>{{art.titre}}</strong>
                      <br>
                        Mise à jour  {{getDate(art.date)}}
                  </router-link>
                  </div>
                </div>
            </b-collapse>
          </section>
        </div>
      </div>
    </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

moment.locale("fr")

export default {
  data() {
     return {
      isCategorie: false,
    }
  },
  computed: {
    ...mapGetters([
      'getCategories',
      'getArticles'
    ]),
    categories () {
      if (this.$route.params.id) {
        return this.getCategories.filter(cat => cat.id === this.$route.params.id)
      }
      return this.getCategories
    }
  },
  methods: {
    setIsCategorie(value){
      this.isCategorie = value
     },
    articlesCat(id) {
      return this.getArticles.filter(art => art.idCat === id)
    },
    getDate(date){
      return moment(date, 'YYYYMMDDHHmm').fromNow();
    }
  }
}   
</script>
