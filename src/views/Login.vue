<template>
  <div class="container">
    <div>
      <button @click="handleAuth" class="login-btn">
        <img src="../assets/google.svg" alt="log in with google" type="image/svg">
        <p>Sign In With Google</p></button>
      <button v-if="user" @click="handleInfo">Log out</button>
    </div>

    <div v-if="auth">
      <p v-if="user">Hello {{ user.userInfo.name }}</p>
    </div>
  </div>
</template>

<script>
import { SocialLoginType } from "@arcana/auth";
import { user, checkUser } from "../composables/getUser";
import { auth } from "../composables/arcanaInit";
import { onMounted, ref, watchEffect } from "@vue/runtime-core";
import { useRouter } from "vue-router";
export default {
  setup() {
    const showName = ref(false);
    const router = useRouter();
    const handleAuth = async () => {
      if (await auth.isLoggedIn()) {
        console.log("Already logged in");
      } else {
        const res = await auth.loginWithSocial(SocialLoginType.google);
        console.log(res);
      }
    };
    const handleInfo = async () => {
      await checkUser();
      if (user.value) {
        await auth.logout();
        user.value = null;
      }
    };
    watchEffect(() => {
      if (user.value) {
        router.push({ name: "Dashboard" });
      }
    });
    return {
      auth,
      user,
      showName,
      handleAuth,
      handleInfo,
    };
  },
};
</script>

<style scoped>
.container{
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.login-btn{
  min-width: fit-content;
  font-size: 1.3rem;
  padding: 0.5em 1em;
  border-radius: 10px;
  display: flex;
  align-items: center;
}
.login-btn:hover, .login-btn:focus{
  border: 5px solid #1876D1;
  outline: none;
  cursor: pointer;
  transition-duration: 700ms;
}
.login-btn p{
  margin-left: 10px;
}
</style>
