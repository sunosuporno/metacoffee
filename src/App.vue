<template>
  <NavBar/>
  <router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { onBeforeMount } from '@vue/runtime-core';
import {auth, initAuth} from './composables/arcanaInit'
  export default {
    components: {
      NavBar
    },
    setup() {
      onBeforeMount(async() => {
        console.log(auth)
      })
      return {};
    },
  };
</script>

<style scoped>

</style>
