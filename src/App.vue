<template>
  <div id="app">
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <b-button type="is-primary" icon-left="plus"  @click="AjoutArticle = true"></b-button>
               <b-modal :active.sync="AjoutArticle" :width="640" scroll="keep">
                 <div class="card">
                   <b-tabs v-model="activeTab">
                    <b-tab-item label="Article">
                         <b-field label="Categorie">
                            <b-select placeholder="Selectionner la catégorie">
                              <option
                                  v-for="option in data"
                                  :value="option.id"
                                  :key="option.id">
                                  {{ option.user.first_name }}
                              </option>
                            </b-select>
                         </b-field>
                        <b-field label="Titre de l'article">
                          <b-input v-model="titrearticle"></b-input>
                        </b-field>
                        <b-field label="Contenue de l'article">
                          <vue-editor v-model="content"/>
                        </b-field>
                    </b-tab-item>

                    <b-tab-item label="Categorie">
                       <b-field label="Categorie">
                         <b-input v-model="categorie"></b-input>
                       </b-field>
                       <div class="buttons">
                           <b-button type="is-primary">Valider</b-button>
                         </div>
                     </b-tab-item>
                  </b-tabs>
                 </div>
                 
                </b-modal>
            </div>
          </div>
        </div>
      </div>
  </nav>
  <div class="h-100 conteneur">
      <section class="section">
        <div class="container">
            <h1 class="title is-4" style="color: white">Comment pouvons-nous vous aider ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <span class="icon is-small is-left">
                    <i class="fas fa-external-link-alt"></i>
               </span>&nbsp; <h8 class="title is-6" style="color: white">Aller sur Affixe2.0</h8>
            </h1>
           <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" type="search" placeholder="Rechercher des réponses...">
                    <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                    </span>
                </p>
          </div> 
        </div>
      </section>
    </div>
    <Categorie></Categorie>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import Categorie from './components/categorie/Categorie.vue'

export default {
  data() {
      return {
        AjoutArticle: false,
        activeTab: 0,
        showBooks: false,
        content: ""
      }
  },
  name: 'app',
  components: {
    VueEditor,
    Categorie
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
}
.conteneur {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #388fec;
}
</style>
