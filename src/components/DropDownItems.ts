
//import Vue from 'vue';
//import { DropDownMenu } from './DropDownMenu';
import { createGuidRight5 }   from '../utils';

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

    constructor(key: string = "", text: string = "") {
        // if no key was given then we will allocate one
        if (!key) key = createGuidRight5();
        this.key = key;
        this.text = text;
    }

    get isActionItem(): boolean {
        return this.constructor.toString() === ActionItem.toString();
    }
    // get isOptionItem(): boolean {
    //     return this.constructor.toString() === OptionItem.toString();
    // }
    get isRadioboxItem(): boolean {
        return this.constructor.toString() === RadioboxItem.toString();
    }
    get isCheckboxItem(): boolean {
        return this.constructor.toString() === CheckboxItem.toString();
    }
    get isSeperatorItem(): boolean {
        return this.constructor.toString() === SeperatorItem.toString();
    }
    get isHeaderItem(): boolean {
        return this.constructor.toString() === HeaderItem.toString();
    }

    // public asActionItem(item: any): ActionItem {
    //     return (item as ActionItem)
    // }

    // public asOptionItem(item: any): OptionItem {
    //     return (item as OptionItem);
    // }

    // get ddclass(): string {
    //     var classval = "";
    //     if (this.isActionItem) classval = "action";
    //     if (this.isOptionItem) classval = "option";
    //     if (this.isSeperatorItem) classval = "seperator";
    //     if (this.isHeaderItem) classval = "header";

    //     if (this.isDisabled) classval += " disabled ";
        
    //     return classval;
    // }

    // ensure a 'title' is set if the dropdown item is showing ellipses
    public setTitle(el: any, title: string) {
        if (el == null) return;

        // enure no title is shown if we are within the width (even if the target did specify one)
        el.setAttribute('title', "");

        if (el.offsetWidth < el.scrollWidth)  
            el.setAttribute('title', title);
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
        super();
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
        super("", header);
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
    public className: string = "";          // any additional className info that is appended to the <i> image element
    public clickedImage: string = "";       // the name of the image that raised the clicked event (was clicked)
    public textMarginRight: number = 0;     // if given (> 0) then this margin will be applied to the text portion (in order to create distance between the text and right image or right border)

    constructor(key: string, text: string, image?: string, isDisabled?: boolean, clicked?: (ai: ActionItem) => void) {
        super(key, text);
        this.imageLeft = image || "";
        this.isDisabled = isDisabled || false;
        this.clicked = clicked;
    }

    get hasImg(): boolean { return this.imageLeft.length > 0}

    get imgClass(): string {
        return "img img-left mdi " + this.imageLeft;
    }

    // private isImgFontAwesome(img: string): boolean { return img.startsWith("fa-") }
    // private isImgMaterial(img: string): boolean { return !this.isImgFontAwesome(img) }
    // public isLeftImgFontAwesome(): boolean { return this.isImgFontAwesome(this.imageLeft) }
    // public isLeftImgMaterial(): boolean { return this.isImgMaterial(this.imageLeft) }

    public addRightImage(img: string, toolTip?: string) { this.imagesRight.push(new RightImageInfo(img, toolTip)); }

    public ToString() {
        return `*ActionItem* ${this.text} [${this.key}]`;
    }

    public click(items: DropDownItemBase[]): boolean {
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
        super(key, text);
        this.isChecked = isChecked;
    }

    // return "img img-border img-right mdi " + this.imageRight;
    get imgClass(): any {
        let s = "img-check ";
        if (this.isChecked ) s += " checked ";
        return s;
    }

    public click(items: DropDownItemBase[]): boolean {
        this.isChecked = !this.isChecked;
        return false;
    }
}

// a 'checked' item - indicates a check/unchecked state
export class RadioboxItem extends CheckedItem {

    constructor(key: string, text: string, groupBy: string = "", isChecked: boolean = false) {
        super(key, text);
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
        
        items   
            .filter((item: any) => item.isRadioboxItem && item.groupBy == this.groupBy)
            .forEach((item: any) => item.isChecked = false);

        // check the incoming one (that was clicked)
        this.isChecked = true;

        return false;
    }
}
