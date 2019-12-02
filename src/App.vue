<template>
  <div id="app">
    <nav class="navbar is-info color-navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item color-logo" @click="$router.push('/')">
          <img src="./assets/images/logo.jpeg" width="112" height="28">
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
             <figure class="image is-24x24 imge">
              <img class="is-rounded" src="./assets/images/logo quadra2.jpg">
            </figure>
          
          <div class="linebord">
            <b-navbar-dropdown label="Quadra Diffusion Nord">
                  <b-navbar-item href="#">
                      Mon Profil
                  </b-navbar-item>
                  <b-navbar-item>
                      <b-button is-light @click="logout">Déconnexion</b-button>
                  </b-navbar-item>
            </b-navbar-dropdown>
          </div>
          <div class="navbar-item">
            <b-icon class="btn-icon" icon="help-circle" size="is-small" type="is-white"></b-icon>
            <figure class="image is-32x32 is-user-avatar">
              <img class="is-rounded" :src="currentUser.photoURL">
            </figure>
          </div>
        </div>
      </div>
    </nav>
    <div class="conteneur">
      <div class="columns is-mobile">
        <div class="column is-three-fifths is-offset-one-fifth">
          <section class="section padding-x-0">
            <div class="container">
              <nav class="level">
                <div class="level-left">
                  <div class="level-item">
                    <p class="subtitle is-10 has-text-white">
                      Comment pouvons-nous vous aider ?
                    </p>
                  </div>
                </div>
                <div class="level-right">
                  <p class="level-item has-text-white"><i class="fas fa-external-link-alt"></i></p>
                  <p class="level-item has-text-white">Aller sur Affixe2.0</p>
                </div>
              </nav>
              <div class="field">
                <b-autocomplete
                    v-model="search"
                    :data="filteredDataArray"
                    placeholder="Rechercher des réponses..."
                    icon="magnify"
                    field="motcle"
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
    <router-view></router-view>
  </div>
</template>

<script>
import { db } from '@/plugins/firebase'
import { mapActions, mapGetters } from 'vuex'
import { auth } from '@/plugins/firebase'

export default {
  name: 'app',
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
