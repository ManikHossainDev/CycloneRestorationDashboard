import { baseApi } from "../../baseApi/baseApi";

const TermsConditionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    UpdateTermCondition: builder.mutation({
      query: (data) => ({
        url: "/api/v1/info/terms-condition",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["settings"]
    }),
    
    getAllTermCondition: builder.query({
      query: () => ({
        url: "/api/v1/info/terms-condition",
        method: "GET",
      }),
      providesTags:["settings"],
    }),
  }),
});

export const {
  useUpdateTermConditionMutation,
  useGetAllTermConditionQuery
} = TermsConditionsApi;
