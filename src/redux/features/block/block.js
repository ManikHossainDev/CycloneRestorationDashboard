import { baseApi } from "../../baseApi/baseApi";

const block = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        blockUser: builder.mutation({
            query: (Id) => ({
                url: `/api/v1/users/blocked/${Id}`,
                method: "POST",
            }),
        }),
        unblockUser: builder.mutation({
            query: (Id) => ({
                url: `/api/v1/users/unblocked/${Id}`,
                method: "POST",
            }),
        }),
    }),
});

export const { useBlockUserMutation, useUnblockUserMutation } = block;
