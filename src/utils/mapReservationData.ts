import { Apartment, CustomerReservation, Project } from '../types';

export const groupReservationsByProject = (reservations: CustomerReservation[]) => {
  if (!reservations || !reservations.length) return [];

  // Use project_uuid to group each reservation under one project
  const reservationsByProjectUUID = (): any[] => {
    const grouped = reservations.reduce((r: any, reservation: CustomerReservation) => {
      r[reservation.project_uuid] = r[reservation.project_uuid] || [];
      r[reservation.project_uuid].push(reservation);
      return r;
    }, {});

    return Object.values(grouped);
  };

  const reservationsByProject: CustomerReservation[][] = reservationsByProjectUUID();

  return reservationsByProject;
};

export const getReservationProjectData = (reservation: CustomerReservation) => {
  const projectData = {
    district: reservation.project_district,
    housing_company: reservation.project_housing_company,
    ownership_type: reservation.project_ownership_type,
    street_address: reservation.project_street_address,
    uuid: reservation.project_uuid,
  } as Project;

  return projectData;
};

export const getReservationApartmentData = (reservation: CustomerReservation) => {
  const apartmentData = {
    apartment_number: reservation.apartment_number,
    apartment_structure: reservation.apartment_structure,
    debt_free_sales_price: reservation.apartment_debt_free_sales_price,
    living_area: reservation.apartment_living_area,
    right_of_occupancy_payment: reservation.apartment_right_of_occupancy_payment,
    sales_price: reservation.apartment_sales_price,
    uuid: reservation.apartment_uuid,
  } as Apartment;

  return apartmentData;
};
