import { baseApi } from "../../baseApi/baseApi";

const Status = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalAdminStatus: builder.query({
      query: () => ({
        url: "/api/v1/admin/totalStatus",
        method: "GET",
      }),
    }),
    getRatio: builder.query({
      query: (year) => ({
        url: `/api/v1/admin/income-ratio?year=${year}`,
        method: "GET",
      }),
    }),
    managerStatus: builder.query({
      query: () => ({
        url: "/api/v1/admin/manager/totalStatus",
        method: "GET",
      })
    })
  }),
});

export const { 
  useGetTotalAdminStatusQuery, 
  useGetRatioQuery,
  useManagerStatusQuery, 
} = Status;
