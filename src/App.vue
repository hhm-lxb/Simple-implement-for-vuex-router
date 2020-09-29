<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- router -->
    <router-link to="/home">home</router-link>
    <router-link to="/sub">sub</router-link>
    <router-view></router-view>
    <!-- vuex -->
    <div @click="addCount">{{ $store.state.count }}</div>
    <div @click="asyncAddCount">{{ $store.state.count }}</div>
    <div>{{ $store.getters }}</div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods: {
    addCount () {
      this.$store.commit('addCount')
    },
    asyncAddCount () {
      this.$store.dispatch('addCount')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
