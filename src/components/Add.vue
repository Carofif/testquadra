<template>
  <div>
      <b-button type="is-success" icon-left="plus"  @click="AjoutArticle = true"></b-button>
        <b-modal :active.sync="AjoutArticle" :width="640" scroll="keep">
          <div class="card">
            <b-tabs v-model="activeTab" type="is-toggle" expanded>
              <b-tab-item label="Article">
                <b-field label="Catégorie">
                  <b-select placeholder="Selectionner la catégorie" v-model="catSelect">
                    <option
                      v-for="categorie in categories"
                      :value="categorie.id"
                      :key="categorie.id">
                      {{ categorie.libelle }}
                    </option>
                  </b-select>
                </b-field>
                <b-field label="Titre de l'article">
                  <b-input v-model="titreArticle"></b-input>
                </b-field>
                <b-field label="Contenue de l'article">
                  <vue-editor v-model="content"/>
                </b-field>
                <div class="buttons">
                  <b-button type="is-info" @click="addArticle">Valider</b-button>
                </div>
              </b-tab-item>

              <b-tab-item label="Catégorie">
                <b-field label="Catégorie">
                <b-input v-model="newCategorie"></b-input> <!-- recuperation de saisie de utilisateur -->
                </b-field>
                <div class="buttons">
                  <b-button type="is-info" @click="addCategorie">Valider</b-button> <!-- actiond de sauvegarde -->
                </div>
              </b-tab-item>
            </b-tabs>
          </div>
                    
        </b-modal>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { db } from "@/plugins/firebase"; // importation du module db de firebase
export default {
  data() {
     return {
      AjoutArticle: false,
      activeTab: 0,
      showBooks: false,
      content: "",
      titreArticle: '',
      categories: [], // table qui va recevoir toute les categories
      newCategorie: '', // variable charge de recevoir la value saisie pas l'utilisateur
      catSelect: {}
    }
  },
  components: {
    VueEditor
  },
  methods: {
    addArticle () {
      if (this.titreArticle.length && this.content.length && this.catSelect) {
        const idAct = db.ref().child('articles').push().key;
        db.ref('articles/' + idAct).set({
          titre: this.titreArticle,
          id: idAct,
          content: this.content,
          idCat: this.catSelect
        });
        this.titreArticle = ''
        this.content = ''
        this.$buefy.toast.open({
            message: 'Article enregistree',
            type: 'is-success',
            position: 'is-bottom'
        })
      } else {
        this.$buefy.toast.open({
            message: 'Aucunne donnee saisie',
            type: 'is-danger',
            position: 'is-bottom'
        })
      }
    },
    // fonction d'ajout d'une catégorie sur firebase
    addCategorie () {
      if (this.newCategorie.length) { // verifie si une info est saisie
        const idCat = db.ref().child('categories').push().key; // recupere la key genere par firebase 
        // envoi des donnees dans la base de donnee
        db.ref('categories/' + idCat).set({
          libelle: this.newCategorie,
          id: idCat
        });
        this.newCategorie = ''
        this.$buefy.toast.open({
            message: 'Catégorie enregistrée',
            type: 'is-success',
            position: 'is-bottom'
        })
      } else {
        this.$buefy.toast.open({
            message: 'Aucunne donnee saisie',
            type: 'is-danger',
            position: 'is-bottom'
        })
      }
    },
    getCat () {
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
    this.getCat()
  },
  destroyed () {
    db.ref('categories/').off()
  }
}
</script>

<style>
</style>
