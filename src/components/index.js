import DropDownMenu, { DropDownInfo } from "./DropDownMenu.vue"
import { DropDownItemBase, ActionItem, HeaderItem, DropDownDirection, 
	SeperatorItem, CheckboxItem, RadioboxItem, RightImageInfo } from "./DropDownItems.ts";
import { getTestItems } from '../data'
import { delay, createGuidRight5 } from '../utils'

// don't forget to import the matching css
//import 'vue-dropdown-advanced/dist/vue-dropdown-advanced.css

// in case one wishes to use the materialdesignicons - simply include these and it works!
//import '@mdi/font/css/materialdesignicons.css'

export default { DropDownMenu, DropDownInfo, DropDownItemBase, ActionItem, SeperatorItem, CheckboxItem, RadioboxItem, RightImageInfo, 
		HeaderItem, DropDownDirection, getTestItems, delay, createGuidRight5 }

