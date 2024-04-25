import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TTrack } from "../../types";

export const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://skypro-music-api.skyeng.tech/catalog/track/",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.append("Authorization", "Bearer " + token.access);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    setLike: builder.mutation({
      query: ({ id }) => ({ url: `${id}/favorite/`, method: "POST" }),
      invalidatesTags: (result) => [{ type: "favoriteTrack", id: result.id }],
    }),
    setDisLike: builder.mutation({
      query: ({ id }) => ({ url: `${id}/favorite/`, method: "DELETE" }),
      invalidatesTags: (result) => [{ type: "favoriteTrack", id: result.id }],
    }),
    getFavoriteTracks: builder.query<TTrack[], void>({
      query: () => `/favorite/all`,
      providesTags: (result: TTrack[]) =>
        result
          ? [...result.map((item) => ({ type: "favoriteTrack", id: item.id }))]
          : ["favoriteTrack"],
      transformResponse: (response: TTrack[]) => {
        const tracks = response.map((track) => {
          return { ...track, liked: true };
        });
        return tracks;
      },
    }),
  }),
});

function getToken() {
  try {
    const token = JSON.parse(localStorage.getItem("token") || "");
    return token;
  } catch (error) {
    return null;
  }
}
export const {
  useSetLikeMutation,
  useSetDisLikeMutation,
  useGetFavoriteTracksQuery,
} = likeApi;
