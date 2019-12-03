<template>
  <nav class="navbar is-transparent is-fixed-top color-navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item color-logo">
        <img src="../../assets/images/logo-affixe-2.0.svg" @click="$router.push('/')" height="41" class="padding-x-20">
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="separation-bar-header"></div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link is-arrowless padding-r-10">
            <figure class="image is-24x24 has-dropdown is-hoverable">
              <img class="is-rounded" src="../../assets/images/logo quadra2.jpg">
            </figure>
          </a>
          <!-- <div class="navbar-dropdown is-right">
            <a class="navbar-item" @click="logout">
              Deconnexion
            </a>
          </div> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { auth } from '@/plugins/firebase'

export default {

  data() {
    return {}
  },
  methods: {
    logout () {
      auth.signOut().then(() => {
        this.$router.replace('login')
      })
    },
  },
  mounted () {},
}
</script>

<style>

</style>