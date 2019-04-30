<template>
  <div class="dda-container" v-bind:style="getStyle" ref="mydd">
    <!-- <dropdown-toolbar v-bind:items="items"> </dropdown-toolbar> -->
      <div class="dda-dropdown-list">
        <div v-for="(item) in my_items" v-bind:key="item.key" >

          <div v-if="item.isSeperatorItem" class="seperator">
          </div>

          <div v-else-if="item.isHeaderItem" class="header">
            <span class="dda-dropdown-item">
              {{ item.text }}
            </span>
          </div>

          <div v-else-if="item.isActionItem" class="action" v-on:click.stop.prevent="click(item)" >
            <span class="dda-dropdown-item">
              <span v-if="item.hasImg" >
                <span v-bind:class="item.imgClass"></span>
              </span>
              <span class='flex' >
                {{ item.text }}
              </span>
              <span v-for="(imgItem, index) in item.imagesRight" v-bind:key="index" v-on:click.stop.prevent="click(item, imgItem)" >
                  <span v-bind:class="imgItem.imgClass" v-bind:title="imgItem.toolTip"></span>
              </span>
            </span>
          </div>

          <div v-else-if="item.isRadioboxItem || item.isCheckboxItem" class="option" v-on:click.stop.prevent="click(item)" >
            <span class="dda-dropdown-item">
                <span v-bind:class="item.imgClass"></span>
              <span class='flex'>
                {{ item.text }}
              </span>
            </span>
          </div>

          <div v-else>** not implemented **</div>

        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ActionItem, DropDownItemBase, DropDownDirection, RightImageInfo } from "./DropDownItems";
import { getCoords } from "../utils";
import '@mdi/font/css/materialdesignicons.css';

Vue.component("dropdown-toolbar", {
  props: ["items"],
  render(h: any) {
    return h(
      "div",
      this.items.map(function(item: any) {
        return item.render(h);
      })
    );
  }
});

// little trick bypass bl** typescript checking of $element....
export class MyData {
  public $element: any = null;
  public show: boolean = false;
  public my_direction: DropDownDirection = DropDownDirection.DownRight;
  public my_items: DropDownItemBase[] = [];
}

export class DropDownInfo {
  constructor(item: ActionItem, items: DropDownItemBase[], imageOnRight: RightImageInfo) {
    this.item = item;
    this.items = items;
    this.imageOnRight = imageOnRight;
  }
  public item: ActionItem = undefined;
  public items: DropDownItemBase[] = [];
  public imageOnRight: RightImageInfo = undefined;
}

export default Vue.extend({
  name: "DropDownMenu",
  props: ["items", "itemsAsync", "onClick", "direction"],
  data: () => new MyData(),
  methods: {
    click(item: ActionItem, rightImgInfo: RightImageInfo = undefined) {
      
      // pass the click instruction down to the implementer
      let closeDrowDown = item.click(this.my_items);

      // if implementer wants us to close the dropdown then do so
      if (closeDrowDown)
        this.toggle();
      
      // if a click handler is given for the entire dropdown then call it with full info
      if (this.onClick) 
        this.onClick( new DropDownInfo(item, this.my_items, rightImgInfo));
    },
    getCoords() {
      let el = this.$element;
      if (!el) return {};
      let coords = getCoords(el);
      return coords;
    },
    close (e: any) {
      if (!this.$element.contains(e.target)) {
        //this.show = false
        this.toggle();
      }
    },
    setDropDownItems(items) {
      this.my_items = items;
      this.$nextTick( _ => this.setTitleAttributesIfNeccesary());
    },
    setTitleAttributesIfNeccesary() {
      let elementList = this.$element.querySelectorAll("div.dda-dropdown-list .flex");
      elementList.forEach(el => {
        el.setAttribute('title', "");

        if (el.offsetWidth < el.scrollWidth)  
            el.setAttribute('title', el.innerText);
      });  
    },
    async toggle() {
      // toggle the 'show' property
      this.show = !this.show

      // if we have an async retrieval of items then invoke it here
      if (this.show) {
        if (this.items) {
          this.setDropDownItems(this.items);
        }

        else if (this.itemsAsync)  {
          let myitems = await this.itemsAsync();
          
          // important! - after await we have to make sure that we are 
          // still wishing to show the items!
          if (this.show)
            this.setDropDownItems(myitems);
        }
      }
      else {
        this.setDropDownItems([]);
      }

    }
  },
  computed: {
    getStyle() {
      let coords: any = this.getCoords();
      if (!coords) return {};

      let elHeightPx = coords.height + "px";

      // define the style for this cell
      let styleBase: any = {
        position: "absolute" as "absolute",
        display: this.show ? "inline-block" : "none"
      };

      let x1 = DropDownDirection.UpLeft;
      let x2 = DropDownDirection.UpRight;

      if (this.my_direction == DropDownDirection.DownRight || this.my_direction == DropDownDirection.UpRight) 
        styleBase.left = "-2px";

      if (this.my_direction == DropDownDirection.DownLeft || this.my_direction == DropDownDirection.UpLeft) 
        styleBase.right = "-2px";

      if (this.my_direction == DropDownDirection.UpLeft || this.my_direction == DropDownDirection.UpRight) 
        styleBase.bottom = elHeightPx;

      if (this.my_direction == DropDownDirection.DownLeft || this.my_direction == DropDownDirection.DownRight) 
        styleBase.top = elHeightPx;

      return styleBase;
    }
  },
  watch: {
    show: function(newValue: boolean) {

      console.log("newV: ", newValue);

      if (newValue) 
        document.addEventListener('click', this.close);
      
      else
        document.removeEventListener('click', this.close)
    }
  },
  components: {},
  mounted() {

    // 
    let el: any = this.$refs.mydd;
    this.$element = el.parentElement;

    // check if a direction was given
    this.my_direction = DropDownDirection.DownRight;   // set default
    if (this.direction == "down-left") this.my_direction = DropDownDirection.DownLeft;
    else if (this.direction == "up-left") this.my_direction = DropDownDirection.UpLeft;
    else if (this.direction == "up-right") this.my_direction = DropDownDirection.UpRight;

    // if the source element does not have a 'position' set then we'll set it to 'relative'
    var posNotSet =
      this.$element.position == "" || this.$element.position == "static";
    if (!posNotSet)
      this.$element.style.position = "relative";

    // listen for 'clicks' on the given parent element which shows the dropdown
    this.$element.addEventListener("click", this.toggle);
  },
  beforeDestroy () {
    this.$element.addEventListener("click", this.toggle);
  }
});
</script>

<style lang="scss" scoped>
$item-height: 30px;
$font-size: 14px;
$border-colour: rgb(194, 194, 195);
$border-colour-item: rgba(194, 194, 195, 0.5);
$back-colour: white;
$back-colour-hover: #f0f0f0;
$back-colour-right-img-hover: #bbbdc361;

@mixin border-box() {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

@mixin flexbox {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

@mixin flexchild {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -ms-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}

.img {
  padding: 1px;
  -webkit-transition: border 0.4s; /* Safari */
  transition: border 0.4s;
}

.img-border {
  border: 1px solid transparent;
  &:hover {
    border: 1px solid rgb(182, 182, 89);
  }
}

.img-left {
  margin-left: 0px;
  margin-right: 0px;
  padding: 1px;
}

.img-right {
  margin-left: 0px;
  margin-right: 3px;
}

// .flex-container {
//   @include flexbox();
// }

// .flex-text {
//   @include flexchild();
// }

.dda-container {
  position: absolute;
  z-index: 3;
  color: rgb(59, 64, 95);
  box-shadow: rgb(202, 202, 183) 0px 0px 10px 1px;
  @include border-box();

  &.show > .dda-dropdown-list {
    display: block;
    text-align: left;
  }

  .dda-dropdown-list {
    max-width: 200px;
    max-height: 260px;
    border: 2px solid $border-colour;
    overflow-y: auto;
    overflow-x: hidden;
    // display: none;
    @include border-box();

    & i {
      width: 20px;
      height: 20px;
      margin-top: 6px;
      line-height: 20px;
      &.img-left {
        margin-top: 6px;
      }
      &.material-icons {
        margin-right: 6px;
        margin-left: 5px;
        &.material-icons.md-18 {
          margin-right: 1px;
        }
      }
    }

    > div {
      width: 100%;
      background: $back-colour;
      border-bottom: solid 1px $border-colour-item;
      @include border-box();
      -webkit-transition: background 0.2s; /* Safari */
      transition: background 0.2s;
      white-space: nowrap;

      &:hover {
        background: $back-colour-hover;
      }

      & .action {
        cursor: pointer;
      }

      & .option {
        cursor: pointer;
      }

      & .disabled {
        color: #ababab;
        background-color: #ebebeb0a;
        cursor: default;
      }

      & .seperator {
        height: 3px;
        background-color: #efebeb;
      }

      & .header {
        line-height: 31px !important;
        background-color: #adadad;
        color: white;
        cursor: default;
        padding-left: 5px;
      }

      // & :last-child {
      //   border-bottom: 0px;
      // }
    }

    .img-check {
      margin-top: 9px;
      margin-left: 3px;
      margin-right: 4px;
      width: 11px;
      height: 11px;
      display: inline-block;
      border: 1px solid rgba(128, 128, 128, 0.541);
      background-color: $back-colour;

      &.option {
        border-radius: 6px;
      }

      &.checked {
        background-color: orange;
      }
    }
  }

  .dda-dropdown-item {
    @include flexbox();
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-left: 2px;
    padding-right: 4px;
    line-height: $item-height;
    vertical-align: middle;
    font-family: Roboto, sans-serif;
    font-size: $font-size;
    text-align: left;

    > .flex {
      @include flexchild();
      margin-left: 4px;
      margin-right: 4px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      &.increase-left-margin-fa {
        margin-left: 24px;
      }
      &.increase-left-margin-md-18 {
        margin-left: 30px;
      }
      &.increase-left-margin-md-24 {
        margin-left: 35px;
      }
    }

    > [data-img-right] {
      border: 1px solid rgba(211, 211, 211, 0);
      border-radius: 3px;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
      &:hover {
        border: 1px solid rgb(159, 158, 163);
        background: $back-colour-right-img-hover;
      }
    }
  }
}

// .drop-down-menu {
//   z-index: 3;
//   color: #3b405f;
//   box-shadow: #cacab7 0px 0px 10px 1px;
//   box-sizing: border-box;

//   @include border-box();
// }

// .drop-down-item {
//   width: 100%;
//   line-height: 19px;
//   background: white;
//   border-bottom: solid 1px rgba(194, 194, 195, 0.5);
//   box-sizing: border-box;
//   -moz-box-sizing: border-box;
//   -webkit-transition: background 0.2s;
//   transition: background 0.2s;
//   padding: 5px;
//   font-size: smaller;
//   text-align: left;
//   margin-left: 4px;
//   margin-right: 4px;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   overflow: hidden;

//   display: flex;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   padding-left: 2px;
//   padding-right: 4px;
//   line-height: 32px;
//   vertical-align: middle;
//   font-family: Roboto,sans-serif;
//   font-size: 14px;

//   &:hover {
//       background: $back-colour-hover;
//   }

//   & .action {
//       cursor:pointer;
//   }

//   &.option {
//       cursor:pointer;
//   }

//   &.disabled {
//       color: #ababab;
//       background-color: #ebebeb0a;
//       cursor: default;
//   }

//   &.seperator {
//       height: 3px;
//       background-color: #efebeb;
//   }

//   & .header {
//       line-height: 21px !important;
//       background-color: #adadad;
//       color: white;
//       cursor: default;
//       padding-left: 5px;
//   }

//   &:last-child {
//       border-bottom: 0px;
//   }

// }

// .is-header {
//   padding: 3px;
//   background: beige;
// }

// .is-action {
//   padding: 3px;
//   background: white;
// }
</style>
