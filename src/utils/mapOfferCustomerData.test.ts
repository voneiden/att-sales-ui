import { getOfferCustomerData } from './mapOfferCustomerData';

import mockCustomer from '../mocks/customer.json';

const customerWithTwoProfiles = mockCustomer;
const customerWithoutSecondaryProfile = { ...mockCustomer, secondary_profile: null };

const targetDataWithSecondaryProfile = {
  id: customerWithTwoProfiles.id,
  primary_profile: {
    first_name: customerWithTwoProfiles.primary_profile.first_name,
    last_name: customerWithTwoProfiles.primary_profile.last_name,
    email: customerWithTwoProfiles.primary_profile.email,
  },
  secondary_profile: {
    first_name: customerWithTwoProfiles.secondary_profile.first_name,
    last_name: customerWithTwoProfiles.secondary_profile.last_name,
    email: customerWithTwoProfiles.secondary_profile.email,
  },
  is_age_over_55: customerWithTwoProfiles.is_age_over_55,
  is_right_of_occupancy_housing_changer: customerWithTwoProfiles.is_right_of_occupancy_housing_changer,
  has_hitas_ownership: customerWithTwoProfiles.has_hitas_ownership,
};

const targetDataWithoutSecondaryProfile = {
  id: customerWithoutSecondaryProfile.id,
  primary_profile: {
    first_name: customerWithoutSecondaryProfile.primary_profile.first_name,
    last_name: customerWithoutSecondaryProfile.primary_profile.last_name,
    email: customerWithoutSecondaryProfile.primary_profile.email,
  },
  secondary_profile: undefined,
  is_age_over_55: customerWithoutSecondaryProfile.is_age_over_55,
  is_right_of_occupancy_housing_changer: customerWithoutSecondaryProfile.is_right_of_occupancy_housing_changer,
  has_hitas_ownership: customerWithoutSecondaryProfile.has_hitas_ownership,
};

describe('mapOfferCustomerData', () => {
  it('maps data with secondary profile', () => {
    const mappedData = getOfferCustomerData(customerWithTwoProfiles);

    expect(mappedData).toMatchObject(targetDataWithSecondaryProfile);
  });

  it('maps data without secondary profile', () => {
    const mappedData = getOfferCustomerData(customerWithoutSecondaryProfile);

    expect(mappedData).toMatchObject(targetDataWithoutSecondaryProfile);
  });
});
