
//import Vue from 'vue';
//import { DropDownMenu } from './DropDownMenu';
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

    get mainClass(): string {
        let xx = this.baseClassName;
        if (this.isActionItem) xx += " action"
        if (this.isRadioboxItem) xx += " radiobox"
        if (this.isCheckboxItem) xx += " checkbox"
        if (this.isDisabled) xx += " disabled"
        return xx;
    }

    // public render(adjustLeftMargin?: string): JSX.Element {
    //     return (<span className='dda-dropdown-item'>not implemented</span>)
    // }
    render(h: any) {
        return h("h1", "Error - please provide your own implementation!");
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

    // public render() {
    //     return <span className='dda-dropdown-item seperator'></span>
    // }
    render(h: any) {
        return h('span', this.getStyle())
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

    // public render() {
    //     return <span className='dda-dropdown-item' ref={(el) => { this.setTitle(el, this.header); }}>{this.header}</span>
    // }
    render(h: any) {
        return h('span', this.getStyle(), this.text)
    }

}

// probably the most often used Item - by default the dropdown closes onClick
export class ActionItem extends DropDownItemBase {
    public clicked: ((ai: ActionItem) => void) | undefined = undefined;
    public imageLeft: string = "";          // image (either fa or material)
    public imagesRight: RightImageInfo[] = [];   // image (either fa or material)
    //public className: string = "";          // any additional className info that is appended to the <i> image element
    public clickedImage: string = "";       // the name of the image that raised the clicked event (was clicked)
    public textMarginRight: number = 0;     // if given (> 0) then this margin will be applied to the text portion (in order to create distance between the text and right image or right border)

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

    // get mainClass(): string {
    //     return "action " + this.isDisabled ? 'disabled' : '';
    // }

    public addRightImage(img: string, toolTip?: string) { this.imagesRight.push(new RightImageInfo(img, toolTip)); }

    public ToString() {
        return `*ActionItem* ${this.text} [${this.key}]`;
    }

    public click(items: DropDownItemBase[]): boolean {
        if (this.isDisabled) return false;
        if (this.clicked) this.clicked(this);
        return true;
    }

    render(h: any) {
        // var myParagraphVNode = h('p', 'hi')
        // return h('div', [
        //     myParagraphVNode
        // ])

        return h('div', { class: ['dda-dropdown-item '] }, 
            [
                h('h4', this.text)
            ]
        )
    }
}

class CheckedItem extends ActionItem {
    public isChecked: boolean = false;      // 
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