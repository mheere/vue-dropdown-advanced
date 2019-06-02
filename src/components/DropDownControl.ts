
import DropDownMenu from "./components/DropDownMenu.vue";
import { DropDownItemBase, ActionItem, SeperatorItem } from './DropDownItems';

// export class DropDownControl {
	
// 	private _element: any = null;
// 	private _show: boolean = false;
	
// 	constructor(el: Element) {
// 		this._element = el;

// 		let myitems = [];	// : DropDownItemBase[] = [];  // = getTestItems("simple");    // showcase
// 		// myitems.push(new ActionItem("A", "Holiday in France", "", true));
// 		// myitems.push(new SeperatorItem());
// 		// myitems.push(new ActionItem("B", "Go to California "));
// 		// myitems.push(new ActionItem("C", "Visit the United Kingdom"));
	
// 		let pdata = { 
//       parent: this._element,
// 			items: myitems,
// 			direction: 'up-left',
// 			click: this.onClick
// 		}
		
// 		// create new DropDownMenu with the given properties
// 		let x = new DropDownMenu({
// 			propsData: pdata
// 		});

// 		// and mount this to the given parent element
// 		x.$mount(this._element);

// 	}

// 	public onClick() {
// 		console.log("clicked");
// 	}

// }



// // 1. create a new DropDownControl for this element
// var dd = new DropDownControl('#ex1');
// //var dd = new DropDownControl('.ex-right-img');
// //var dd = new DropDownControl('#abc001');
// dd.setToRelativePositionIfNotSet = true;    

// // 2. specify the dropdown items
// dd.getItems = () => TestData.getItems("simple items");
// dd.direction = DropDownDirection.DownRight;

// // 3. 
// dd.closeOnActionItemClick = true;

// // 4. place event handlers
// dd.onClick = (item) => {
//     console.log(`Item '${item.key}' was clicked. [key: ${item.key}]`);
//     //if (item.key == "cancel") dd.
// }
// dd.onChecked = (item, checkedOptionItems, allCheckedOptionItems) => {
//     console.log(`'${item.text}' was clicked [checked: ${item.isChecked}]`);
// }
// dd.onClose = (item) => {
//     var txt = item ? item.text : " no item was clicked";
//     console.log("popup closed - last item: " + txt);
// };

//  // 4. create the react dropdown
//  dd.createMenu();