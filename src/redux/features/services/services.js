import { baseApi } from "../../baseApi/baseApi";

const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all services
    getServices: builder.query({
      query: () => ({
        url: "/api/v1/services",
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    // CREATE service
    createService: builder.mutation({
      query: (data) => ({
        url: "/api/v1/services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),    
    // UPDATE service
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/services/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    // DELETE service
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/api/v1/services/${id}`,  
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation, 
  useDeleteServiceMutation,
} = servicesApi;
