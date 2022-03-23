<template>
  <div class="container">
    <div>
      <p>Wait!</p>
    </div>
    <div>
      <button @click="handleAuth">Sign In</button>
      <button @click="handleInfo">Log out</button>
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

<style></style>
