export enum ROUTES {
  AUTH_ERROR = 'auth-error',
  CUSTOMERS = 'customers',
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
  RightOResidenceFee = 'RIGHT_OF_RESIDENCE_FEE',
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
  SUBMITTED = 'submitted',
  RESERVED = 'reserved',
  OFFERED = 'offered',
  CANCELED = 'canceled',
  REVIEW = 'review',
}
