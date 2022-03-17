<template>
  <div>
    <p>Wait!</p>
  </div>
  <div>
    <button @click="handleAuth">Sign In</button>
    <button @click="handleInfo">Get Info</button>
  </div>

  <div v-if="auth">
    <p v-if="user">
      Hello {{user.userInfo.name}}
    </p>
  </div>
</template>

<script>
import { SocialLoginType } from "@arcana/auth";
import {user, checkUser} from "../composables/getUser"
import {auth} from "../composables/arcanaInit"
import { onMounted, ref, watchEffect } from "@vue/runtime-core";
export default {
  setup() {
    const showName = ref(false);

    const handleAuth = async () => {
      if (await auth.isLoggedIn()) {
        console.log("Already logged in");
      } else {
        const res = await auth.loginWithSocial(SocialLoginType.google);
        console.log(res);
      }
    };

    const handleInfo = async () => {
      await checkUser()
      console.log(user.value)
    };

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
