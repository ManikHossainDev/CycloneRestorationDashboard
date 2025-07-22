import { baseApi } from "../../baseApi/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
     query: () => ({
        url: '/user/get-user-list', 
        method: 'GET',
      }),
      transformResponse: (response) => response.data,
    }),
    getEventManager: builder.query({
     query: () => ({
        url: '/auth/eventManager', 
        method: 'GET',
      }),
      transformResponse: (response) => response.data,
    }),
    getRecentUser: builder.query({
     query: () => ({
        url: '/auth/recentUser', 
        method: 'GET',
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllUsersQuery, useGetEventManagerQuery, useGetRecentUserQuery } = userApi;
