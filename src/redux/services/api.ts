import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import getApiBaseUrl from '../../utils/getApiBaseUrl';
import {
  AddEditCustomerFormFields,
  Apartment,
  ApartmentInstallment,
  ApartmentReservationWithInstallments,
  Customer,
  CustomerListItem,
  Project,
  ProjectInstallment,
  ReservationAddFormData,
  ReservationCancelFormData,
  ReservationEditFormData,
} from '../../types';
import type { RootState } from '../store';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: getApiBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json');

      const apiToken = (getState() as RootState).tokens.apiToken;
      if (apiToken) {
        // TODO: enable authorization after getting correct credentials
        // headers.append('authorization', `Bearer ${apiToken}`)
      }

      return headers;
    },
  }),
  tagTypes: ['Customer', 'Project', 'Reservation'],
  endpoints: (builder) => ({
    // GET: Fetch all projects
    getProjects: builder.query<Project[], void>({
      query: () => 'projects/',
    }),

    // GET: Fetch single project by project uuid
    getProjectById: builder.query<Project, string>({
      query: (id) => `projects/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Project', id: arg }],
    }),

    // GET: Fetch apartments for a single project by project uuid
    getApartmentsByProject: builder.query<Apartment[], string>({
      query: (id) => `apartments?project_uuid=${id}`,
    }),

    // POST: Start lottery for a project
    startLotteryForProject: builder.mutation<any, {}>({
      query: (params) => ({
        url: 'execute_lottery_for_project',
        method: 'POST',
        body: params,
      }),
    }),

    // GET: Search for customers with search params
    getCustomers: builder.query<CustomerListItem[], string>({
      query: (params) => `customers?${params}`,
      providesTags: [{ type: 'Customer', id: 'LIST' }],
    }),

    // GET: Fetch single customer's details
    getCustomerById: builder.query<Customer, string>({
      query: (id) => `customers/${id}/`,
      providesTags: (result, error, arg) => [{ type: 'Customer', id: arg }],
    }),

    // POST: Create a new customer
    createCustomer: builder.mutation<Customer, { formData: Partial<AddEditCustomerFormFields> }>({
      query: (params) => {
        return {
          url: `customers/`,
          method: 'POST',
          body: params.formData,
        };
      },
      invalidatesTags: ['Customer'],
    }),

    // PUT: Update customer details
    updateCustomerById: builder.mutation<Customer, { formData: Partial<AddEditCustomerFormFields>; id: string }>({
      query: (params) => {
        return {
          url: `customers/${params.id}/`,
          method: 'PUT',
          body: params.formData,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Customer', id: arg.id }],
    }),

    // GET: Fetch saved installments for a project
    getProjectInstallments: builder.query<ProjectInstallment[], string>({
      query: (id) => `projects/${id}/installment_templates`,
    }),

    // POST: Set project installments
    setProjectInstallments: builder.mutation<any, { formData: Partial<ProjectInstallment>[]; uuid: string }>({
      query: (params) => {
        return {
          url: `projects/${params.uuid}/installment_templates/`,
          method: 'POST',
          body: params.formData,
        };
      },
    }),

    // GET: Fetch single apartment reservation that includes installments
    getApartmentReservation: builder.query<ApartmentReservationWithInstallments, number>({
      query: (id) => `apartment_reservations/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Reservation', id: arg }],
    }),

    // POST: Create new apartment reservation
    createApartmentReservation: builder.mutation<any, { formData: ReservationAddFormData; projectId: string }>({
      query: (params) => {
        return {
          url: `apartment_reservations/`,
          method: 'POST',
          body: params.formData,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Project', id: arg.projectId },
        { type: 'Customer', id: arg.formData.customer_id },
      ],
    }),

    // POST: Set apartment reservation state
    setApartmentReservationState: builder.mutation<
      any,
      { formData: ReservationEditFormData; reservationId: number; projectId: string }
    >({
      query: (params) => {
        return {
          url: `apartment_reservations/${params.reservationId}/set_state/`,
          method: 'POST',
          body: params.formData,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Project', id: arg.projectId },
        { type: 'Reservation', id: arg.reservationId },
      ],
    }),

    // POST: Cancel apartment reservation
    cancelApartmentReservation: builder.mutation<
      any,
      { formData: ReservationCancelFormData; reservationId: number; projectId: string }
    >({
      query: (params) => {
        return {
          url: `apartment_reservations/${params.reservationId}/cancel/`,
          method: 'POST',
          body: params.formData,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Project', id: arg.projectId },
        { type: 'Reservation', id: arg.reservationId },
      ],
    }),

    // POST: Set apartment installments for a reservation
    setApartmentInstallments: builder.mutation<any, { formData: Partial<ApartmentInstallment>[]; id: number }>({
      query: (params) => {
        return {
          url: `apartment_reservations/${params.id}/installments/`,
          method: 'POST',
          body: params.formData,
        };
      },
    }),

    // POST: Send apartment installments to SAP
    sendApartmentInstallmentsToSAP: builder.mutation<any, { indexList: number[]; id: number }>({
      query: (params) => {
        const indexes = params.indexList.toString();
        return {
          url: `apartment_reservations/${params.id}/installments/add_to_be_sent_to_sap/?index=${indexes}`,
          method: 'POST',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Reservation', id: arg.id }],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useGetApartmentsByProjectQuery,
  useStartLotteryForProjectMutation,
  useGetProjectInstallmentsQuery,
  useSetProjectInstallmentsMutation,
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerByIdMutation,
  useCreateApartmentReservationMutation,
  useGetApartmentReservationQuery,
  useSetApartmentReservationStateMutation,
  useCancelApartmentReservationMutation,
  useSetApartmentInstallmentsMutation,
  useSendApartmentInstallmentsToSAPMutation,
} = api;
