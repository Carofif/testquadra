<template>
  <div>
        <a class="navbar-item has-text-dark" href="/src/components/categorie/Categorie.vue">
          <span>Aide en ligne/Catégorie</span>
        </a>
      <section class="container has-background-white" v-for="(item, index) in categories" :key="index">
        <b-collapse :open="false" aria-id="contentIdForA11y1">
          <article  class="media espace espacemargin"
                slot="trigger"
                 aria-controls="contentIdForA11y1">
            <figure class="media-left">
                <p class="image is-64x64">
                <img src="../../images/img.png" alt="">
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
                     Mise à jour il y a  {{getDate(art.date)}}
              </router-link>
              </div>
            </div>
        </b-collapse>
      </section>
    </div>
</template>

<script>
import { db } from "@/plugins/firebase";
import moment from "moment";

export default {
  data() {
     return {
      categories: [],
      articles: []
    }
  },
  methods: {
    articlesCat(id) {
      return this.articles.filter(art => art.idCat === id);
    },
    getArticle () {
      db.ref('articles/').on('value', (snap) => {
        if (snap.val()) {
          this.articles = Object.values(snap.val())
        } else {
          this.articles = []
        }
      })
    },
    getDate(date){
     return moment(date, 'lll').fromNow();
    },
    getCategorie () {
      db.ref('categories/').on('value', (snap) => {
        if (snap.val()) {
          this.categories = Object.values(snap.val())
        } else {
          this.categories = []
        }
      })
    }
  },
  mounted () {
    this.getCategorie()
    this.getArticle()
  },
  destroyed () {
    db.ref('categories/').off()
    db.ref('articles/').off()
  }
}
</script>
