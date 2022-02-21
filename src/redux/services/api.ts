import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import getApiBaseUrl from '../../utils/getApiBaseUrl';
import { Apartment, Project, ProjectInstallment } from '../../types';
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

  endpoints: (builder) => ({
    // GET: Fetch all projects
    getProjects: builder.query<Project[], void>({
      query: () => 'projects/',
    }),

    // GET: Fetch single project by project uuid
    getProjectById: builder.query<Project, string>({
      query: (id) => `projects/${id}`,
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

    // GET: Fetch saved installments for a project
    getProjectInstallments: builder.query<ProjectInstallment[], string>({
      query: (id) => `projects/${id}/installment_templates`,
    }),

    // POST: Set project installments
    setProjectInstallments: builder.mutation<
      any,
      {
        formData: Partial<ProjectInstallment>[];
        uuid: string;
      }
    >({
      query: (params) => {
        return {
          url: `projects/${params.uuid}/installment_templates/`,
          method: 'POST',
          body: params.formData,
        };
      },
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
} = api;
