import { build } from "vite";
import { baseApi } from "../../baseApi/baseApi";

const Subscription = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteSubscription: build.mutation({
      query: (id) => ({
        url: `/subscription/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription"],
    }),
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
  }),
});

export const { useGetSubscriptionQuery, useCreateSubscriptionMutation } =
  Subscription;
