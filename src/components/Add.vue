<template>
  <div>
      <b-button type="is-primary" icon-left="plus"  @click="AjoutArticle = true"></b-button>
        <b-modal :active.sync="AjoutArticle" :width="640" scroll="keep">
          <div class="card">
            <b-tabs v-model="activeTab" type="is-toggle" expanded>
              <b-tab-item label="Article">
                <b-field label="Catégorie">
                  <b-select placeholder="Selectionner la catégorie">
                    <option
                      v-for="categorie in data"
                      :value="categorie.id"
                      :key="categorie.id">
                      {{ categorie.libelle_cat }}
                    </option>
                  </b-select>
                </b-field>
                <b-field label="Titre de l'article">
                  <b-input v-model="titrearticle"></b-input>
                </b-field>
                <b-field label="Contenue de l'article">
                  <vue-editor v-model="content"/>
                </b-field>
                <div class="buttons">
                  <b-button type="is-primary">Valider</b-button>
                </div>
              </b-tab-item>

              <b-tab-item label="Catégorie">
                <b-field label="Catégorie">
                <b-input v-model="categorie"></b-input>
                </b-field>
                <div class="buttons">
                        <b-button type="is-primary" @click="addCategorie">Valider</b-button>
                </div>
              </b-tab-item>
            </b-tabs>
          </div>
                    
        </b-modal>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  data() {
     return {
      AjoutArticle: false,
      activeTab: 0,
      showBooks: false,
      content: "",
      categorie: this.value,
      newCategorie: '',
    }
  },
  components: {
    VueEditor
  },
  watch: {
    value (value) {
      this.categorie = value
    }
  },
  methods: {
     addCategorie () {
      this.categorie.push({
        name: this.newCategorie
      })
      this.newCategorie = ''
    }
  },
  computed: {
    
  }
}
</script>

<style>

</style>