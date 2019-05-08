import {
	DropDownItemBase, HeaderItem, ActionItem,
	SeperatorItem, CheckboxItem, RadioboxItem
} from './components/DropDownItems';

// Demo class - allow the sample to produce demo output quickly
const getItems = (context: string = '') => {
	var arr: DropDownItemBase[] = [];
	if (context == 'simple') {
		arr.push(new ActionItem("A", "Holiday in France", "", false, _ => alert(_.key)));
		arr.push(new SeperatorItem());
		arr.push(new ActionItem("B", "Go to California "));
		arr.push(new ActionItem("C", "Visit the United Kingdom"));
	}
	if (context == 'logout-simple') {
		arr.push(new ActionItem("logout", "Logout", "mdi-exit-run", false, _ => alert(_.key)));
		arr.push(new SeperatorItem());
		arr.push(new ActionItem("profile", "Show Profile", "mdi-face"));
		arr.push(new ActionItem("shortcuts", "Show Shortcuts", "mdi-access-point"));
		arr.push(new ActionItem("setting", "System Settings and a whole lot more and stuff", "mdi-cogs"));
	}
	if (context == 'logout') {
		var item = new ActionItem("A", "Logout Show outstanding alerts", "mdi-cloud-download", true);
		item.data = { pos: context };
		item.addRightImage("mdi-cogs", "settings");
		item.addRightImage("mdi-exit-to-app", "exit the application");
		arr.push(item);
		arr.push(new SeperatorItem());
		item = new ActionItem("profile", "Show User Profile", "mdi-face");
		item.addRightImage("fa-mail-forward", "forward this item");
		//item.textMarginRight = 32;
		arr.push(item);
		arr.push(new ActionItem("bell", "Show outstanding alerts", "mdi-bell-ring"));
		arr.push(new ActionItem("shortcuts", "Show Bitcoin Valuation", "mdi-bitcoin"));
		arr.push(new ActionItem("setting", "System Settings", "mdi-cogs"));
	}
	if (context == 'options-simple') {
		arr.push(new HeaderItem("Choose your activities:"));
		arr.push(new CheckboxItem("beach", "Visit the beach"));
		arr.push(new CheckboxItem("town", "Walk through town"));
		arr.push(new CheckboxItem("museum", "Visit musea"));
		arr.push(new CheckboxItem("hirecar", "Hire a car"));
		arr.push(new CheckboxItem("nothing", "Do absolutely nothing and less then that!"));
	}
	if (context == 'options') {
		arr.push(new RadioboxItem("keyZ", "My Option 1", "A"));
		arr.push(new RadioboxItem("keyA", "My Option 2", "A", true));
		arr.push(new SeperatorItem());
		arr.push(new ActionItem("keyX1", "Take Action X1"));
		arr.push(new ActionItem("keyX2", "Take Action X2"));
		arr.push(new SeperatorItem());
		arr.push(new CheckboxItem("keyA2", "Buy Apples", true));
		arr.push(new CheckboxItem("keyB2", "Buy Bananas", true));
		arr.push(new CheckboxItem("keyC2", "Buy Pomegranates"));
		arr.push(new SeperatorItem());
		arr.push(new RadioboxItem("keyO2", "Haarlem is the best place to live", "C"));
		arr.push(new RadioboxItem("keyO3", "Amsterdam is the best place to live", "C"));
	}
	if (context == "showcase") {
		var item = new ActionItem("booknow", "Book now!", "mdi-airplane-takeoff");
		item.data = { pos: context };                            // save some random data with this item..
		item.addRightImage("mdi-cogs", "settings");
		item.addRightImage("mdi-exit-to-app", "exit the application");
		arr.push(item);
		arr.push(new SeperatorItem());
		arr.push(new HeaderItem("Choose your destination:"));
		arr.push(new RadioboxItem("california", "California and Santa Monica", "A"));
		arr.push(new RadioboxItem("newyork", "New York", "A"));
		arr.push(new RadioboxItem("miami", "Miami", "A"));
		arr.push(new SeperatorItem());
		arr.push(new HeaderItem("Mode of transport:"));
		arr.push(new RadioboxItem("car", "By car", "B"));
		arr.push(new RadioboxItem("boat", "By boat", "B", true));
		arr.push(new RadioboxItem("plane", "By plane", "B"));
		arr.push(new SeperatorItem());
		arr.push(new HeaderItem("Choose your activities:"));
		arr.push(new CheckboxItem("beach", "Visit the beach"));
		arr.push(new CheckboxItem("town", "Walk through town"));
		arr.push(new CheckboxItem("park", "Visit Parks"));
		arr.push(new CheckboxItem("hirecar", "Hire a car"));
		arr.push(new CheckboxItem("nothing", "Do absolutely nothing !"));
	}
	return arr;
}

export { getItems as getTestItems };


