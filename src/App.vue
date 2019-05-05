<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <h1>
      Vue Dropdown Advanced test page
    </h1>

    <hr />

    <div class="row">

      <div class='button example-dr'>
        Example Down Right
        <drop-down-menu v-bind:itemsAsync="getAsyncItems" :onClick="this.onClick">  </drop-down-menu>
      </div>

      <div class='button example-dl' style='display: absolute'>
        Example Down Left
        <drop-down-menu v-bind:items="myitems_dl" :onClick="this.onClick" direction="down-left">  </drop-down-menu>
      </div>

    </div>

    <div class="row">

      <div class='button example-ur'>
        Example Up Right
        <drop-down-menu v-bind:items="myitems_ur" :onClick="this.onClick" direction="up-right">  </drop-down-menu>
      </div>

      <div class='button example-ul'>
        Example Up Left
        <drop-down-menu v-bind:items="myitems_ul" :onClick="this.onClick" direction="up-left">  </drop-down-menu>
      </div>

    </div>
   
    <!-- <Banner position='bottom' hello='marcel'>This is a banner - testing by marcel...</Banner> -->

    <div class='notification' v-bind:class="{ show: msg.length > 0 }">
      {{ msg }}
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Banner from "./components/Banner.vue";
import DropDownMenu, { DropDownInfo } from "./components/DropDownMenu.vue";
import { DropDownItemBase, ActionItem, HeaderItem, DropDownDirection } from "./components/DropDownItems";
import { getTestItems } from './data';
import { delay } from './utils';

export default Vue.extend({
  name: "app",
  data: () => {
    const myitems_dr : DropDownItemBase[] = [];
    const myitems_dl : DropDownItemBase[] = [];
    const myitems_ur : DropDownItemBase[] = [];
    const myitems_ul : DropDownItemBase[] = [];
    const msg: string = "";
    return {
      myitems_dr,
      myitems_dl,
      myitems_ur,
      myitems_ul,
      msg
    }
  },
  methods: {
      onClick(info: DropDownInfo) {
        let msg = `Item '${info.item.text}' was clicked. [key: ${info.item.key}] - `;
        msg += `ItemsCount: ${info.items.length}`;
        if (info.imageOnRight)
          msg += ` - RightImage was clicked: ${info.imageOnRight.imageRight}`;
        console.log(msg);
        this.showNotification(msg);
      },
      async getAsyncItems() {
        await delay(1000);
        return this.myitems_dr;
      },
      async showNotification(msg) {
        this.msg = msg;
        await delay(3000);
        if (this.msg == msg)
          this.msg = "";
      }
  },
  components: {
    Banner, DropDownMenu
  },
  created() {
    this.myitems_dr = getTestItems("logout");
    this.myitems_dl = getTestItems("logout-simple");
    this.myitems_ur = getTestItems("options-simple");
    this.myitems_ul = getTestItems("options");
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

.row {
  padding-top: 30px;
}

.button {
  display: inline-block;
  border: 1px solid darkblue;
  background: lightgray;
  margin: 25px;
  padding: 5px;
  width: 115px;
  font-size: 12px;
  
  &:hover{
    background:rgb(152, 152, 168);
    cursor: pointer;
  }
}

.notification {
    position: fixed;
    right: 20px;
    bottom: 20px;
    border: 2px solid green;
    padding: 10px;
    background: #e1f3e1;
    border-radius: 8px;
    opacity: 0;
    -webkit-transition: opacity 0.2s; /* Safari */
    transition: opacity 0.2s;

    &.show {
      opacity: 1;
    }
}
</style>
