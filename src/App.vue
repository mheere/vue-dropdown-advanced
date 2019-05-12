<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <h3>
      Vue Dropdown Advanced test page
    </h3>

    <!-- <hr /> -->

    <div class="row space-top">

      <div class='button example-dr'>
        Example Down Right
        <drop-down-menu :items="fixedItems" @click="this.onClick">  </drop-down-menu>
      </div>

      <div class='button example-dr'>
        Example Down Right
        <drop-down-menu v-bind:items="myitems_dr" v-bind:click="this.onClick">  </drop-down-menu>
      </div>

      <div class='button example-dr'>
        Example Down Right
        <drop-down-menu v-bind:itemsAsync="getAsyncItems" :click="this.onClick">  </drop-down-menu>
      </div>

      <div class='button example-dl' style='display: absolute'>
        Example Down Left
        <drop-down-menu v-bind:items="myitems_dl" :click="this.onClick" direction="down-left">  </drop-down-menu>
      </div>

      <div class='button example-ur'>
        Example Up Right
        <drop-down-menu v-bind:items="myitems_ur" :click="this.onClick" direction="up-right">  </drop-down-menu>
      </div>

      <div class='button example-ul'>
        Example Up Left
        <drop-down-menu v-bind:items="myitems_ul" :click="this.onClick" direction="up-left">  </drop-down-menu>
      </div>

       <div class='button '>
        Showcase
        <drop-down-menu v-bind:items="myitems_showcase" :click="this.onClick" direction="down-right">  </drop-down-menu>
      </div>

    </div>

    <div class="row">

      <div style="width: 400px; border: 1px solid">
        <div style="display: flex">
          <span>span1</span>
          <div class='example-ur' style="flex: 1; border: 1px solid red">
            Example Up Right **
            <drop-down-menu v-bind:items="myitems_ur" :click="this.onClick" @click="this.onClick" direction="up-left">  </drop-down-menu>
          </div>
          <span>span2</span>
        </div>
      </div>

      <div class='button example-ul'>
        Example Up Left
        <drop-down-menu v-bind:items="myitems_ul" :click="this.onClick" @click="this.onClick" direction="up-left">  </drop-down-menu>
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
    const myitems_dr2 : DropDownItemBase[] = [];
    const myitems_dl : DropDownItemBase[] = [];
    const myitems_ur : DropDownItemBase[] = [];
    const myitems_ul : DropDownItemBase[] = [];
    const myitems_showcase : DropDownItemBase[] = [];
    const fixedItems: DropDownItemBase[] = [];
    const msg: string = "";
    return {
      myitems_dr,
      myitems_dr2,
      myitems_dl,
      myitems_ur,
      myitems_ul,
      myitems_showcase,
      fixedItems,
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
        await delay(1000);      // call an api for data (async)
        // .. convert the data to DropDownItems ...
        return this.myitems_dr; // return these items
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
    this.myitems_dr = getTestItems("simple");
    this.myitems_dr2 = getTestItems("logout");
    this.myitems_dl = getTestItems("logout-simple");
    this.myitems_ur = getTestItems("options-simple");
    this.myitems_ul = getTestItems("options");
    this.myitems_showcase = getTestItems("showcase");

    this.fixedItems.push(new ActionItem("A", "Holiday in France", "", false, _ => alert(_.key)));
    this.fixedItems.push(new ActionItem("B", "Go to California"));
    this.fixedItems.push(new ActionItem("C", "Visit London"));

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

  &.space-top {
    padding-top: 210px;
  }
}

.button {
  display: inline-block;
  border: 1px solid darkblue;
  background: lightgray;
  margin: 75px;
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
