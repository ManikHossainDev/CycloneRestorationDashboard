import { baseApi } from "../../baseApi/baseApi";
const Subscription = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query({
      query: () => ({
        url: "/subscription/get-subscription-packages",
        method: "GET",
      }),
      providesTags: ["Subscription"],
      transformResponse: (response) => response?.data,
    }),
    createSubscription: builder.mutation({
      query: (data) => ({
        url: "/subscription/create-subscription-package",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/subscription/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription"],
    }),
    singleSubscription: builder.query({
      query: (id) => ({
        url: `/subscription/${id}`,
        method: "GET",
      }),
    }),
    updateSubscription: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subscription/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
} = Subscription;
