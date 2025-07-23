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
    getSingleUser: builder.query({
     query: (id) => ({
        url: `/user/get-user-details?id=${id}`, 
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

export const { useGetAllUsersQuery, useGetSingleUserQuery, useGetRecentUserQuery } = userApi;
