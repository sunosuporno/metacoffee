<template>
  <div class="header">
    <router-link :to="{ name: 'Home' }">Meta Coffee</router-link>
    <div class="nav">
      <div v-if="user">
        <div class="avi-image" :style="{background: backgroundImageUrl}"></div>
        <p>Hello {{ user.userInfo.name }}</p>
      </div>
      <div v-else>
        <router-link :to="{ name: 'Login' }">Get Started</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { user, checkUser } from "../composables/getUser";
import { auth } from "../composables/arcanaInit";
export default {
  setup() {
    const backgroundImageUrl = ref(null);
    onBeforeMount(async () => {
      console.log(auth)
      const loggedIn = await auth.isLoggedIn()
      if(loggedIn) {
        await checkUser()
      }
      console.log(user.value);
      backgroundImageUrl.value  = user.value.userInfo.picture
      
      console.log(backgroundImageUrl.value)
    });

    return {
      user,
      backgroundImageUrl
    };
  },
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.nav {
  display: flex;
  justify-content: space-around;
}
.avi-image{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('https://lh3.googleusercontent.com/a-/AOh14Gghyp6RAkIU87WBSl0SHR7wWwjys2WkqeTgFrcr1Es=s96-c');
}
</style>
