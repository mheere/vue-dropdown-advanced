
import { createGuidRight5, instanceOf }   from '../utils';

export enum DropDownDirection {
    DownRight,
    DownLeft,
    UpRight,
    UpLeft,
}

export class DropDownItemBase {

    public key: string = "";
    public text: string = "";
    public isDisabled: boolean = false;
    public data: any = undefined;           // allow any object to be associated with this item - quite handy!
    public baseClassName: string = ""; 

    constructor(key: string = "", text: string = "", className: string = "") {
        // if no key was given then we will allocate one
        if (!key) key = createGuidRight5();

        // hand them over
        this.key = key;
        this.text = text;
        this.baseClassName = className;
    }

    get isActionItem(): boolean {
        return instanceOf(this, ActionItem);
    }
    get isRadioboxItem(): boolean {
        return instanceOf(this, RadioboxItem);
    }
    get isCheckboxItem(): boolean {
        return instanceOf(this, CheckboxItem);
    }
    get isSeperatorItem(): boolean {
        return instanceOf(this, SeperatorItem);
    }
    get isHeaderItem(): boolean {
        return instanceOf(this, HeaderItem);
    }

    get getClass(): string {
        let xx = this.baseClassName;
        if (this.isActionItem) xx += " action"
        if (this.isRadioboxItem) xx += " radiobox"
        if (this.isCheckboxItem) xx += " checkbox"
        if (this.isDisabled) xx += " disabled"
        return xx;
    }
}

export class SeperatorItem extends DropDownItemBase {

    constructor() {
        super("", "", "seperator");
    }

    public getStyle() {
        return {
            class: ['da-dropdown-item seperator']
        }
    }
}

export class HeaderItem extends DropDownItemBase {

    constructor(header: string) {
        super("", header, "header");
    }

    public getStyle() {
        return {
            class: ['dda-dropdown-item ']
        }
    }
}

// probably the most often used Item - by default the dropdown closes onClick
export class ActionItem extends DropDownItemBase {
    public clicked: ((ai: ActionItem) => void) | undefined = undefined; // a click handler in case the caller wishes to act on this click directly..
    public imageLeft: string = "";              // image (either fa or material)
    public imagesRight: RightImageInfo[] = [];  // image (either fa or material)

    constructor(key: string, text: string, image?: string, isDisabled?: boolean, clicked?: (ai: ActionItem) => void) {
        super(key, text, "action");
        this.imageLeft = image || "";
        this.isDisabled = isDisabled || false;
        this.clicked = clicked;
    }

    get hasImg(): boolean { return this.imageLeft.length > 0}

    get imgClass(): string {
        return "img img-left mdi " + this.imageLeft;
    }

    public addRightImage(img: string, toolTip?: string) { this.imagesRight.push(new RightImageInfo(img, toolTip)); }

    public ToString() {
        return `*ActionItem* ${this.text} [${this.key}]`;
    }

    public click(items: DropDownItemBase[]): boolean {
        if (this.isDisabled) return false;
        if (this.clicked) this.clicked(this);
        return true;
    }
}

// little helper class that groups some common props..
class CheckedItem extends ActionItem {
    public isChecked: boolean = false; 
    public groupBy: string = "";

    public toString() {
        return `*CheckedItem* ${this.text} [${this.key}] - ${this.isChecked} [groupBy: ${this.groupBy}]`;
    }
}

// a 'checked' item - indicates a check/unchecked state
export class CheckboxItem extends CheckedItem {

    constructor(key: string, text: string, isChecked: boolean = false) {
        super(key, text, "checkbox");
        this.isChecked = isChecked;
    }

    // return "img img-border img-right mdi " + this.imageRight;
    get imgClass(): any {
        let s = "img-check ";
        if (this.isChecked ) s += " checked ";
        return s;
    }

    public click(items: DropDownItemBase[]): boolean {
        if (this.isDisabled) return false;
        this.isChecked = !this.isChecked;
        return false;
    }
}

// a 'checked' item - indicates a check/unchecked state
export class RadioboxItem extends CheckedItem {

    constructor(key: string, text: string, groupBy: string = "", isChecked: boolean = false) {
        super(key, text, "radiobox");
        this.groupBy = groupBy;
        this.isChecked = isChecked;
    }
    
    // return "img img-border img-right mdi " + this.imageRight;
    get imgClass(): any {
        let s = "img-check option";
        if (this.isChecked ) s += " checked ";
        return s;
    }

    public click(items: DropDownItemBase[]): boolean {
        
        if (this.isDisabled) return false;

        items   
            .filter((item: any) => item.isRadioboxItem && item.groupBy == this.groupBy)
            .forEach((item: any) => item.isChecked = false);

        // check the incoming one (that was clicked)
        this.isChecked = true;

        return false;
    }
}


export class RightImageInfo {
    public imageRight: string = "";
    public toolTip: string = "";

    constructor(img: string, toolTip?: string) {
        this.imageRight = img;
        this.toolTip = toolTip || "";
    }

    get imgClass(): string {
        return "img img-border img-right mdi " + this.imageRight;
    }
}