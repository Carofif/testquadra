<template>
  <div id="app">
    <nav class="navbar is-info color-navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item color-logo">
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
                  <b-navbar-item href="#">
                      Déconnexion
                  </b-navbar-item>
            </b-navbar-dropdown>
          </div>
          <div class="navbar-item">
            <b-icon class="btn-icon" icon="help-circle" size="is-small" type="is-white"></b-icon>
            <figure class="image is-32x32">
              <img class="is-rounded" src="https://bulma.io/images/placeholders/32x32.png">
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

export default {
  name: 'app',
  data() {
    return {
      categories: [],
      articles: [],
      search: '',
      selected: null
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 0px;
  background-color: whitesmoke;
  width: 100%;
  height: 100%;
}
html {
  height: 100%;
  background-color: #f2f7f9 !important;
}
.conteneur {
  background-color: #3598dc;
  margin-bottom: 30px;
}
.espace {
  padding: 20px;
}
.espacemargin {
  margin-bottom: 10px;
  margin-top: 10px;
}
.btn_add {
  position: absolute;
  right: 10px;
  top: 7px
}
.padding-x-0 {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.color-navbar {
  background: linear-gradient(to right, rgba(32, 122, 184, 1) 0%, rgba(53, 152, 220, 1)100%);
}
.color-logo {
  background: linear-gradient(to right, rgba(32, 122, 184, 1) 0%, rgba(53, 152, 220, 1)100%);
}
.btn-icon {
  padding-right: 20px;
}
.linebord {
  border-right: white solid 1px;
}
.imge {
  margin-top: 10px;
  padding-right: 0px;
}
</style>
