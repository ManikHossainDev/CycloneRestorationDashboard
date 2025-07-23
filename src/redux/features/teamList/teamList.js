import { baseApi } from "../../baseApi/baseApi";
const teamList = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeams: builder.query({
     query: () => ({
        url: '/team/get-team-list',
        method: 'GET',
      }),
      transformResponse: (response) => response.data,
    }),
    getSingleTeam: builder.query({
     query: (id) => ({
        url: `/team/get-team-details?id=${id}`, 
        method: 'GET',
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllTeamsQuery, useGetSingleTeamQuery } = teamList;