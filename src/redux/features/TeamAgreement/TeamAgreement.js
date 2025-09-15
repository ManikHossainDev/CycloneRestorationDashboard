import { baseApi } from "../../baseApi/baseApi";
const TeamAgreement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateTeamAgreement: builder.mutation({
      query: (content) => ({
        url: "/api/v1/info/team-agreement",
        method: "POST",
        body: content,
      }),
      invalidatesTags: ["agreement"],
    }),
    getAllTeamAgreement: builder.query({
      query: () => ({
        url: "/api/v1/info/team-agreement",
        method: "GET",
      }),
      providesTags:["agreement"],
    }),
  }),
});

export const {
  useGetAllTeamAgreementQuery,
  useUpdateTeamAgreementMutation
} = TeamAgreement;