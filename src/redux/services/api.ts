import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import getApiBaseUrl from '../../utils/getApiBaseUrl';
import { Apartment, Project } from '../../types';
// import type { RootState } from '../store';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: getApiBaseUrl(),
    mode: process.env.NODE_ENV === 'development' ? 'no-cors' : 'cors',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json');
      // TODO: Send access token in the query
      // const accessToken = (getState() as RootState).apiTokens.accessToken;
      // if (accessToken) {
      //   headers.append('authorization', `Bearer ${accessToken}`)
      // }
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
  }),
});

export const { useGetProjectsQuery, useGetProjectByIdQuery, useGetApartmentsByProjectQuery } = api;
