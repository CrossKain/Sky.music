import { createSlice } from "@reduxjs/toolkit";
import { TFilterName, TTrack } from "../../../types";
import { trackApi } from "../../API/trackApi";
import { likeApi } from "../../API/likeApi";

type TTracksState = {
  track: null | TTrack;
  playList: TTrack[];
  isShuffle: boolean;
  isPlaying: boolean;
  shufflePlayList: TTrack[];
  filters: { authors: string[]; genres: string[]; order: string };
  filteredTracks: TTrack[];
  initialTracks: TTrack[];
};
const initialState: TTracksState = {
  track: null,
  playList: [],
  isShuffle: false,
  isPlaying: false,
  shufflePlayList: [],
  filters: {
    authors: [],
    genres: [],
    order: "По умолчанию",
  },
  filteredTracks: [],
  initialTracks: [],
};
const tracksSlice = createSlice({
  name: "tracks",
  initialState,

  reducers: {
    setShuffle: (state, action) => {
      state.isShuffle = action.payload;
      console.log(action.payload);
      if (action.payload) {
        const playList = [...state.playList];
        playList.sort(() => Math.random() - 0.5);
        console.log(playList);
        state.shufflePlayList = playList;
      }
    },
    setFilter: (state, action) => {
      const {
        filterName,
        filterValue,
      }: { filterName: TFilterName; filterValue: string } = action.payload;
      if (filterName === "order") {
        state.filters.order = filterValue || state.filters.order;
      } else {
        if (
          state.filters[filterName as TFilterName].includes(
            filterValue.toLowerCase()
          )
        ) {
          state.filters[filterName] = state.filters[filterName].filter(
            (item) => item.toLowerCase() !== filterValue.toLowerCase()
          );
        } else {
          state.filters[filterName].push(filterValue.toLowerCase());
        }
      }
    },
    setSearch: (state, action) => {
      const playList = [...state.initialTracks];
      const { searchValue } = action.payload;
      state.filteredTracks = playList.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.author.toLowerCase().includes(searchValue.toLowerCase())
      );
    },
    setInitialTracks: (state, action) => {
      state.initialTracks = action.payload;
    },
    setNextTrack: (state) => {
      const playList = state.isShuffle ? state.shufflePlayList : state.playList;
      console.log(state.isShuffle);
      console.log(playList);
      const index = playList.findIndex((track) => track.id === state.track?.id);
      const nextIndex = index + 1;
      if (playList[nextIndex]) {
        state.track = playList[nextIndex];
      }
    },
    setPrevTrack: (state) => {
      const playList = state.isShuffle ? state.shufflePlayList : state.playList;
      const index = playList.findIndex((track) => track.id === state.track?.id);
      const prevIndex = index - 1;
      if (playList[prevIndex]) {
        state.track = playList[prevIndex];
      }
    },
    setPlayList: (state, action) => {
      state.playList = action.payload;
    },
    setPlay: (state) => {
      state.isPlaying = true;
    },
    setPause: (state) => {
      state.isPlaying = false;
    },
    setCurrentTrack: (state, action) => {
      state.track = action.payload;
      state.isPlaying = true;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      trackApi.endpoints.getAllTracks.matchFulfilled,
      (state, { payload }) => {
        state.filteredTracks = payload;
        state.initialTracks = payload;
      }
    ),
      builder.addMatcher(
        likeApi.endpoints.setDisLike.matchFulfilled,
        (state, { meta }) => {
          const id = meta.arg.originalArgs.id;
          if (state.track && id === state.track?.id) {
            state.track.liked = false;
          }
        }
      ),
      builder.addMatcher(
        likeApi.endpoints.setLike.matchFulfilled,
        (state, { meta }) => {
          const id = meta.arg.originalArgs.id;
          if (state.track && id === state.track?.id) {
            state.track.liked = true;
          }
        }
      );
  },
});

export const {
  setCurrentTrack,
  setPlay,
  setPause,
  setPlayList,
  setNextTrack,
  setPrevTrack,
  setShuffle,
  setFilter,
  setSearch,
  setInitialTracks,
} = tracksSlice.actions;
export default tracksSlice.reducer;
