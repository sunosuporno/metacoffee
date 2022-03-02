<template>
  <div>
    <p>Wait!</p>
  </div>
  <div>
    <button @click="handleAuth">Sign In</button>
    <button @click="handleInfo">Get Info</button>
  </div>
</template>

<script>
import { AuthProvider, SocialLoginType } from "@arcana/auth";
import {user, checkUser} from "../composables/getUser"
import {auth} from "../composables/arcanaInit"
import { onMounted, ref } from "@vue/runtime-core";
export default {
  setup() {


    const handleAuth = async () => {
      if (auth.isLoggedIn()) {
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
      handleAuth,
      handleInfo,
    };
  },
};
</script>

<style></style>
