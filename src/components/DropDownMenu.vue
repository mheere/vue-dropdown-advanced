<template>
  <div class="vdda-container" v-bind:style="getStyle" ref="mydropdown">
    <div class="vdda-dropdown-list">
      <div v-for="(item) in my_items" 
        :class="item.getClass"
        :key="item.key" 
        @click.stop.prevent="clickFromTempl(item)">

        <div v-if="item.isHeaderItem" class="vdda-dropdown-item">
            {{ item.text }}
        </div>

        <div v-else-if="item.isActionItem" class="vdda-dropdown-item"  >
            <span v-if="item.hasImg" >
              <span v-bind:class="item.imgClass"></span>
            </span>
            <span class='flex' >
              {{ item.text }}
            </span>
            <span v-for="(imgItem, index) in item.imagesRight" :key="index" @click.stop.prevent="clickFromTempl(item, imgItem)">
                <span v-bind:class="imgItem.imgClass" v-bind:title="imgItem.toolTip"></span>
            </span>
        </div>

        <div v-else-if="item.isRadioboxItem || item.isCheckboxItem" class="vdda-dropdown-item" >
            <span v-bind:class="item.imgClass"></span>
            <span class='flex'>
              {{ item.text }}
            </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ActionItem, SeperatorItem, DropDownItemBase, DropDownDirection, RightImageInfo } from "./DropDownItems";
import { getCoords } from "../utils";

// little trick bypassing bl** typescript checking of $element....
export class MyData {
  public $element: any = null;
  public show: boolean = false;
  public my_direction: DropDownDirection = DropDownDirection.DownRight;
  public my_items: DropDownItemBase[] = [];   // this is the list we create the dropdown items from
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

// -----------------------------
// define the DropDownMenu
// -----------------------------
let vueDropDownMenu = Vue.extend({
//export default Vue.extend({
  name: "DropDownMenu",
  props: {
    parent: {
      type: HTMLDivElement 
    },
    items: {
      type: Array,
      default: function () {
        return [];
      }
    },
    itemsAsync: {
      type: Function
    },
    click: {
      type: Function
    },
    direction: {
      type: [ String ],
      default: function () {
        return "down-right";
      },
      validator: function (value: string) {
        value = value.toLowerCase();
        return ['down-right', 'down-left', 'up-right', 'up-left'].indexOf(value) !== -1;
      }
    },
    minWidth: {
      type: String,
      default: function () {
        return "0";
      }
    },
    maxWidth: {
      type: String,
      default: function () {
        return "0";
      }
    },
    maxHeight: {
      type: String,
      default: function () {
        return "0";
      }
    }
  },
  data: () => new MyData(),
  methods: {
    clickFromTempl(item: ActionItem, rightImgInfo: RightImageInfo = undefined) {

      // if item is disabled then stop
      if (item.isHeaderItem || item.isSeperatorItem || item.isDisabled) return;
      
      // pass the click instruction down to the implementation (like ActionItem, CheckboxItem, etc)
      let closeDrowDown = item.click(this.items);

      // if implementer wants us to close the dropdown then do so
      if (closeDrowDown)
        this.toggle();
      
      // if a click handler is given for the entire dropdown then call it with full info
      // also, raise this on the nextTick so vue renders the item properly first!

      // create an info object for our items
      let info = new DropDownInfo(item, this.items, rightImgInfo);

      // allow the UI to render first
      this.$nextTick( _ => {

        // if a callback click handler was given then call it
        if (this.click) this.click(info);

        // and always raise the event in case the user has hooked up through events
        this.$emit('click', info);

      });
    },
    getCoords() {
      let el = this.$element;
      if (!el) return {};
      let coords = getCoords(el);
      return coords;
    },
    close (e: any) {
      if (!this.$element.contains(e.target)) {
        this.toggle();
      }
    },
    setDropDownItems(items) {
      this.my_items = items;
      this.$nextTick( _ => this.setTitleAttributesIfNeccesary());
    },
    setTitleAttributesIfNeccesary() {

      // get a list of all the 'text's from the all items
      let elementList = this.$element.querySelectorAll("div.vdda-dropdown-list .flex");
      elementList.forEach(el => {
        el.setAttribute('title', "");   // first clear 

        // trick to check if the content would require a scroll
        if (el.offsetWidth < el.scrollWidth)  
            el.setAttribute('title', el.innerText);
      }); 
      
    },
    async toggle() {
      // toggle the 'show' property
      this.show = !this.show

      // if we have an async retrieval of items then invoke it here
      if (this.show) {
        
        // if the user has given an async method then call this
        if (this.itemsAsync)  {
          let myitems = await this.itemsAsync();
          
          if (this.show)  // important! - after await we have to make sure that we are still wishing to show the items!
            this.setDropDownItems(myitems);
        }
        else if (this.items) {
          // user gave a list
          this.setDropDownItems(this.items);
        }
      }
      else {
        // clear out the list of items (replace with an empty array so we hang on to the original list)
        this.setDropDownItems([]);
      }
    }
  },
  computed: {
    getStyle() {
      let coords: any = this.getCoords();
      if (!coords) return {};

      // define the height of the element we are attached to
      let elHeightWithPx = coords.height + "px";

      // define the style for this cell
      let styleBase: any = {
        position: "absolute" as "absolute",
        display: this.show ? "inline-block" : "none"
      };

      // adjust the style based on the required orientation (direction)
      if (this.my_direction == DropDownDirection.DownRight || this.my_direction == DropDownDirection.UpRight) 
        styleBase.left = "-2px";
      if (this.my_direction == DropDownDirection.DownLeft || this.my_direction == DropDownDirection.UpLeft) 
        styleBase.right = "-2px";
      if (this.my_direction == DropDownDirection.UpLeft || this.my_direction == DropDownDirection.UpRight) 
        styleBase.bottom = elHeightWithPx;
      if (this.my_direction == DropDownDirection.DownLeft || this.my_direction == DropDownDirection.DownRight) 
        styleBase.top = elHeightWithPx;

      return styleBase;
    }
  },
  watch: {
    show: function(newValue: boolean) {
      
      if (newValue) 
        document.addEventListener('click', this.close);
      
      else
        document.removeEventListener('click', this.close)
    }
  },
  components: {},
  mounted() {

    // 
    let el: any = this.$refs.mydropdown;
    this.$element = this.parent || el.parentElement;

    // set the default
    this.my_direction = DropDownDirection.DownRight; 

    // check if a direction was given
    if (typeof this.direction === "string") {
      if (this.direction == "down-left") this.my_direction = DropDownDirection.DownLeft;
      else if (this.direction == "up-left") this.my_direction = DropDownDirection.UpLeft;
      else if (this.direction == "up-right") this.my_direction = DropDownDirection.UpRight;
    }
    else if (this.direction) {
      this.my_direction = this.direction;
    }

    // When inserting the DropDownMenu into the template all is ok, but when
    // we create the dropdown programmatically we have to wait for a render cycle
    // to have passed (otherwise the template has not yet rendered)
    Vue.nextTick(() => {
      
      // get a ref to our vdda-dropdown-list element
      let elDDA = this.$element.querySelector("div.vdda-dropdown-list");

      // check for overrides of the default min/max width/height
      if (this.minWidth != "0") elDDA.style.minWidth = this.minWidth;
      if (this.maxWidth != "0") elDDA.style.maxWidth = this.maxWidth;
      if (this.maxHeight != "0") elDDA.style.maxHeight = this.maxHeight;

      // if the source element does not have a 'position' set then we'll set it to 'relative'
      var posNotSet =
        this.$element.position == "" || this.$element.position == "static";
      if (!posNotSet)
        this.$element.style.position = "relative";

      // listen for 'clicks' on the given parent element which shows the dropdown
      this.$element.addEventListener("click", this.toggle);
    })
    
  },
  beforeDestroy () {
    this.$element.addEventListener("click", this.toggle);
  }
});

export { vueDropDownMenu as default };

// -------------------------------------
// We export a DropDownControl object so the user can programmatically create
// a dropdown menu for any given DOM element as and when needed (without
// editing the HTML template!)
// -------------------------------------
export class DropDownControl {
	
	private _element: any = null;
  private _show: boolean = false;
  
  public openOnCreate: boolean = false;
  public items: DropDownItemBase[];
  public itemsAsync: any;
  public onClick: (DropDownInfo) => void;
  public direction: string = "down-right";
  public minWidth: string = "0";
  public maxWidth: string = "0";
  public maxHeight: string = "0";
	
	constructor(el: Element) {
		this._element = el;
  }
  
  public createMenu() {
    
    // create options object I can pass in to the Vue component
    let pdata = { 
      parent: this._element,
      items: this.items,
      itemsAsync: this.itemsAsync,
			direction: this.direction,
      click: this.onClick,
      minWidth: this.minWidth,
      maxWidth: this.maxWidth,
      maxHeight: this.maxHeight 
		}
    
    // create new DropDownMenu with the given properties
		let x = new vueDropDownMenu({
			propsData: pdata
		});

		// and mount this to the given parent element
    var component = x.$mount();
    this._element.appendChild(component.$el)

    Vue.nextTick(() => {
      if (this.openOnCreate) this._element.click();
    })
    
  }

}

</script>

<style lang="scss">
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

.vdda-container {
  position: absolute;
  z-index: 3;
  color: rgb(59, 64, 95);
  box-shadow: rgb(202, 202, 183) 0px 0px 10px 1px;
  @include border-box();

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

  .vdda-dropdown-list {
    max-width: 200px;
    max-height: 260px;
    border: 2px solid $border-colour;
    overflow-y: auto;
    overflow-x: hidden;
    display: block;
    @include border-box();

    & .action, .radiobox, .checkbox 
    {
      cursor: pointer;

      &:hover {
        background: $back-colour-hover;
      }
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
      padding-left: 5px;
    }

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
      cursor: default;
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

  .vdda-dropdown-item {
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

</style>
