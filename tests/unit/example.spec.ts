import { mount, shallowMount } from '@vue/test-utils'
import DropDownMenu from '@/components/DropDownMenu.vue'
//import Banner from '@/components/Banner.vue'
import { DropDownItemBase } from '@/components/DropDownItems'
import { getTestItems } from '@/data';

// describe('Banner.vue', () => {
//   it('renders props.msg when passed', () => {
//     const wrapper = shallowMount(Banner, {
//       propsData: { position: 'bottom' }
//     })
//     expect(wrapper.isVueInstance()).toBeTruthy();
//   })
// })

describe('DropDownMenu.vue', () => {
  var newDiv = document.createElement("div"); 
  it('DropDownMenu exists...', () => {
    const wrapper = shallowMount(DropDownMenu, {
      propsData: { 
        parent: newDiv
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy();
  })
})

describe('DropDownMenu.vue', () => {
  var newDiv = document.createElement("div"); 
  const items : DropDownItemBase[] = getTestItems("logout-simple");
  it('It has constructed the hidden dropdown `dda-container` placeholder', () => {
    const wrapper = shallowMount(DropDownMenu, {
      propsData: { 
        parent: newDiv, 
        items: items,
        direction: 'down-right' 
      }
    })
    expect(wrapper.contains('.dda-container')).toBe(true)
    expect(wrapper.contains('.dda-dropdown-list')).toBe(true)
  })
})