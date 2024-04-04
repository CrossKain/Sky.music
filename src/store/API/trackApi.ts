import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TTrack } from "../../types";

export const trackApi = createApi({
  reducerPath: "trackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://skypro-music-api.skyeng.tech/catalog/track/",
  }),
  endpoints: (builder) => ({
    getAllTracks: builder.query<TTrack[], void>({
      query: () => "/all/",
      transformResponse: (response) => {
        const user = getUser();
        let id = user ? user.id : null;

        return response.map((track) => {
          const isLiked = track.stared_user.find((el) => el.id === id);
          if (isLiked) {
            return { ...track, liked: true };
          } else {
            return { ...track, liked: false };
          }
        });
      },
    }),
  }),
});
function getUser() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "");
    return user;
  } catch (error) {
    return null;
  }
}
export const { useGetAllTracksQuery } = trackApi;
