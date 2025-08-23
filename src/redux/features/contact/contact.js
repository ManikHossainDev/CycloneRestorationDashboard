import { baseApi } from "../../baseApi/baseApi";

const contact = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getContact: builder.query({
            query: () => ({
                url: "/api/v1/contact",
                method: "GET",
            }),
            providesTags: ["Contact"],
        }),
        createContact: builder.mutation({
            query: (data) => ({
                url: "/api/v1/contact",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Contact"],
        }),
    }),
});

export const { useGetContactQuery, useCreateContactMutation } = contact;
