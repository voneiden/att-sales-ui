import MainLayout from './MainLayout';
import { shallow } from 'enzyme';

describe('MainLayout', () => {
  it('renders MainLayout component', () => {
    const wrapper = shallow(<MainLayout />);
    expect(wrapper.find('#mainContent')).toHaveLength(1);
  });
});
