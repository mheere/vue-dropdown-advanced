<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <h1>
      Vue Dropdown Advanced test page
    </h1>

    <div class='button example-dr'>
      Example Down Right
      <drop-down-menu v-bind:items="myitems_dr">  </drop-down-menu>
    </div>
    <div class='button example-dl'>
      Example Down Left
       <drop-down-menu v-bind:items="myitems_dl" direction="down-right">  </drop-down-menu>
    </div>
   
    <Banner position='bottom' hello='marcel'>This is a banner - testing by marcel...</Banner>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Banner from "./components/Banner.vue";
import DropDownMenu from "./components/DropDownMenu.vue";
import { DropDownItemBase, ActionItem, HeaderItem } from "./components/DropDownItems";
import { getTestItems } from './data';

export default Vue.extend({
  name: "app",
  data: () => {
    const myitems_dr : DropDownItemBase[] = [];
    const myitems_dl : DropDownItemBase[] = [];
    return {
      myitems_dr,
      myitems_dl
    }
  },
  components: {
    Banner, DropDownMenu
  },
  created() {
    this.myitems_dr = getTestItems("logout");
    this.myitems_dl = getTestItems("logout-simple");
  }
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.button {
  display: inline-block;
  border: 1px solid darkblue;
  background: lightgray;
  margin: 5px;
  padding: 5px;
  
  &:hover{
    background:rgb(152, 152, 168);
    cursor: pointer;
  }
}
</style>
