import { baseApi } from "../../baseApi/baseApi";
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/verify-email`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    fetchDashboardData: builder.mutation({
      query: ({ token }) => {
        console.log("Hello, token is:", token); 
        return {
          url: "/admin/v2/get-dashboard-data",
          method: "GET",
          headers: {
            Authorization: token, 
          },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useFetchDashboardDataMutation,
} = authApi;
