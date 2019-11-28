<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  },
  computed: {},
  methods: {
    getUser () {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.$router.push('index')
        } else {
          this.$router.push('login')
        }
      })
    }
  },
    
}
</script>
