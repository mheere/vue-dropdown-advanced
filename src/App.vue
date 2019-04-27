<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <h1>
      Vue Dropdown Advanced test page
    </h1>

    <div class='button example-dr'>
      Example Down Right
      <drop-down-menu v-bind:items="myitems">  </drop-down-menu>
    </div>
    <div class='button example-dl'>Example Down Left</div>
   
    <Banner position='bottom' hello='marcel'>This is a banner - testing by marcel...</Banner>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Banner from "./components/Banner.vue";
import DropDownMenu from "./components/DropDownMenu.vue";
import { DropDownItemBase, ActionItem, HeaderItem } from "./components/DropDownItems";

export default Vue.extend({
  name: "app",
  data: () => {
    const myitems : DropDownItemBase[] = [];
    return {
      myitems
    }
  },
  components: {
    Banner, DropDownMenu
  },
  created() {
    //debugger;
    let item: DropDownItemBase;
    item = new HeaderItem("This is my header"); 
    this.myitems.push(item);
    item = new ActionItem("itemA", "Item A"); 
    this.myitems.push(item);
    item = new ActionItem("itemB", "Item B"); 
    this.myitems.push(item);
    item = new ActionItem("itemC", "Buy some Apples"); 
    this.myitems.push(item);
    
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
