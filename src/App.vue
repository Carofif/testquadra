<template>
  <div id="app">
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="./images/logo.jpeg" width="112" height="28">
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <Add></Add>
            </div>
          </div>
        </div>
      </div>
  </nav>
  <div class="h-100 conteneur">
      <section class="section">
        <div class="container">
             <!-- Main container -->
          <nav class="level">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item">
                <p class="subtitle is-10 has-text-white">
                  Comment pouvons-nous vous aider ?
                </p>
              </div>
              <div class="level-item"></div>
            </div>

            <!-- Right side -->
            <div class="level-right">
              <p class="level-item has-text-white"><i class="fas fa-external-link-alt"></i></p>
              <p class="level-item has-text-white">Aller sur Affixe2.0</p>
            </div>
          </nav>
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
    <router-view></router-view>
  </div>
</template>

<script>
import Add from './components/Add.vue'

export default {
   name: 'app',
  components: {
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
  background-color: whitesmoke;
  width: 100%;
  height: 100%;
}
html {
  height: 100%;
  background-color: #f2f7f9 !important;
}
.conteneur {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #388fec;
  margin-bottom: 30px;
}
.espace {
  padding: 20px;
}
.espacemargin {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
