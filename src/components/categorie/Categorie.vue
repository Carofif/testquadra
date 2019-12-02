<template>
  <div>
    <div class="columns is-mobile">
      <div class="column is-three-fifths is-offset-one-fifth">
        <section
          class="container has-background-white"
          v-for="(item, index) in categories"
          :key="index">
          <b-collapse :open="false" aria-id="contentIdForA11y1">
            <article
              class="media espace espacemargin"
              slot="trigger"
              aria-controls="contentIdForA11y1">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img :src="item.image" alt />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <router-link :to="{ name: 'categorieSelect', params: { id: item.id }}">
                      <strong class="has-text-black">{{item.libelle}}</strong>
                    </router-link>
                    <br/>
                    {{articlesCat(item.id).length}} articles dans cette catégorie
                  </p>
                </div>
              </div>
            </article>
          </b-collapse>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"


export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(["getCategories", "getArticles"]),
    categories() {
      if (this.$route.params.id) {
        return this.getCategories.filter(cat => cat.id === this.$route.params.id);
      }
      return this.getCategories;
    }
  },
  methods: {
    articlesCat(id) {
      return this.getArticles.filter(art => art.idCat === id);
    }
  }
}
</script>

<style>
.ariaposition {
  top: 0px;
  left: 0px;
  width: 111px;
  height: 19px;
}
.arialigne {
  text-align: left;
  font: Regular 14px Open Sans;
  letter-spacing: 0;
  color: #C2CAD8;
}
.ariacat{
  text-align: left;
  font: Regular 19px Open Sans;
  letter-spacing: 0;
  color: #2C3E50
}
</style>
