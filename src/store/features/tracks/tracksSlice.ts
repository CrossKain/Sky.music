import { createSlice } from "@reduxjs/toolkit";
import { TTrack } from "../../../types";

type TTracksState = {
    track: null | TTrack,
    playList: TTrack[]
    isShuffle: boolean,
    isPlaying: boolean,
    shufflePlayList: TTrack[]
}
const initialState:  TTracksState = {
    track: null,
    playList: [],
    isShuffle: false,
    isPlaying: false,
    shufflePlayList: []
}
const tracksSlice = createSlice({
    name: 'tracks',
    initialState,

    reducers: {
        setShuffle:(state, action) => {
        state.isShuffle = action.payload
        console.log(action.payload)
            if (action.payload){
                const playList = [...state.playList]
                playList.sort(()=> Math.random()-0.5);
                console.log(playList)
                    state.shufflePlayList = playList
            }
    },
    setNextTrack:(state) => {
        const playList = state.isShuffle ? state.shufflePlayList : state.playList;
        console.log(state.isShuffle)
        console.log(playList)
        const index = playList.findIndex((track) => track.id === state.track?.id)
        const nextIndex = index+1
        if(playList[nextIndex]){
            state.track = playList[nextIndex]
    }},
    setPrevTrack:(state) => {
        const playList = state.isShuffle ? state.shufflePlayList : state.playList;
        const index = playList.findIndex((track) => track.id === state.track?.id)
        const prevIndex = index-1
        if(playList[prevIndex]){
            state.track = playList[prevIndex]
    }},
    setPlayList: (state, action) => {
        state.playList = action.payload;
    }    ,
    setPlay:(state) => {
        state.isPlaying = true
    },
    setPause: (state) => {
        state.isPlaying = false
    },
    setCurrentTrack:(state, action )=> {
        state.track = action.payload;
        state.isPlaying = true;
        
    }       
}})


export const {setCurrentTrack, setPlay, setPause, setPlayList, setNextTrack, setPrevTrack, setShuffle} = tracksSlice.actions;
export default tracksSlice.reducer;