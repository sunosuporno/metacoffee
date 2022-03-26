<template>
  <NavBar v-if="renderNavbar"/>
  <router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { onBeforeMount, onMounted, ref, watch } from '@vue/runtime-core';
import {auth, initAuth} from './composables/arcanaInit'
import { useRouter } from 'vue-router';
  export default {
    components: {
      NavBar
    },
    setup() {
      const router = useRouter();
      const renderNavbar = ref(true);
    const currentName = ref("");

      // onBeforeMount(async() => {
      //   console.log(auth)
      //   const route = router.currentRoute.value.path;
      //   console.log(route)
      //   route == "User" ? renderNavbar.value = false : renderNavbar.value = true
      // })
      watch(
      () => router.currentRoute.value.name,
      (name) => {
        currentName.value = name;
        console.log(currentName.value);
        currentName.value == "User" ? renderNavbar.value = false : renderNavbar.value = true
      }
    );
      return {
        renderNavbar
      };
    },
  };
</script>

<style scoped>

</style>
