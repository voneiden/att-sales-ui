import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';

import ProjectName from '../../components/project/ProjectName';
import Installments from './Installments';
import mockCustomer from '../../mocks/customer.json';

describe('Installments', () => {
  it('renders the component', () => {
    const wrapper = shallow(<Installments customer={mockCustomer} />);
    expect(wrapper.find(ProjectName)).toHaveLength(2);
  });

  it('renders empty reservations message', () => {
    const mockCustomerNoReservations = { ...mockCustomer, apartment_reservations: [] };
    render(<Installments customer={mockCustomerNoReservations} />);
    expect(screen.getByText('components.installments.Installments.noReservations')).toBeDefined();
  });
});
