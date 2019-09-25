<template>
  <div class="card" id="card">
    <strong class="card-header-title" style="font-size: 3em; margin: auto">{{article.titre}}</strong>
    <div class="card-content" v-html="article.content"></div>
    <div class="card" id="card-foot">
        <span class="card-content" id="footer"> Ces informations vous-ont elles été utiles?</span>
    </div>
  </div>
</template>
<script>
  import { db } from "@/plugins/firebase";
  export default {
    data() {
      return {
        article: {}
      }
    },
    methods: {
      getArticle () {
        db.ref('articles/' + this.$route.params.id).once('value', (snap) => {
          if (snap.val()) {
            this.article = snap.val()
          } else {
            this.article = {}
          }
        })
      }
    },
    mounted () {
      this.getArticle()
    }
  }
</script>
<style >
#card{
  margin: auto;
  width: 50%;
  height: 100%;
  margin-top: 60px;
  border-radius: 2px 2px ;
  background-color: #ffffff;
}
#card-foot{
  width: 95%;
  position: relative;
  height: 50px;
  border: darkkhaki;
  background-color: #f2f7fa;
  margin: auto;
  bottom: 10px;
}
#footer{
  position: relative;
  top: 15px;
}
