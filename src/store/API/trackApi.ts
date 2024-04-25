import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TTrack } from "../../types";


export const trackApi = createApi({
  reducerPath: "trackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://skypro-music-api.skyeng.tech/catalog/",
  }),
  endpoints: (builder) => ({
    getAllTracks: builder.query<TTrack[], void>({
      query: () => "track/all/",
      providesTags: (result: TTrack[])=> result ? [...result.map(item => ({type: "track", id: item.id}))] : ["track"],
      transformResponse: (response: TTrack[]) => {
        
        const user = getUser();
        let id = user ? user.id : null;

        return response.map((track) => {
          const isLiked = track.stared_user?.find((el) => el.id === id);
          if (isLiked) {
            return { ...track, liked: true };
          } else {
            return { ...track, liked: false };
          }
        });
      },
    }),
    getCategoryTracks: builder.query<{ tracks: TTrack[]; name: string }, { id: string }>({
      query: ({ id }) => `selection/${id}`,
      transformResponse: (response: { items: TTrack[]; name: string }) => {
        const user = getUser();
        let id = user ? user.id : null;

        const tracks = response.items.map((track) => {
          const isLiked = track.stared_user?.find((el) => el.id === id);
          if (isLiked) {
            return { ...track, liked: true };
          } else {
            return { ...track, liked: false };
          }
        });
        return { tracks, name: response.name };
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
export const { useGetAllTracksQuery, useGetCategoryTracksQuery } = trackApi;
