import { combineReducers, configureStore } from "@reduxjs/toolkit"
import AuthSlice from "./features/auth/AuthSlice"
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import tracksSlice from "./features/tracks/tracksSlice";

export const makeStore = () => {
    return configureStore({
        reducer: combineReducers({
            auth: AuthSlice,
            tracks: tracksSlice,
        })
    })
}


export type AppStore = ReturnType<typeof makeStore>;


export type RootState = ReturnType<AppStore["getState"]>;


export type AppDispatch = AppStore["dispatch"];


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;