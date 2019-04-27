
//import Vue from 'vue';
//import { DropDownMenu } from './DropDownMenu';
import { createGuidRight5 }   from '../utils';

export enum DropDownDirection {
    DownRight,
    DownLeft,
    UpRight,
    UpLeft,
}

export class Colour {
    public colour: string = "";

    constructor(colour: string) {
        this.colour = colour;
    }

    render(h: any) {
        return h("h1", "Error - please provide your own implementation!");
    }
}

export class Orange extends Colour {
    constructor() {
        super("orange");
    }

    public getStyle() {
        return {
            class: ['example-class'],
            style: { backgroundColor: this.colour, border: '3px solid red' }
        }
    }

    render(h: any) {
        return h('h4', this.getStyle(), "This is my colour: " + this.colour)
    }
}

export class Blue extends Colour {
    private _isDisabled = true;

    constructor(disabled: boolean) {
        super("lightblue");
        this._isDisabled = disabled;
    }

    render(h: any) {
        return h('div',
            [
                h('h4', {
                    class: ['example-class', { 'is-disabled': this._isDisabled }],
                    style: { backgroundColor: this.colour }
                }, "Hello, I am " + this.colour)
            ]
        )
    }
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
    get isOptionItem(): boolean {
        return this.constructor.toString() === OptionItem.toString();
    }
    get isSeperatorItem(): boolean {
        return this.constructor.toString() === SeperatorItem.toString();
    }
    get isHeaderItem(): boolean {
        return this.constructor.toString() === HeaderItem.toString();
    }

    public asActionItem(item: any): ActionItem {
        return (item as ActionItem)
    }

    public asOptionItem(item: any): OptionItem {
        return (item as OptionItem);
    }

    get ddclass(): string {
        var classval = "";
        if (this.isActionItem) classval = "action";
        if (this.isOptionItem) classval = "option";
        if (this.isSeperatorItem) classval = "seperator";
        if (this.isHeaderItem) classval = "header";

        if (this.isDisabled) classval += " disabled ";
        
        return classval;
    }

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
    public imageRight: RightImageInfo[] = [];   // image (either fa or material)
    public className: string = "";          // any additional className info that is appended to the <i> image element
    public clickedImage: string = "";       // the name of the image that raised the clicked event (was clicked)
    public textMarginRight: number = 0;     // if given (> 0) then this margin will be applied to the text portion (in order to create distance between the text and right image or right border)
    public static useMaterialImage24: boolean = false;  // if set to true this will default to md-24 instead of md-18.

    constructor(key: string, text: string, image?: string, isDisabled?: boolean, clicked?: (ai: ActionItem) => void) {
        super(key, text);
        this.imageLeft = image || "";
        this.isDisabled = isDisabled || false;
        this.clicked = clicked;
    }

    get hasImg(): boolean { return this.imageLeft.length > 0}

    get imgClass(): string {
        return "mdi " + this.imageLeft;
    }

    // private isImgFontAwesome(img: string): boolean { return img.startsWith("fa-") }
    // private isImgMaterial(img: string): boolean { return !this.isImgFontAwesome(img) }
    // public isLeftImgFontAwesome(): boolean { return this.isImgFontAwesome(this.imageLeft) }
    // public isLeftImgMaterial(): boolean { return this.isImgMaterial(this.imageLeft) }

    public addRightImage(img: string, toolTip?: string) { this.imageRight.push(new RightImageInfo(img, toolTip)); }

    public ToString() {
        return `*ActionItem* ${this.text} [${this.key}]`;
    }

    // public render(adjustLeftMargin?: string) {
    //     var cn = "";
    //     if (this.imageLeft.length == 0) 
    //         cn = adjustLeftMargin;
        
    //     let style = {};

    //     if (this.textMarginRight > 0)
    //         style = { 
    //             marginRight: this.textMarginRight + "px"
    //         };

    //     return (
    //         <div className='dda-dropdown-item'>
    //             { this.renderLeftImage() }
    //             <span className={'flex ' + cn } ref={(el) => { this.setTitle(el, this.text); }} style={style}>{this.text}</span>
    //             { this.renderRightImages() }
    //         </div>
    //     )
    // }
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

    // private getMaterialClassName() {
    //     if (this.className.includes("md-"))
    //         return "material-icons " + this.className;
    //     else
    //         return "material-icons " + (ActionItem.useMaterialImage24 ? "md-24" : "md-18") + this.className;
    // }

    // private renderLeftImage() {
    //     if (this.imageLeft.length == 0) return null;

    //     if (this.isImgFontAwesome(this.imageLeft))
    //         return (<i className={"img-left fa fa-fw " + this.imageLeft + " " + this.className} aria-hidden="true"></i>)
    //     else if (this.isImgMaterial(this.imageLeft))
    //         return (<i className={"img-left " + this.getMaterialClassName()} >{this.imageLeft}</i>)
    //     else
    //         return undefined;  
    // }

    // private renderRightImages() {
    //     if (this.imageRight.length == 0) return null;
    //     return this.imageRight.map((v, index) => this.renderRightImage(v, index));
    // }

    // private renderRightImage(image: RightImageInfo, i: number) {

    //     const style: any = { 
    //         title: image.toolTip
    //     };

    //     if (this.isImgFontAwesome(image.imageRight))
    //         return (<i key={i} data-img-right={image.imageRight} title={image.toolTip} className={"img-right fa fa-fw " + image.imageRight + " " + this.className} aria-hidden="true" style={style}></i>)
    //     else if (this.isImgMaterial(image.imageRight))
    //         return (<i key={i} data-img-right={image.imageRight} title={image.toolTip} className={"img-right " + this.getMaterialClassName()}>{image.imageRight}</i>)
    //     else
    //         return undefined;
    // }

}

export class RightImageInfo {
    public imageRight: string = "";
    public toolTip: string = "";

    constructor(img: string, toolTip?: string) {
        this.imageRight = img;
        this.toolTip = toolTip || "";
    }
}


// a 'checked' item - indicates a check/unchecked state - by default this toggles and does NOT close the dropdown
export class OptionItem extends ActionItem {
    public isChecked: boolean = false;      // 
    public groupBy: string = "";

    constructor(key: string, text: string, groupBy: string = "", isChecked: boolean = false) {
        super(key, text);
        this.isChecked = isChecked;
        this.groupBy = groupBy;
    }

    public toggle() {
        this.isChecked = !this.isChecked;
    }

    public toString() {
        return `*OptionItem* ${this.text} [${this.key}] - ${this.isChecked} [groupBy: ${this.groupBy}]`;
    }

    // public render() {
    //     return (
    //         <div className='dda-dropdown-item' style={ { position: 'relative' } }>
    //             <span className={"img-check " + (this.groupBy.length > 0 ? ' option ' : '') + (this.isChecked ? ' checked ' : '')}></span>
    //             <span className='flex has-img' ref={(el) => { this.setTitle(el, this.text); }}>{this.text}</span>
    //         </div>
    //     )
    // }

    public getStyleImage() {
        return {
            class: ['img-check', (this.groupBy.length > 0 ? ' option ' : ''), (this.isChecked ? ' checked ' : '')],
            //style: { backgroundColor: this.colour, border: '3px solid red' }
        }
    }

    render(h: any) {
        // var myParagraphVNode = h('p', 'hi')
        // return h('div', [
        //     myParagraphVNode
        // ])

        return h('div', { class: ['dda-dropdown-item '] }, 
            [
                h('span', this.getStyleImage() ),
                h('h4', { class: ['flex has-img '] }, this.text)
            ]
        )
    }
}
