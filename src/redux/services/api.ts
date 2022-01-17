import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import getApiBaseUrl from '../../utils/getApiBaseUrl';
import { Apartment, Project } from '../../types';
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
    getProjects: builder.query<Project[], void>({
      query: () => 'projects/',
    }),
    getProjectById: builder.query<Project, string>({
      query: (id) => `projects/${id}`,
    }),
    getApartmentsByProject: builder.query<Apartment[], string>({
      query: (id) => `apartments?project_uuid=${id}`,
    }),
    startLotteryForProject: builder.mutation<any, {}>({
      query: (params) => ({
        url: 'execute_lottery_for_project',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useGetApartmentsByProjectQuery,
  useStartLotteryForProjectMutation,
} = api;
