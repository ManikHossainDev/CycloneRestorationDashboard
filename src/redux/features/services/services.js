import { baseApi } from "../../baseApi/baseApi";

const services = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query({
            url: "/api/v1/services",
            method: "GET",
        })
    })
})

export const { useGetServicesQuery } = services;