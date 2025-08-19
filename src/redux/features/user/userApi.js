import { baseApi } from "../../baseApi/baseApi";
const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
     query: () => ({
        url: '/api/v1/users/list?role=member', 
        method: 'GET',
      }),
      transformResponse: (response) => response.data,
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/api/v1/users/details/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data, 
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
