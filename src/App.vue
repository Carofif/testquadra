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
              <Add></Add>
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
import Categorie from './components/categorie/Categorie.vue'
import Add from './components/Add.vue'

export default {
   name: 'app',
  components: {
    Categorie,
    Add
  },
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
