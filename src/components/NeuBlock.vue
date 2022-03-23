<template>
  <div class="feature">
    <div class="isPremium" v-if="props.isPremium">Premium</div>
    <div class="block">
      <p class="title">{{ props.title }}</p>
      <img :src="image" class="feature-images" alt="" />
      <p class="desc">{{ props.desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "desc", "isPremium", "image"],
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90vw;
  height: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: -1px -4px 3px 0px rgb(255 255 255 / 5%),
    5px 5px 5px 3px rgb(0 0 0 / 15%);
}
.title {
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  color: rgb(237, 240, 206);
  letter-spacing: -1px;
  line-height: 1em;
}
.desc {
  font-size: 0.9rem;
  text-align: center;
  line-height: 1rem;
}
.isPremium {
  font-size: 0.8rem;
  text-align: center;
  color: rgb(255, 255, 255);
  background: -webkit-linear-gradient(rgb(221, 27, 27), rgb(41, 27, 228));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 1px;
}
.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.feature-images {
  width: 50%;
  height: auto;
  padding: 1em 0;
}
@media only screen and (min-width: 700px){
  .feature {
    align-items: center;
    justify-content: center;
  }
  .block {
    width: 20em;
    height: 500px;
  }
  .title{
    font-size: 1.5rem;
    margin: 0px;
  }
.feature-images {
    width: 90%;
    height: 300px;
  }
  .desc {
    font-size: 1.2rem;
    margin-top: 1em;
    letter-spacing: -1px;
    line-height: 30px;
    width: 90%;
  }
}
@media only screen and (min-width: 930px) {
  .block{
    width: 22.6em;
    height: 500px;
  }
}
</style>
