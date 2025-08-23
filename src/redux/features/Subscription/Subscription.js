import { baseApi } from "../../baseApi/baseApi";
const Subscription = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query({
      query: () => ({
        url: "/api/v1/subscriptions",
        method: "GET",
      }),
      providesTags: ["Subscription"],
      transformResponse: (response) => response?.data,
    }),
    createSubscription: builder.mutation({
      query: (data) => ({
        url: "/api/v1/subscriptions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/api/v1/subscriptions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription"],
    }),
    singleSubscription: builder.query({
      query: (id) => ({
        url: `/api/v1/subscriptions/${id}`,
        method: "GET",
      }),
    }),
    updateSubscription: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/api/v1/subscriptions/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Subscription"],
    }),
    getStripeProducts: builder.query({
      query: () => ({
        url: "/api/v1/subscriptions/stripe-products",
        method: "GET",
      }),
      providesTags: ["Subscription"],
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
  useGetStripeProductsQuery,
} = Subscription;
