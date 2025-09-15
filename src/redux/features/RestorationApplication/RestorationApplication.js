import { baseApi } from "../../baseApi/baseApi";

const RestorationApplication = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRestorationApplication: builder.mutation({
      query: (data) => ({
        url: "/api/v1/applications",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["RestorationApplication"],
    }),
    UpdateRestorationApplication: builder.mutation({
      query: (data) => ({
        url: "/api/v1/users/self/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["RestorationApplication"],
    }),
    deleteRestorationApplication: builder.mutation({
      query: (id) => ({
        url: `/general-info/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RestorationApplication"],
    }),
    getRestorationApplication: builder.query({
      query: () => ({
        url: "/api/v1/applications/list",
        method: "GET",
      }),
      providesTags: ["RestorationApplication"],
    }),
    singleRestorationApplication: builder.query({
      query: (id) => ({
        url: `/api/v1/applications/${id}`,
        method: "GET",
      }),
    }),
    getContactor: builder.query({
      query: (id) => ({
        url: `/api/v1/users/contactor/zone/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateRestorationApplicationMutation,
  useUpdateRestorationApplicationMutation,
  useDeleteRestorationApplicationMutation,
  useGetRestorationApplicationQuery,
  useSingleRestorationApplicationQuery,
  useGetContactorQuery
} = RestorationApplication;
