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
            <a  @click="clickImage(15)"><img src="./../../assets/images/smiling.png" alt="" id="img1"></a>
            <a  @click="clickImage(10)"><img src="./../../assets/images/confused.png" alt="" id="img2"></a>
            <a @click="clickImage(5)"><img src="./../../assets/images/unhappy.png" alt="" id="img3"></a>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { db } from '@/plugins/firebase'
import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        note: 0
      }
    },
    computed: {
      ...mapGetters([
        'getArticles'
      ]),
      article () {
        return this.getArticles.filter(art => art.id === this.$route.params.id)[0]
      }
    },
    methods: {
      clickImage (v) {
        let TableNote = []
        if (this.article.note) {
          TableNote = this.article.note
        }
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        TableNote.push(v);
        db.ref('articles/').child(this.article.id).update({
          note: TableNote, moyenne: TableNote.reduce(reducer)/TableNote.length
        })
      }
    },
    mounted () {}
  }
</script>
