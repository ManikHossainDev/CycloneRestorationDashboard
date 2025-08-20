import { get } from "react-hook-form";
import { baseApi } from "../../baseApi/baseApi";

const Manager = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createManager: builder.mutation({
      query: (data) => ({
        url: "/api/v1/admin/create-manager",
        method: "POST",
        body: data,
      }),
    }),
    getManagers: builder.query({
      query: () => ({
        url: "/api/v1/users/list?role=manager",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useCreateManagerMutation, useGetManagersQuery } = Manager;
