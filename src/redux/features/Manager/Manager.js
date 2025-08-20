import { baseApi } from "../../baseApi/baseApi";

const Manager = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createManager: builder.mutation({
            query: (data) => ({
                url: "/managers",
                method: "POST",
                body: data,
            }),
        }),
    }),
})

export const { useCreateManagerMutation } = Manager;