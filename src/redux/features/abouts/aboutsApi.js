import { baseApi } from "../../baseApi/baseApi";

const aboutsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    UpdateAbouts: builder.mutation({
      query: (data) => ({
        url: "/api/v1/info/about-us",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["settings"],
    }),
    getAllAbouts: builder.query({
      query: () => ({
        url: "/api/v1/info/about-us",
        method: "GET",
      }),
      providesTags:["settings"],
    }),
  }),
});

export const {
  useUpdateAboutsMutation,
  useGetAllAboutsQuery,
} = aboutsApi;