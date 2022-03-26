<template>
  <div class="container">
    <Form />
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { Wallet } from "ethers";
import { user, publicKey, checkUser } from "../composables/getUser";
import padPublicKey from "../composables/padPublicKey";
import Form from "../components/Form.vue";
import setup from "../composables/web3Init.js";
import { onMounted } from "@vue/runtime-core";
export default {
  components: {
    Form,
  },
  setup() {
    const { web3, contract } = setup();
    console.log(contract.value);
    // onMounted(async () => {
    //   const url = "https://metacoffee-backend.vercel.app/";
    //   const response = await fetch(url + "get", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       ipfsHash: "QmWfzYzfz7qZQ6xj9Zq8Z5qxQZQq9zXKXQ5xQYzX7ZQXQ",
    //     }),
    //   });
    // });
    const makeWallet = async () => {
      console.log(publicKey.value);
      console.log(user.value.privateKey);
      const actualPublicKey = padPublicKey(publicKey.value);
      const wallet = new Wallet(user.value.privateKey);

      user.value = {
        ...user.value,
        walletAddress: wallet.address,
        privateKey: user.value.privateKey,
        publicKey: actualPublicKey,
      };
    };

    const showUser = () => {
      console.log(user.value);
    };

    return {
      makeWallet,
      showUser,
    };
  },
};
</script>

<style></style>
