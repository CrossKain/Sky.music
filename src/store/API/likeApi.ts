import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    }),
    setDisLike: builder.mutation({
      query: ({ id }) => ({ url: `${id}/favorite/`, method: "DELETE" }),
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
export const { useSetLikeMutation, useSetDisLikeMutation } = likeApi;
