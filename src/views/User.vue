<template>
  <div id ='body' :class="currentBG">
    <div v-if="isFetching">
        <p>Fetching</p>
      </div>
    <div v-else-if="anyError">
      <p v-if="noUserFound">No User Found</p>
      <div class="error" v-if="error">
        {{ error }}
      </div>
    </div>
    <div v-else class="main">
      <div :class ='currentPD'>
        <img :src="profile.picture" alt="" referrerpolicy="no-referrer" class="picture" />
        <p class="name">{{ profile.name }}</p>
        <p class="about">{{ profile.about }}</p>
      </div>
      <div>
        <div v-for="link in profile.links" :key="link.name" class="links">
          <a :href="link.url" target="_blank" :class ='currentLink'>{{ link.name }}</a>
        </div>
      </div>
      <div class="lf">
        <a href="#" class="link-footer">Build Your Own Link Page</a>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, ref, watch, watchEffect } from "@vue/runtime-core";

import setup from "../composables/web3Init.js";
export default {
  props: ["username"],
  setup(props) {
    const { web3, contract } = setup();
    const isFetching = ref(false);
    const error = ref("");
    const noUserFound = ref(false);
    const profile = ref({});
    const anyError = ref(false);
    const currentBG = ref("");
    const currentPD = ref("");
    const currentLink = ref("");


    onMounted(async () => {
      isFetching.value = true;
      anyError.value = false;
      error.value = "";
      noUserFound.value = false;
      const url = "http://localhost:8080/";
      try {
        const ipfsHash = await contract.value.methods
          .getIpfsHash(props.username)
          .call();
        if (ipfsHash != "") {
          const response = await fetch(url + "get", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ipfsHash: ipfsHash,
            }),
          });
          const data = await response.json();
          profile.value = data.data;
          console.log(profile.value);
          console.log(profile.value.style.body);
        } else {
          noUserFound.value = true;
          anyError.value = true;
        }
        isFetching.value = false;
      } catch (err) {
        console.log(err);
        error.value = err.message;
        anyError.value = true;
      }
    });
    watch(profile, () => {
      if(profile.value !== "" && profile.value !== undefined) {
        currentBG.value = profile.value.style.body;
        currentPD.value = profile.value.style.primaryDetails;
        currentLink.value = profile.value.style.link;
    //     const details = document.getElementsByClassName("primsary-detailss")
    //     details.classList.add = profile.value.style.primaryDetails;
    //     const link = document.getElementsByClassName("linkss")
    //     link.classList.add = profile.value.style.link;
      }
    });
    return {
      isFetching,
      error,
      noUserFound,
      profile,
      anyError,
      currentBG,
      currentPD,
      currentLink
    };
  },
};
</script>

<style scoped>

</style>
