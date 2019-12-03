<template>
  <div id="app">
    <NavBar/>
    <div class="conteneur">
      <div class="columns is-mobile padding-t-60">
        <div class="column is-three-fifths is-offset-one-fifth">
          <section class="section padding-x-0">
            <div class="container">
              <nav class="level">
                <div class="level-left">
                  <div class="level-item">
                    <p class="subtitle is-4 has-text-weight-bold has-text-white">
                      Comment pouvons-nous vous aider ?
                    </p>
                  </div>
                </div>
                <div class="level-right">
                  <p class="level-item has-text-white"><i class="fas fa-external-link-alt"></i></p>
                  <p class="level-item has-text-white is-size-7">Aller sur Affixe2.0</p>
                </div>
              </nav>
              <div class="field">
                <b-autocomplete
                    v-model="search"
                    :data="filteredDataArray"
                    placeholder="Rechercher des réponses..."
                    icon="magnify"
                    field="motcle"
                    size="is-medium"
                    @select="option => selected = option">
                    <template slot-scope="props">
                        <p>
                          <strong> {{props.option.motcle}} </strong>
                          <br>
                          {{props.option.type}}
                        </p>
                    </template>
                    <template slot="empty">Aucun résultat trouvé</template>
                  </b-autocomplete>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="padding-b-65">
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { db } from '@/plugins/firebase'
import { mapActions, mapGetters } from 'vuex'
import { auth } from '@/plugins/firebase'
import NavBar from '@/components/general/Navbar.vue'
import Footer from '@/components/general/Footer.vue'

export default {
  name: 'app',
  components: { NavBar, Footer },
  data() {
    return {
      categories: [],
      articles: [],
      search: '',
      selected: null,
      currentUser: {}
    }
  },
  watch: {
    selected (val) {
      if (val.type === 'Article') {
        this.$router.push('/article/' + val.id)
      } else {
        this.$router.push('/categorie/' + val.id)
      }
    }
  },
  computed: {
    ...mapGetters([
      'getCategories',
      'getArticles'
    ]),
    allData () {
      const categories = []
      this.getCategories.forEach(cat => {
        cat.motcle = cat.libelle
        categories.push({
          ...cat,
          type: 'Categorie'
        })
      })
      const articles = []
      this.getArticles.forEach(art => {
        art.motcle = art.titre
        articles.push({
          ...art,
          type: 'Article'
        })
      })
      return categories.concat(articles)
    },
    filteredDataArray() {
      return this.allData.filter((option) => {
        return option.motcle
          .toString()
          .toLowerCase()
          .indexOf(this.search.toLowerCase()) >= 0
      })
    }
  },
  methods: {
    ...mapActions([
      'updateCategories',
      'updateArticles'
    ]),
    getCategorie () {
      db.ref('categories/').on('value', (snap) => {
        if (snap.val()) {
          this.updateCategories(Object.values(snap.val()))
        } else {
          this.updateCategories([])
        }
      })
    },
    getArticle () {
      const loadingComponent = this.$buefy.loading.open()
      db.ref('articles/').on('value', (snap) => {
        if (snap.val()) {
          this.updateArticles(Object.values(snap.val()))
          loadingComponent.close()
        } else {
          this.updateArticles([])
          loadingComponent.close()
        }
      })
    },
    logout () {
      auth.signOut().then(() => {
        this.$router.replace('login')
      })
    },
    user () {
      this.currentUser = auth.currentUser
    }
  },
  mounted () {
    this.getCategorie()
    this.getArticle()
    this.user()
  },
  destroyed () {
    db.ref('categories/').off()
    db.ref('articles/').off()
  }
}
</script>

<style>
@import './css/general.css';
@import './scss/user.scss';
</style>
