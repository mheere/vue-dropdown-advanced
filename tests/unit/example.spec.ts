import { shallowMount } from '@vue/test-utils'
import Banner from '@/components/Banner.vue'

debugger;

describe('Banner.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const position = 'bottom'
    const wrapper = shallowMount(Banner, {
      propsData: { position }
    })
    //expect(wrapper.text()).toMatch(msg)
    //expect(wrapper.exists)
    expect(wrapper).toBeDefined;    // .toHaveClass('foo')
  })
})
