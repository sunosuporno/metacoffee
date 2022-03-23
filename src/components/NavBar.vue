<template>
  <header>
      <router-link :to="{ name: 'Home' }" class="main-name">Firma</router-link>
    <nav class="nav">
      <div v-if="user">
        <!-- <div class="avi-image" :style="{backgroundImage: url(backgroundImageUrl)}"></div> -->
        <p>Hello {{ user.userInfo.name }}</p>
        <button @click="handleClick">Log out</button>
      </div>
      <div v-else>
        <router-link :to="{ name: 'Login' }">Get Started</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { user, checkUser } from "../composables/getUser";
import { auth } from "../composables/arcanaInit";
import { useRouter } from "vue-router";
export default {
  setup() {
    const backgroundImageUrl = ref(null);
    const router = useRouter();
    onBeforeMount(async () => {
      console.log(auth)
      const loggedIn = await auth.isLoggedIn()
      if(loggedIn) {
        await checkUser()
      }
      console.log(user.value);
      // backgroundImageUrl.value  = `${user.value.userInfo.picture}`
      
      // console.log(backgroundImageUrl.value)
    });
    const handleClick = async () => {
      await checkUser()
      console.log(user.value);
      if(user.value){
        await auth.logout()
        user.value = null
        router.push({name: "Login"});
      }
    };

    return {
      user,
      handleClick,
      // backgroundImageUrl
    };
  },
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 10px;
}
nav {
  display: flex;
  justify-content: space-around;
}
/* .avi-image{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* background-image: url('https://lh3.googleusercontent.com/a-/AOh14Gghyp6RAkIU87WBSl0SHR7wWwjys2WkqeTgFrcr1Es=s96-c'); 
} */
.main-name{
  font-size: 1.7rem;
  font-weight: semi-bold;
  background: -webkit-linear-gradient(rgb(221, 27, 27), rgb(41, 27, 228));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 1px;
}

</style>
