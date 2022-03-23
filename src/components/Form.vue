<template>
  Make your link page:
  <form>
    <p>Enter Your unique URL endpoint:</p>
    <div class="name">
      <p>firma.xyz/</p>
      <input required type="text" v-model="url" placeholder="yourname" />
    </div>
    <p>Enter a small description of yourself</p>
    <div class="about">
      <input
        required
        type="text"
        v-model="about"
        placeholder="anything about yourself"
      />
    </div>
    <p>Now start entering your links!</p>
 <Listbox v-model="selectedOption">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
        >
          <span class="block truncate">{{ selectedOption }}</span>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="linkOption in linkOptions"
              :key="linkOption.name"
              :value="linkOption.name"
              as="template"
            >
              <li
                :class="[
                  active ? 'text-amber-900 bg-amber-100' : 'text-gray-900',
                  'cursor-default select-none relative py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ linkOption.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="w-5 h-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <div>
      <!-- <span @click="handleClick">{{ selectedOption }}</span> -->
      <input
        v-if="selectedOption == 'Other Websites'"
        type="text"
        placeholder="Enter Description"
        v-model="website"
      />
      <div>
        <input
          v-if="selectedOption != 'Other Websites'"
          type="text"
          placeholder="Enter your username"
          v-model="username"
        />
        <input
          v-else
          type="text"
          placeholder="Enter Website Link"
          v-model="username"
        />
      </div>
      <span @click="handleLink(selectedOption)">Confirm</span>
      <!-- <div class="dropdown-list" v-if="showDropdown">
        <div v-for="linkOption in linkOptions" :key="linkOption.name">
          <button @click.prevent="handleSelection(linkOption.name)">
            {{ linkOption.name }}
          </button>
        </div>
      </div> -->
      <div v-for="enteredLink in enteredLinks" :key="enteredLink.name">
        <a :href="enteredLink.url" target="_blank">{{ enteredLink.url }}</a>
        <span @click="removeLink(enteredLink.url)">Remove</span>
      </div>
    </div>
    <div>
      <p>Choose a style</p>
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
    <button @click.prevent="handleSubmit">Submit</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { user } from "../composables/getUser";
import setup from "../composables/web3Init.js";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
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

    const handleSubmit = async () => {
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
        //Username availability check in mongoDB
        // const response = await fetch(`${backendUrl}checkuserName`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     username: username,
        //   }),
        // });
        // console.log("response");

        // const response2 = await contract.value.methods.registerUser(name).send({
        //   from: user.value.walletAddress,
        //   gas: 1000000,
        // });

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

        // const response4 = await contract.value.methods
        //   .registerIpfsHash(ipfsHash)
        //   .send({
        //     from: user.value.walletAddress,
        //     gas: 1000000,
        //   });
        console.log(data);
        url.value = "";
        about.value = "";
        enteredLinks.value = [];
      } catch (err) {
        console.log(err);
        error.value = err.message;
      }
    };

    return {
      name,
      url,
      about,
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
    };
  },
};
</script>

<style>
.theme-example {
  width: 140px;
  height: 220px;
  margin: 1em;
}
.theme-examples {
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
</style>
