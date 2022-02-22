import { StateOfSale, InstallmentTypes, InstallmentPercentageSpecifiers } from './enums';

export type AnyObject = Record<string, unknown>;
// eslint-disable-next-line @typescript-eslint/ban-types
export type AnyNonNullishValue = {};
export type AnyValue = AnyNonNullishValue | undefined | null;
export type AnyFunction = (props?: unknown) => unknown;

export type Apartment = {
  _language: string;
  additional_information: string;
  apartment_address: string;
  apartment_holding_type: string;
  apartment_number: string;
  apartment_state_of_sale: string;
  apartment_structure: string;
  apartment_uuid: string;
  application_url: string;
  balcony_description: string;
  bathroom_appliances: string;
  condition: number;
  debt_free_sales_price: number;
  financing_fee: number;
  floor: number;
  floor_max: number;
  has_apartment_sauna: boolean;
  has_balcony: boolean;
  has_terrace: boolean;
  has_yard: boolean;
  housing_company_fee: number;
  kitchen_appliances: string;
  living_area: number;
  loan_share: number;
  maintenance_fee: number;
  nid: number;
  other_fees: number;
  parking_fee: number;
  parking_fee_explanation: string;
  price_m2: number;
  project_id: number;
  reservations: ApartmentReservation[];
  right_of_occupancy_payment: number;
  room_count: number;
  sales_price: number;
  services: string[];
  services_description: string;
  showing_times: string[];
  site_owner: string;
  storage_description: string;
  title: string;
  url: string;
  uuid: string;
  view_description: string;
  water_fee: number;
  water_fee_explanation: string;
};

export type Project = {
  acc_financeofficer: string;
  acc_salesperson: string;
  apartment_count: number;
  apartments: Apartment[];
  application_end_time: string;
  application_start_time: string;
  archived: boolean;
  attachment_urls: string[];
  barred_bank_account: string;
  building_type: string;
  city: string;
  construction_materials: string[];
  constructor: string;
  coordinate_lat: number;
  coordinate_lon: number;
  description?: string;
  district: string;
  energy_class: string;
  estate_agent: string;
  estate_agent_email: string;
  estate_agent_phone: string;
  estimated_completion: string;
  estimated_completion_date: string;
  has_elevator: boolean;
  has_sauna: boolean;
  heating_options: string[];
  holding_type: string;
  housing_company: string;
  housing_manager: string;
  id: number;
  image_urls: string[];
  main_image_url: string;
  manager: string;
  material_choice_dl: string;
  new_development_status: string;
  new_housing: boolean;
  ownership_type: string;
  possession_transfer_date: string;
  postal_code: string;
  premarketing_end_time: string;
  premarketing_start_time: string;
  publication_end_time: string;
  publication_start_time: string;
  published: boolean;
  realty_id: string;
  regular_bank_account: string;
  roof_material: string;
  sanitation: string;
  shareholder_meeting_date: string;
  site_area: number;
  site_renter: string;
  state_of_sale: StateOfSale;
  street_address: string;
  url: string;
  uuid: string;
  virtual_presentation_url: string;
  zoning_info: string;
  zoning_status: string;
};

export type CustomerProfile = {
  city?: string;
  contact_language?: 'en' | 'fi' | 'sv';
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  national_identification_number?: string;
  phone_number: string;
  postal_code?: string;
  street_address?: string;
};

export type Customer = {
  additional_information: string;
  created_at: string;
  has_children?: boolean;
  has_hitas_ownership?: boolean;
  id: number;
  is_age_over_55?: boolean;
  is_right_of_occupancy_housing_changer?: boolean;
  last_contact_date?: string;
  primary_profile: CustomerProfile;
  right_of_residence?: number;
  secondary_profile?: CustomerProfile;
};

export type CustomerListItem = {
  id: number;
  primary_first_name: string;
  primary_last_name: string;
  primary_email: string;
  primary_phone_number: string;
  secondary_first_name?: string;
  secondary_last_name?: string;
};

export type ApartmentInstallment = {
  type: `${InstallmentTypes}`;
  amount?: number;
  account_number: string;
  due_date: string | null;
  reference_number?: string;
};

export type ProjectInstallment = {
  type: `${InstallmentTypes}`;
  amount?: number;
  percentage?: string;
  percentage_specifier?: `${InstallmentPercentageSpecifiers}`;
  account_number: string;
  due_date: string | null;
};

export type ApartmentApplicant = {
  first_name: string;
  last_name: string;
  is_primary_applicant: boolean;
  ssn: string;
};

export type ApartmentReservation = {
  apartment_uuid: Apartment['uuid'];
  applicants: ApartmentApplicant[];
  has_children: boolean;
  id: number;
  lottery_position: number;
  queue_position: number;
  right_of_residence: string;
  state: string;
};
