<template>
  <div class="full-form">
    <div class="created-link" v-if="exists">
      <a :href="`http://localhost:8081/` + usrnm" class="url-ready"
        >Your Link: firma.xyz/{{ usrnm }}</a
      >
      <button class="copy-btn" @click="copyLink(usrnm)">Copy Link</button>
    </div>
    <p v-if="!exists" class="link-header">Make your link page:</p>
    <p class="link-header-small" v-else>Edit your link page</p>
    <form class="full-form-2">
      <div v-if="!exists">
        <p class="url-1">Enter Your unique URL endpoint:</p>
        <div class="name">
          <p class="website-prompt">firma.xyz/</p>
          <input
            required
            type="text"
            v-model="url"
            placeholder="yourname"
            class="url-form"
          />
        </div>
      </div>
      <p class="about-1">Enter a small description of yourself:</p>
      <div class="about">
        <input
          required
          class="url-form"
          type="text"
          v-model="about"
          placeholder="anything about yourself"
        />
      </div>
      <p class="link-1">Now start entering your links!</p>
      <div class="link-input">
        <Listbox v-model="selectedOption">
          <div class="link-input-2">
            <ListboxButton class="selector">
              <p>{{ selectedOption }}</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="down-arrow"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </ListboxButton>
            <ListboxOptions class="link-options">
              <ListboxOption
                v-for="linkOption in linkOptions"
                :key="linkOption.name"
                :value="linkOption.name"
                class="link-option"
                v-slot="{ active, selected }"
              >
                <p
                  :class="{
                    'active-option': active,
                    'normal-option': !active,
                  }"
                >
                  <span>{{ linkOption.name }}</span>
                  <svg
                    v-show="selected"
                    xmlns="http://www.w3.org/2000/svg"
                    class="checkmark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </p>
              </ListboxOption>
            </ListboxOptions>
          </div>
        </Listbox>
        <div class="input-boxes">
          <!-- <span @click="handleClick">{{ selectedOption }}</span> -->
          <input
            v-if="selectedOption == 'Other Websites'"
            type="text"
            class="username-form"
            placeholder="Enter Description"
            v-model="website"
          />
          <div>
            <input
              v-if="selectedOption != 'Other Websites'"
              type="text"
              class="username-form"
              placeholder="Enter your username"
              v-model="username"
            />
            <input
              v-else
              type="url"
              class="username-form"
              placeholder="Enter Website Link"
              v-model="username"
            />
          </div>
        </div>
        <span class="username-confirm" @click="handleLink(selectedOption)"
          >Confirm</span
        >
        <!-- <div class="dropdown-list" v-if="showDropdown">
        <div v-for="linkOption in linkOptions" :key="linkOption.name">
          <button @click.prevent="handleSelection(linkOption.name)">
            {{ linkOption.name }}
          </button>
        </div>
      </div> -->
      </div>
      <div class="links-output">
        <div
          v-for="enteredLink in enteredLinks"
          :key="enteredLink.name"
          class="link-output"
        >
          <a :href="enteredLink.url" target="_blank">{{ enteredLink.url }}</a>
          <svg
            @click="removeLink(enteredLink.url)"
            xmlns="http://www.w3.org/2000/svg"
            class="remove-url"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div>
        <p class="style-1">Choose a style</p>
        <div class="theme-examples">
          <div v-for="themeOption in themeOptions" :key="themeOption.id">
            <div class="theme">
              <img
                :src="require(`../assets/${themeOption.image}.png`)"
                type="image/png"
                :alt="themeOption.name"
                class="theme-example"
                :id="themeOption.id"
                @click="handleTheme(themeOption.id, themeOption.style)"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        class="submit-form"
        @click.prevent="handleSubmit"
        v-if="!submitting"
      >
        Submit
      </button>
      <button class="submit-form" disabled v-if="submitting">Submitting</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { user } from "../composables/getUser";
import setup from "../composables/web3Init.js";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { onMounted } from "@vue/runtime-core";
export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,

  },
  setup() {
    const name = ref("");
    const url = ref("");
    const about = ref("");
    const links = ref([]);
    const showDropdown = ref(false);
    const enteredLinks = ref([]);
    const username = ref("");
    const website = ref("");
    const { web3, contract, contractAddress } = setup();
    const error = ref("");
    const selectedStyle = ref("");
    const submitting = ref(false);
    const exists = ref(false);
    const usrnm = ref("");
    const linkOptions = [
      {
        name: "Twitter",
        url: "https://twitter.com/",
      },
      {
        name: "Github",
        url: "https://github.com/",
      },
      {
        name: "Instagram",
        url: "https://instagram.com/",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
      {
        name: "Other Websites",
        url: "",
      },
    ];
    const themeOptions = [
      {
        id: 1,
        name: "Very Coal",
        image: "design1",
        style: {
          body: "body body-a",
          link: "link link-a",
          primaryDetails: "primary-details",
        },
      },
      {
        id: 2,
        name: "Emerald Hue",
        image: "design2",
        style: {
          body: "body body-b",
          link: "link link-b",
          primaryDetails: "primary-details primary-details-b",
        },
      },
      {
        id: 3,
        name: "Bliss",
        image: "design3",
        style: {
          body: "body body-c",
          link: "link link-c",
          primaryDetails: "primary-details primary-details-c",
        },
      },
    ];

    const selectedOption = ref(linkOptions[0].name);
    const selectedPlaceholder = `Enter your ${selectedOption.value} username`;

    onMounted(async () => {
      const backendUrl = "http://localhost:8080/";
      const response = await fetch(backendUrl + "userExists", {
        method: "GET",
        query: {
          user: user.value.userInfo.email,
        },
      });
      const data = await response.json();
      console.log(data);
      exists.value = data.result;
      console.log(exists.value);
      if (data.result) {
        usrnm.value = localStorage.getItem("username");
      }
    });

    const handleClick = () => {
      showDropdown.value = !showDropdown.value;
    };

    const handleSelection = (name) => {
      const num = linkOptions.find((link) => link.name === name);
      console.log(num);
      selectedOption.value = num.name;
      showDropdown.value = false;
    };

    const handleLink = (name) => {
      if (username.value === "") {
        window.alert("Please enter a username or a website!");
      } else {
        const num = linkOptions.find((link) => link.name === name);
        console.log(num);
        if (num.name == "Other Websites") {
          enteredLinks.value.push({
            name: website.value,
            url: username.value.trim().replace(" ", ""),
          });
        } else {
          enteredLinks.value.push({
            name: num.name.trim(),
            url: `${num.url}${username.value.trim().replace(" ", "")}`,
          });
        }
        username.value = "";
        website.value = "";
        console.log(enteredLinks.value);
      }
    };

    const removeLink = (url) => {
      enteredLinks.value = enteredLinks.value.filter(
        (link) => link.url !== url
      );
    };

    const handleTheme = (id, style) => {
      document.getElementById(id).classList.add("selected");
      themeOptions
        .filter((theme) => theme.id !== id)
        .forEach((theme) => {
          document.getElementById(theme.id).classList.remove("selected");
        });
      selectedStyle.value = style;
    };

    const copyLink = (username) => {
      navigator.clipboard.writeText(`http://localhost:8080/${username}`);
        createToast("Link Copied!", {
          showCloseButton: true,
          hideProgressBar: false,
          timeout: 2000,
          type: "success",
          showIcon: true,
        });
    }

    const handleSubmit = async () => {
      submitting.value = true;
      error.value = "";
      const backendUrl = "http://localhost:8080/";
      const name = url.value.trim().replace(" ", "");
      console.log(username);
      const email = user.value.userInfo.email;
      localStorage.setItem("username", url.value.trim().replace(" ", ""));
      let ipfsHash;
      const data = {
        name: user.value.userInfo.name,
        picture: user.value.userInfo.picture,
        username: name,
        about: about.value.trim(),
        links: enteredLinks.value,
        style: selectedStyle.value,
      };
      try {
        //Data uploaded to IPFS as well as username added to mongoDB
        const response3 = await fetch(`${backendUrl}createProfile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: data,
            username: name,
            email: email,
          }),
        });
        console.log("response3");
        //taking out the IPFS hash from the response
        const jsonRes = await response3.json();
        ipfsHash = jsonRes.ipfsHash;
        console.log(ipfsHash);

        //uploading the IPFS hash to the smart contract
        const nonce2 = await web3.value.eth.getTransactionCount(
          user.value.walletAddress,
          "latest"
        );
        const tx2 = {
          from: user.value.walletAddress,
          to: contractAddress,
          gas: 2000000,
          nonce: nonce2,
          // 'maxPriorityFeePerGas': 1999999987,
          data: contract.value.methods.registerUser(name, ipfsHash).encodeABI(),
        };
        const sign2 = await web3.value.eth.accounts.signTransaction(
          tx2,
          user.value.privateKey
        );
        const result2 = await web3.value.eth.sendSignedTransaction(
          sign2.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              );
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              );
            }
          }
        );
        console.log("result2");
        console.log(data);
        url.value = "";
        about.value = "";
        enteredLinks.value = [];
        submitting.value = false;
      } catch (err) {
        console.log(err);
        error.value = err.message;
        submitting.value = false;
      }
    };

    return {
      name,
      url,
      exists,
      about,
      usrnm,
      links,
      linkOptions,
      showDropdown,
      handleClick,
      handleSelection,
      handleTheme,
      selectedOption,
      selectedPlaceholder,
      handleLink,
      username,
      enteredLinks,
      website,
      removeLink,
      handleSubmit,
      themeOptions,
      submitting,
      copyLink
    };
  },
};
</script>

<style>
.link-header {
  font-size: 2rem;
}
.link-header-small{
  font-size:1.5rem
}
.url-1 {
  font-size: 1.3rem;
}
.name {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}
.url-form {
  width: 60%;
  font-size: 1.2rem;
  padding: 0.5em;
  background-color: rgb(29, 27, 27);
  color: bisque;
  /* box-shadow: inset -2px -3px 4px 0px rgb(255 255 255 / 15%), inset 2px 3px 3px 3px rgb(0 0 0 / 25%);; */
  border: none;
  border-bottom: 2px solid azure;
  /* border-radius: 30px; */
}
.url-form:focus {
  outline: none;
}
.username-form {
  margin-left: 1.2em;
  width: 90%;
  font-size: 1.2rem;
  padding: 0.5em;
  background-color: rgb(29, 27, 27);
  color: rgb(252, 252, 252);
  border: none;
  border-bottom: 2px solid azure;
}
.username-form:focus {
  outline: none;
}
.theme-example {
  width: 250px;
  height: auto;
  margin: 1em;
  border-radius: 34px;
}
.theme-examples {
  width: 80%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
}
.theme {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.selected {
  border: 2px solid rgb(255, 255, 255);
}
.about-1 {
  font-size: 1.3rem;
}
.link-1 {
  font-size: 1.3rem;
}
.link-input {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.link-input-2 {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 30%;
}
.selector {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: rgb(255, 255, 255);
  border: none;
  padding: 0.5em 1em;
  min-width: 40%;
  text-align: left;
  font-size: 1rem;
  border-radius: 5px;
}
.down-arrow {
  height: 20px;
  width: 20px;
}
.link-options {
  position: absolute;
  overflow: scroll;
  width: 26.1%;
  margin-top: 5px;
  list-style: none;
  background-color: aliceblue;
  color: black;
  border-radius: 5px;
  margin-top: 2.5em;
}
.active-option {
  background-color: rgb(62, 48, 252);
  color: rgb(255, 255, 255);
}
.active-option,
.normal-option {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  padding: 0.5em 1em;
}
.checkmark {
  height: 20px;
  width: 20px;
}
.username-confirm {
  font-size: 1.3rem;
  margin-left: 1em;
  padding: 0.4rem 1.1rem;
  background-color: rgb(62, 48, 252);
  color: white;
  border-radius: 1em;
}
.username-confirm:hover {
  cursor: pointer;
  background-color: rgb(4, 0, 241);
  padding: 0.4rem 1.2rem;
  transition-duration: 800ms;
}
.link-output {
  width: fit-content;
  margin-top: 0.6em;
  margin-left: 0.2em;
  text-decoration: none;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(116, 112, 168);
  padding: 0.2rem 0.8rem;
  border-radius: 1em;
}
.link-output a {
  text-decoration: none;
  margin-left: 4px;
  color: white;
}
.input-boxes {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.remove-url {
  margin-left: 1em;
  height: 15px;
  width: 15px;
}
.links-output {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}
.style-1 {
  margin-top: 1em;
  font-size: 1.3rem;
}
.submit-form {
  font-size: 1.5rem;
  padding: 0.7em 2.5em;
  background-color: rgb(26, 13, 207);
  color: white;
  border: none;
  border-radius: 1em;
  text-align: center;
  margin-bottom: 2em;
  margin-left: 40%;
}
.url-ready {
  text-decoration: none;
  color: white;
}
.created-link{
  font-size: 1.7rem;
  width: 45%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: row;
}
.copy-btn{
  margin-left: 20px;
  padding: 0.5rem 1.1rem;
  background-color: rgb(62, 48, 252);
  color: white;
  border: none;
  border-radius: 12px;
}
.copy-btn:hover{
  cursor: pointer;
  background-color: rgb(4, 0, 241);
  padding: 0.5rem 1.2rem;
  transition-duration: 800ms;
}
</style>
