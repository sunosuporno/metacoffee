<template>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="card">
     <div id="app" v-bind:class="currentTheme">
      <div class="header">
        <div class="profileContainer">
          <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
              alt="profile picture"
              class="profilePicture">
          <span class="userId">
              @testProfile
              <i class="fa fa-pencil logo" aria-hidden="true" v-on:click="changeEditingMode(true)"></i>
          </span>
        </div>
      </div>
    
      <div class="linkContainer">
          <span class="link"> Google.com </span>
          <span class="link"> Google.com </span>
          <span class="link"> Google.com </span>
        </div>

      <div class="footer">
        <span class="fa fa-twitter logo"></span>
        <span class="logoText">Built by builders guild!</span>
      </div>
      <div class="options" v-if="editingMode === true">
        <div id="theme-white"
        v-bind:class="{'active': currentTheme == 'theme-white'}"
        v-on:click="changeTheme('theme-white')"></div>
        <div id="theme-blue"
        v-bind:class="{'active': currentTheme == 'theme-blue'}"
        v-on:click="changeTheme('theme-blue')"></div>
        <div id="theme-red"
        v-bind:class="{'active': currentTheme == 'theme-red'}"
        v-on:click="changeTheme('theme-red')"></div>
        <div id="theme-black"
        v-bind:class="{'active': currentTheme == 'theme-black'}"
        v-on:click="changeTheme('theme-black')"></div>

        <button class="Save" v-on:click="changeEditingMode(false)"> Save Choice </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      currentTheme: localStorage.getItem('theme-color'),
      editingMode: localStorage.getItem('editing-mode')
    };
  },
  methods: {
    changeTheme(color){
      this.currentTheme = color;
      localStorage.setItem('theme-color', color);
    },
    changeEditingMode(mode){
      this.editingMode = mode;
      localStorage.setItem('editing-mode', mode);
    }
  },
}
</script>

<style>
  #app{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;    
  }
  @import "./assets/main.css";
</style>
