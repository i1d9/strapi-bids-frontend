<template>
  <NavBar />
  <router-view :key="$route.fullPath"></router-view>
</template>

<script>

import NavBar from "./components/Nav.vue";

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>
