import { combineReducers, configureStore } from "@reduxjs/toolkit"
import AuthSlice from "./features/auth/AuthSlice"
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import tracksSlice from "./features/tracks/tracksSlice";
import { authApi } from "./API/authApi";

export const makeStore = () => {
    return configureStore({
        reducer: combineReducers({
            auth: AuthSlice,
            tracks: tracksSlice,
            [authApi.reducerPath]: authApi.reducer
        }),
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
    })
}


export type AppStore = ReturnType<typeof makeStore>;


export type RootState = ReturnType<AppStore["getState"]>;


export type AppDispatch = AppStore["dispatch"];


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;