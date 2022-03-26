<template>
  <div class="container">
    <div class="home">
      <p class="firma-pitch">
        You need only one link to summarize your whole digital presence. Get
        yours now.<br />
      </p>
      <div class="main-body">
        <div class="left-side">
          <p class="desc">
            Customise your link page, accept donations in crypto, embed videos,
            show your NFTs, and do much more with the most powerful link
            manager.
          </p>
          <div class="example">
            <div class="link-bar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="encrypted"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="dummy-link">
                firma.xyz/<span class="dummy-name">yourname</span>
              </p>
            </div>
            <div class="cta">
              <router-link :to="{ name: 'Login' }" class="router-link-text">Get yours now for free!</router-link>
            </div>
            <p class="assurance">✅ No spam. 🏎 Build your link in seconds.</p>
          </div>
        </div>
        <div class="right-side"></div>
      </div>
      <div class="features">
        <p class="feature-heading">
          The Most Complete Link Manager That Does So Much More!
        </p>
        <div class="feature-list" v-for="feature in features" :key="feature.id">
          <NeuBlock
            :title="feature.title"
            :desc="feature.desc"
            :isPremium="feature.isPremium"
            :image="feature.image"
          />
        </div>
      </div>
      <div class="last-cta">
        <p class="feature-heading">So what are you waiting for?</p>
        <div class="last-cta-button">
          <router-link :to="{ name: 'Login' }" class="router-link-text">Get Started!</router-link>
        </div>
      </div>
      <div class="footer">
        <p class="footer-name">FIRMA</p>
        <div class="our-links">
          <img src="@/assets/twitter.svg" alt="twitter" class="our-socials" />
          <img src="@/assets/linkedin.svg" alt="linkedin" class="our-socials" />
        </div>
        <div class="sitemap">
          <p><span>SiteMap</span></p>
          <p>About</p>
          <p>Pricing</p>
          <p>Contact</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NeuBlock from "@/components/NeuBlock.vue";

export default {
  components: {
    NeuBlock,
  },
  setup() {
    const features = [
      {
        id: 1,
        title: "Customise Your Link Page",
        desc: "Customise your link page as you want, with as many links you need.",
        image: require("@/assets/socialGrowth.svg"),
      },
      {
        id: 2,
        title: "Accept Payemnts",
        desc: "Accept payments or donations in crypto directly in your wallet. No commission or platform fees.",
        image: require("@/assets/donations.svg"),
      },
      {
        id: 3,
        title: "Embed Videos",
        desc: "Embed videos and photos in your link page. Show your best work!",
        image: require("@/assets/video.svg"),
      },
      {
        id: 4,
        title: "Show your NFTs",
        desc: "Show your NFTs in your link page. And even sell them!",
        image: require("@/assets/nfts.svg"),
        isPremium: true,
      },
      {
        id: 5,
        title: "Give access to Premium Content",
        desc: "Give gated access to paid content to your people with a single link.",
        image: require("@/assets/premium.svg"),
        isPremium: true,
      },
      {
        id: 6,
        title: "Advanced Analytics",
        desc: "Track your link traffic and see how you are being found on the web!",
        image: require("@/assets/analytics.svg"),
        isPremium: true,
      },
    ];
    return {
      features,
    };
  },
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.firma-pitch {
  /* font-size: 4rem; */
  font-size: 2.5rem;
  font-weight: 500;
  color: rgb(201, 196, 196);
  margin-top: 10%;
  letter-spacing: -3px;
  line-height: 1em;
}
.link-bar {
  display: flex;
  padding: 0 10px;
  /* width: 35%; */
  /* height: 3em; */
  width: 80vw;
  height: 2em;
  /* justify-content: space-around; */
  align-items: center;
  justify-content: flex-start;
  margin-top: 10%;
  box-shadow: 1px 2px 3px 0px rgb(255 255 255 / 5%),
    inset 3px 4px 5px 3px rgb(0 0 0 / 15%);
  border-radius: 20px;
}
.dummy-link {
  /* font-size: 2rem; */
  font-size: 1.5rem;
  font-weight: 500;
  color: rgb(237, 240, 206);
  letter-spacing: -1px;
  line-height: 1em;
  /* margin-right: 55px; */
  margin-left: 15px;
}
.dummy-name {
  background: -webkit-linear-gradient(rgb(221, 27, 27), rgb(41, 27, 228));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* text-transform: uppercase; */
  /* font-size: 1.7rem; */
  font-size: 1.5rem;
  letter-spacing: normal;
}
.desc {
  /* font-size: 2rem; */
  font-size: 1.2rem;
  color: rgb(201, 196, 196);
  margin-top: 1em;
  letter-spacing: -1px;
  line-height: 30px;
}
.encrypted {
  width: 15px;
  height: 15px;
}
.cta {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  width: 60vw;
  color: azure;
  border-radius: 15px;
  height: 2em;
  background-color: rgb(74, 74, 211);
  box-shadow: -1px -4px 3px 0px rgb(255 255 255 / 5%),
    5px 5px 5px 3px rgb(0 0 0 / 15%);
}
.example {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.assurance {
  margin-top: 8px;
  font-size: 0.8rem;
}
.feature-heading {
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 10%;
  letter-spacing: -1px;
  color: azure;
  text-align: center;
}
.feature-list {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-top: 10%;
}
.last-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
}
.footer {
  width: 100vw;
  padding: 0 15px;
  background-color: rgb(80, 80, 79);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
}
.our-socials {
  width: 30px;
  height: 30px;
  margin: 5px;
}
.our-links {
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-name {
  font-size: 1.5rem;
  font-weight: 500;
  color: rgb(0, 0, 0);
  letter-spacing: -1px;
  line-height: 30px;
}
.footer span {
  font-size: 1.2rem;
  font-weight: 500;
  color: rgb(0, 0, 0);
  letter-spacing: -1px;
  line-height: 30px;
}
.sitemap {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
}
.right-side {
  display: none;
}
.last-cta-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  width: 60vw;
  color: azure;
  border-radius: 15px;
  height: 2em;
  background-color: rgb(74, 74, 211);
  box-shadow: -1px -4px 3px 0px rgb(255 255 255 / 5%),
    5px 5px 5px 3px rgb(0 0 0 / 15%);
}
.router-link-text{
  color: azure;
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: -1px;
  line-height: 30px;
  text-decoration: none;
}
@media only screen and (min-width: 700px) {
  .firma-pitch {
    margin-top: 0.4em;
    font-size: 3rem;
  }
  .main-body {
    width: 100%;
    margin-top: 5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
  }
  .left-side {
    width: 40%;
    display: flex;
    flex-direction: column;
  }
  .right-side {
    display: inline-block;
    width: 40%;
    height: 500px;
    border-radius: 25px;
    background-color: azure;
  }
  .example {
    margin-top: 10%;
  }
  .desc {
    font-size: 1.9rem;
    width: 50vw;
  }
  .link-bar {
    width: 47vw;
    margin-left: 5em;
  }
  .cta {
    width: 37vw;
    margin-left: 5em;
  }
  .assurance {
    font-size: 0.5rem;
    margin-left: 5em;
  }
  .features {
    display: flex;
    flex-flow: row wrap;
    align-items: stretch;
    justify-content: space-between;
  }
  .feature-heading {
    font-size: 2.2rem;
  }
  .last-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .last-cta-button {
    width: 70%;
    font-size: 1.6rem;
    border-radius: 30px;
  }
}
@media only screen and (min-width: 930px) {
  .firma-pitch {
    margin-top: 5%;
    font-size: 3.5rem;
  }
}
</style>
