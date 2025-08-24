import { baseApi } from "../../baseApi/baseApi";

const PrivacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updatePrivacyPolicy: builder.mutation({
      query: (content) => ({
        url: "/api/v1/info/privacy-policy",
        method: "POST",
        body: content,
      }),
      invalidatesTags: ["settings"],
    }),
    getAllPrivacyPolicy: builder.query({
      query: () => ({
        url: "/api/v1/info/privacy-policy",
        method: "GET",
      }),
      providesTags:["settings"],
    }),
  }),
});

export const {
  useGetAllPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation
} = PrivacyPolicyApi;