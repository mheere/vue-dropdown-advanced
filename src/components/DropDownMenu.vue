<template>
  <div class="dda-container" v-bind:style="getStyle" ref="mydd">
    <!-- <dropdown-toolbar v-bind:items="items"> </dropdown-toolbar> -->
    <div class="dda-dropdown-list">
      <div v-for="(item) in items" v-bind:key="item.key" >
        <div v-if="item.isHeaderItem" class="header">
          <span class="dda-dropdown-item">
            {{ item.text }}
          </span>
        </div>
        <div v-else-if="item.isActionItem" class="action">
          <span class="dda-dropdown-item">
            {{ item.text }}
          </span>
        </div>
        <div v-else>nothing else...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ActionItem, DropDownItemBase } from "./DropDownItems";
import { getCoords } from "../utils";

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
  // public mystyle: any = {
  //   position: "absolute" as "absolute",
  //   top: '5px',
  //   left: "0px",
  //   //display: this.show ? 'inline-block' :'none'
  // };
  //public items: DropDownItemBase[] = [];
}

export default Vue.extend({
  name: "DropDownMenu",
  props: ["items"],
  data: () => new MyData(),
  methods: {
    getDropDownClass() {
      //   var direction = this.props.direction;
      //   if (direction == DropDownDirection.DownLeft) return "down-left";
      //   if (direction == DropDownDirection.DownRight) return "down-right";
      //   if (direction == DropDownDirection.UpLeft) return "up-left";
      //   if (direction == DropDownDirection.UpRight) return "up-right";
    },
    getCoords() {
      let el = this.$element;
      if (!el) return {};
      let coords = getCoords(el);
      return coords;
    }
  },
  computed: {
    getStyle() {
      let coords: any = this.getCoords();
      if (!coords) return {};

      // define the style for this cell
      let styleBase: any = {
        position: "absolute" as "absolute",
        top: coords.height + "px",
        left: "0px",
        display: this.show ? "inline-block" : "none"
      };

      return styleBase;
    }
  },
  components: {},
  mounted() {
    //debugger;
    let el: any = this.$refs.mydd;
    this.$element = el.parentElement;

    // if the source element does not have a 'position' set then we'll set it to 'relative'
    var posNotSet =
      this.$element.position == "" || this.$element.position == "static";
    if (!posNotSet)
      // && this.props.setRelativePosition)
      this.$element.style.position = "relative";

    //var posRelative = sourceElStyle.position == "relative";
    //var posAbsolute = sourceElStyle.position == "absolute";

    //this.$element

    //this.mystyle.top = this.$element.offsetHeight + "px";

    let xx = () => (this.show = !this.show);
    xx = xx.bind(this);

    this.$element.addEventListener("click", xx);
  }
});
</script>

<style lang="scss" scoped>
$item-height: 32px;
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

      &:hover {
        background: $back-colour-hover;
      }

      &.action {
        cursor: pointer;
      }

      &.option {
        cursor: pointer;
      }

      &.disabled {
        color: #ababab;
        background-color: #ebebeb0a;
        cursor: default;
      }

      &.seperator {
        height: 3px;
        background-color: #efebeb;
      }

      &.header {
        line-height: 31px !important;
        background-color: #adadad;
        color: white;
        cursor: default;
        padding-left: 5px;
      }

      &:last-child {
        border-bottom: 0px;
      }
    }

    .img-check {
      margin-top: 11px;
      margin-left: 6px;
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
