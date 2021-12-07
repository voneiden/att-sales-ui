import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Apartment, Project } from '../../types';
import getApiBaseUrl from '../../utils/getApiBaseUrl';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: getApiBaseUrl() }),
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => 'projects',
    }),
    getProjectById: builder.query<Project, string>({
      query: (id) => `projects/${id}`,
    }),
    getApartmentsByProject: builder.query<Apartment[], string>({
      query: (id) => `apartments?project_id=${id}`,
    }),
  }),
});

export const { useGetProjectsQuery, useGetProjectByIdQuery, useGetApartmentsByProjectQuery } = api;
