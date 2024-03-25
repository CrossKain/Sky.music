import { createSlice } from "@reduxjs/toolkit";
type TAuthState = {
    isAuth: boolean;
  }
const initialState: TAuthState = {isAuth: false}
const authSlice = createSlice({
    name: "auth",
   initialState,
   reducers: {
    setAuth: (state, action)=>{
        state.isAuth=action.payload;
    }   }
})

export const {setAuth} = authSlice.actions;
export default authSlice.reducer;

