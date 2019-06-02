import { mount, shallowMount } from '@vue/test-utils'
import  DropDownMenu from '@/components/DropDownMenu.vue'
import { DropDownItemBase, ActionItem, SeperatorItem } from '@/components/DropDownItems'
import { getTestItems } from '@/data';
import Vue from 'vue';

describe('DropDownMenu.vue', () => {
  
  var divParent = document.createElement("div"); 
  const items : DropDownItemBase[] = [];  // = getTestItems("simple");    // showcase
  items.push(new ActionItem("A", "Holiday in France", "", true));
  items.push(new SeperatorItem());
  items.push(new ActionItem("B", "Go to California "));
  items.push(new ActionItem("C", "Visit the United Kingdom"));

  let onClick = (info: any) => {
    console.log("The test clicked: " + info.text);
  };

  const wrapper = shallowMount(DropDownMenu, {
    propsData: { 
      parent: divParent,
      items: items,
      direction: 'down-right',
      click: onClick
    }
  })

  it('DropDownMenu exists...', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  })

  it('It has constructed the hidden dropdown `dda-container` placeholder', () => {
    expect(wrapper.contains('.dda-container')).toBe(true)
    expect(wrapper.contains('.dda-dropdown-list')).toBe(true)
  })

  it('button click (with simple context) should show 3 dropdown items', () => {
    divParent.click();
    expect(wrapper.findAll('.dda-dropdown-item').length).toBe(3)
  })

  it('whilst the dropdown is visible lets add another item and make sure it is there', () => {
    items.push(new ActionItem("TEST", "added this test item"));
    expect(wrapper.findAll('.dda-dropdown-item').length).toBe(4)
  })

  it('button click should collapse the dropdown', () => {
    divParent.click();
    expect(wrapper.findAll('.dda-dropdown-item').length).toBe(0)
  })

  it('dropdown item click should collapse the dropdown', () => {
    divParent.click();  // to open the dropdown (to populate it)
    expect(wrapper.findAll('.dda-dropdown-item').length).toBe(4)
    expect(wrapper.find('.dda-dropdown-item')).toBeDefined();
    
    let xx = wrapper.find('.dda-dropdown-item');
    console.log(xx.html());

    xx.trigger('click');

    expect(wrapper.findAll('.dda-dropdown-item').length).toBe(0)


    // setTimeout(() => {
    //   console.log("ending....");
    //   expect(wrapper.findAll('.dda-dropdown-item').length).toBe(0)  
    // }, 500);
    //console.log(wrapper.find('.dda-dropdown-item'))
    
    //wrapper.find('.dda-dropdown-item').trigger('click');
    //expect(wrapper.findAll('.dda-dropdown-item').length).toBe(0)
    

  })

  // wrapper.find('button').trigger('click')
  //expect(wrapper.find("span").isVisible()).toBe(true)
  //expect(wrapper.find(Child).exists()).toBe(false)
  //expect(wrapper.find({ name: "Child" }).exists()).toBe(true)
  //expect(wrapper.findAll(Child).length).toBe(3)



})

