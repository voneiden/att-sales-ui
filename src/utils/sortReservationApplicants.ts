import { ApartmentReservationWithCustomer } from '../types';

// Sort primary applicants in the apartment reservation to be shown first
const sortReservationApplicants = (applicants: ApartmentReservationWithCustomer['applicants']) => {
  const sortedApplicants = [...applicants];

  if (sortedApplicants.length > 1) {
    sortedApplicants.sort((a, b) => {
      return a.is_primary_applicant < b.is_primary_applicant
        ? 1
        : a.is_primary_applicant > b.is_primary_applicant
        ? -1
        : 0;
    });
  }

  return sortedApplicants;
};

export default sortReservationApplicants;
