
# An advanced Vue Dropdown Component 

## Key features
* caters for different types of dropdown items (action, checkbox, radio, header, seperator) 
* lazily calls back for dropdown items (synchronously or asynchronously!)
* dropdown items are removed from the markup when dropdown is closed
* a variety of life-cycle events are raised on check, click, open/close etc
* dropdown location is configurable (left/right/top/bottom)
* the dropdown can be created through code using any html element as source
* popup is closable through code
* and much more!

## -------------------------------------------------------------
## ------------------ Work in PROGRESS --------------------
## -------------------------------------------------------------


## Demo
Have a look at the [demo-page](http://www.vuedropdown.marcelheeremans.com) to check it out!

## Typescript
The code snippets below are extracts from my Typescript test project.  An `index.d.ts` file will be included soon to provide intellisense in your code.

# Using the Vue DropDown

## A basic 'fixed' dropdown items

![down-right.png](http://www.vuedropdown.marcelheeremans.com/pics/down-right.png)

We 'attach' a DropDownMenu menu to the 'Example Down Right' div by nesting it within its div as shown in the Vue template below.

```javascript
/// The 'template' part of the Vue file
<div class='button example-dr'>
	Example Down Right
	<drop-down-menu v-bind:items="fixedItems" :onClick="this.onClick">  </drop-down-menu>
</div>
```

Notice we have bound the 'items' property to the 'fixedItems' data property of the vue model.  When the parent is 'clicked' the onClick handler is called with the item itself but also any other dropdown state.

```javascript
/// The 'javascript' part of the Vue file		
export default Vue.extend({
  name: "app",
  data: () => {
    const fixedItems: DropDownItemBase[] = [];
    return {
      fixedItems
    }
  },
  methods: {
      onClick(info: DropDownInfo) {
        let msg = `Item '${info.item.text}' was clicked. [key: ${info.item.key}] `;
        console.log(msg);
      },
  },
  components: {
    DropDownMenu
  },
  created() {
    this.fixedItems.push(new ActionItem("A", "Holiday in France", "", false, _ => alert(_.key)));
    this.fixedItems.push(new ActionItem("B", "Go to California"));
    this.fixedItems.push(new ActionItem("C", "Visit London"));
  }
});
```
Bit boring, let's see what else we can do. 




# History

|version | Notes |
| ---- | ------ |
v 0.0.1 | Initial release - work in progress

