<template>
  <div class="header">
    <router-link :to="{ name: 'Home' }">Meta Coffee</router-link>
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <div v-if="user">
        <p>Hello {{ user.userInfo.name }}</p>
        <p>Sign Out</p>
      </div>
      <div v-else>
        <router-link :to="{ name: 'Login' }">Get Started</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount } from "@vue/runtime-core";
import { user, checkUser } from "../composables/getUser";
import { auth } from "../composables/arcanaInit";
export default {
  setup() {
    onBeforeMount(async () => {
      console.log(auth)
      const loggedIn = await auth.isLoggedIn()
      if(loggedIn) {
        await checkUser()
      }
      console.log(user.value);
    });
    return {
      user,
    };
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
}
.nav {
  display: flex;
  justify-content: space-around;
}
</style>
