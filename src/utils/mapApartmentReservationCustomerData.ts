import { ApartmentReservationCustomer, Customer } from '../types';

export const mapApartmentReservationCustomerData = (customer: Customer): ApartmentReservationCustomer => {
  const formattedCustomerData: ApartmentReservationCustomer = {
    id: customer.id,
    primary_profile: {
      first_name: customer.primary_profile.first_name,
      last_name: customer.primary_profile.last_name,
      email: customer.primary_profile.email,
    },
    secondary_profile: undefined,
    is_age_over_55: customer.is_age_over_55,
    is_right_of_occupancy_housing_changer: customer.is_right_of_occupancy_housing_changer,
    has_hitas_ownership: customer.has_hitas_ownership,
  };

  if (customer.secondary_profile) {
    formattedCustomerData.secondary_profile = {
      first_name: customer.secondary_profile.first_name,
      last_name: customer.secondary_profile.last_name,
      email: customer.secondary_profile.email,
    };
  }

  return formattedCustomerData;
};
