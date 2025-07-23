import { baseApi } from "../../baseApi/baseApi";

const Subscription = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query({
      query: () => ({
        url: "/notification/",
        method: "GET",
      }),
      providesTags:["Subscription"],
      transformResponse: (response) => response?.data,
    }),
    createSubscription : builder.mutation({
     query: (data) => ({
        url:"/subscription/create-subscription-package",
        method: "POST",
        body: data,
     })   
    })
  }),
});

export const {
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation,
} = Subscription;