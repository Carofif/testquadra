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
              <b-field class="file">
                <b-upload v-model="image" @input="imageAdd">
                  <a class="button is-info">
                    <b-icon icon="upload"></b-icon>
                    <span>Cliquer pour ajouter l'image de la catégorie</span>
                  </a>
                </b-upload>
                <span class="file-name" v-if="image">
                  {{image.name}}
                </span>
               </b-field>
              <b-field label="Catégorie">
              <b-input v-model="newCategorie"></b-input>
              </b-field>
              <div class="buttons">
                <b-button type="is-info" @click="addCategorie">Valider</b-button>
              </div>
            </b-tab-item>
          </b-tabs>
        </div>      
      </b-modal>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { db } from '@/plugins/firebase'
import moment from 'moment'

moment.locale("fr")

export default {
  data() {
     return {
      AjoutArticle: false,
      activeTab: 0,
      showBooks: false,
      content: '',
      titreArticle: '',
      categories: [],
      newCategorie: '',
      catSelect: {},
      image: null,
      dataUrlImage: null
    }
  },
  components: {
    VueEditor
  },
  methods: {
    imageAdd (e) {
      const imge = e;
      const reader = new FileReader();
      reader.readAsDataURL(imge);
      reader.onload = e =>{
          this.dataUrlImage = e.target.result;
      }
    },
    addArticle () {
      if (this.titreArticle.length && this.content.length && this.catSelect) {
        const idAct = db.ref().child('articles').push().key;
        db.ref('articles/' + idAct).set({
          titre: this.titreArticle,
          id: idAct,
          content: this.content,
          idCat: this.catSelect,
          date: moment().format('YYYYMMDDHHmm')
        });
        this.titreArticle = ''
        this.content = ''
        this.$buefy.toast.open({
            message: 'Article enregistrée',
            type: 'is-success',
            position: 'is-bottom'
        })
      } else {
        this.$buefy.toast.open({
            message: 'Aucune donnée saisie',
            type: 'is-danger',
            position: 'is-bottom'
        })
      }
    },
    addCategorie () {
      if (this.newCategorie.length && this.dataUrlImage) {
        const idCat = db.ref().child('categories').push().key;
        db.ref('categories/' + idCat).set({
          libelle: this.newCategorie,
          id: idCat,
          image: this.dataUrlImage
        });
        this.newCategorie = ''
        this.$buefy.toast.open({
            message: 'Catégorie enregistrée',
            type: 'is-success',
            position: 'is-bottom'
        })
      } else {
        this.$buefy.toast.open({
            message: 'Aucune donnée saisie',
            type: 'is-danger',
            position: 'is-bottom'
        })
      }
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
  },
  destroyed () {
    db.ref('categories/').off()
  }
}
</script>
