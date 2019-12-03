<template>
<div>
  <div class="columns is mobible">
    <div class="column is-three-fifths is-offset-one-fifth" v-if="article">

      <!-- Fil d'arriane -->
      <div class="container">
        <router-link :to="{ name: 'categorieSelect', params: { id: article.idCat }}">
         <p class="arialigne">Aide en ligne /  <strong class="ariacat">Catégorie</strong></p>
        </router-link>
      </div>

      <!-- Bloc article -->
      <div class="container">
        <div class="card pb-20">
          <div class="padding-content-art">
            <div class="pb-20">
              <strong class="is-size-4">{{article.titre}}</strong>
            </div>
            <div v-html="article.content"></div>
          </div>
          <div class="margin-x-20 p20 color-back-grid">
            <!-- <span> Ces informations vous-ont elles été utiles?
              <a @click="clickImage(15)"><img src="./../../assets/images/smiling.png"></a>
              <a @click="clickImage(10)"><img src="./../../assets/images/confused.png"></a>
              <a @click="clickImage(5)"><img src="./../../assets/images/unhappy.png"></a>
            </span> -->
            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  <p class="has-text-weight-bold color-grid-2 is-6">Ces informations vous-ont elles été utiles?</p>
                </div>
                <div class="level-item pl">
                  <a @click="clickImage(15)"><img src="./../../assets/images/Image 1.png"></a>
                </div>
                <div class="level-item">
                  <a @click="clickImage(10)"><img src="./../../assets/images/Image 3.png"></a>
                </div>
                <div class="level-item">
                  <a @click="clickImage(5)"><img src="./../../assets/images/Image 2.png"></a>
                </div>
              </div>
            </nav>
          </div>
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
