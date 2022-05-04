export enum ROUTES {
  AUTH_ERROR = 'auth-error',
  CUSTOMERS = 'customers',
  ADD_CUSTOMER = 'customers/add',
  EDIT_CUSTOMER = 'customers/edit',
  INDEX = '/',
  LOGIN = 'login',
  LOGOUT = 'logout',
  NOT_FOUND = '404',
  PROJECTS = 'projects',
}

export enum StateOfSale {
  ForSale = 'FOR_SALE',
  PreMarketing = 'PRE_MARKETING',
  Processing = 'PROCESSING',
  Ready = 'READY',
  Upcoming = 'UPCOMING',
}

export enum InstallmentTypes {
  Payment1 = 'PAYMENT_1',
  Payment2 = 'PAYMENT_2',
  Payment3 = 'PAYMENT_3',
  Payment4 = 'PAYMENT_4',
  Payment5 = 'PAYMENT_5',
  Payment6 = 'PAYMENT_6',
  Payment7 = 'PAYMENT_7',
  Refund = 'REFUND',
  DownPayment = 'DOWN_PAYMENT',
  LatePaymentInterest = 'LATE_PAYMENT_INTEREST',
  RightOfOccupancyPayment = 'RIGHT_OF_OCCUPANCY_PAYMENT',
  ForInvoicing = 'FOR_INVOICING',
  Deposit = 'DEPOSIT',
  ReservationFee = 'RESERVATION_FEE',
}

export enum InstallmentPercentageSpecifiers {
  SalesPrice = 'SALES_PRICE',
  DebtFreeSalesPrice = 'DEBT_FREE_SALES_PRICE',
  DebtFreeSalesPriceFlexible = 'DEBT_FREE_SALES_PRICE_FLEXIBLE',
}

export enum ApartmentReservationStates {
  ACCEPTED_BY_MUNICIPALITY = 'accepted_by_municipality',
  CANCELED = 'canceled',
  OFFERED = 'offered',
  OFFER_ACCPTED = 'offer_accepted',
  OFFER_EXPIRED = 'offer_expired',
  RESERVATION_AGREEMENT = 'reservation_agreement',
  RESERVED = 'reserved',
  REVIEW = 'review',
  SOLD = 'sold',
  SUBMITTED = 'submitted',
}

// TODO: Re-define these after API is ready
export enum ReservationCancelReasons {
  RESERVATION_AGREEMENT_CANCELED = 'reservation_agreement_canceled',
  RESERVATION_CANCELED = 'reservation_canceled',
  TERMINATED = 'terminated',
  TRANSFERRED = 'transferred',
}
