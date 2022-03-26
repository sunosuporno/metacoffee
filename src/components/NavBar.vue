<template>
  <header>
    <router-link :to="{ name: 'Home' }" class="main-name">Firma</router-link>
    <nav class="nav">
      <div v-if="user">
        <!-- <div class="avi-image" :style="{backgroundImage: url(backgroundImageUrl)}"></div> -->
        <p class = "user-name" @click="handleShowLO">Hello {{ user.userInfo.name }}</p>
        <div v-if="showLogout" class="logout-panel">
          <button class="logout-btn" @click="handleLogout">Log out</button>
          <div class="cross-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="cross"
              @click="handleShowLO"
              fill="none"
              id="crossmark"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
      <div v-else>
        <router-link :to="{ name: 'Login' }" class="login-route"
          >Get Started</router-link
        >
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
    const showLogout = ref(false);
    onBeforeMount(async () => {
      console.log(auth);
      const loggedIn = await auth.isLoggedIn();
      if (loggedIn) {
        await checkUser();
      }
      console.log(user.value);
      // backgroundImageUrl.value  = `${user.value.userInfo.picture}`

      // console.log(backgroundImageUrl.value)
    });
    const handleLogout = async () => {
      await checkUser();
      console.log(user.value);
      if (user.value) {
        console.log("logging out");
        await auth.logout();
        user.value = null;
        router.push({ name: "Login" });
      }
    };

    const handleShowLO = () => {
      showLogout.value = !showLogout.value;
    };

    return {
      user,
      handleLogout,
      showLogout,
      handleShowLO,
      // backgroundImageUrl
    };
  },
};
</script>

<style>
header {
  width: 87%;
  margin: 0 auto;
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
.main-name {
  font-size: 1.7rem;
  font-weight: semi-bold;
  background: -webkit-linear-gradient(rgb(27, 219, 203), rgb(89, 230, 60));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 1px;
}
.login-route {
  font-size: 1.2rem;
  text-decoration: none;
  color: azure;
  background-color: blue;
  padding: 0.6rem 1.1rem;
  border-radius: 1rem;
}
.logout-panel {
  position: absolute;
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-radius: 21px;
  margin-top: 0.3em;
}
.logout-btn {
  font-size: 1.1rem;
  padding: 1em 0;
  border: none;
  width: 100%;
}
.logout-btn:hover {
  cursor: pointer;
  background-color: rgb(216, 213, 213);
}
.cross {
  width: 20px;
  height: 20px;
  stroke: black;
}
.cross-container{
  width: 100%;
  display: flex;
  justify-content: center;
}
.cross-container:hover {
  cursor: pointer;
  border-radius: 0px 0px 21px 21px;
  background-color: rgb(216, 213, 213);
}
.user-name:hover{
  cursor: pointer;
}
</style>
