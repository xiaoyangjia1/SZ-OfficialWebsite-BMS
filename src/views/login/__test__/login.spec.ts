import login from "@/views/login/index.vue";
import { mount } from '@vue/test-utils'
describe('test loginSFC', () => {
  it("should render slot", () => {
      const wrapper = mount(login, {
          
      })

      // Assert the rendered text of the component
      expect(wrapper.text()).toContain('Hello world')
  })
})


