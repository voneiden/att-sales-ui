import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Project } from '../../types';
import getApiBaseUrl from '../../utils/getApiBaseUrl';

// Define a service using a base URL and expected endpoints
export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl: getApiBaseUrl() }),
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => 'projects',
    }),
    getProjectById: builder.query<Project, string>({
      query: (id) => `projects/${id}`,
    }),
  }),
});

export const { useGetProjectsQuery, useGetProjectByIdQuery } = projectApi;
