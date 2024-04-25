import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../../types";
type TAuthState = {
  isAuth: boolean;
  user: TUser;
};
function checkLs(key: string) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch (error) {
    return false;
  }
}
const initialState: TAuthState = {
  isAuth: !!checkLs("user"),
  user: checkLs("user"),
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;

    },
    setUser: (state, action) => {
        state.user = action.payload;
    }
  },
});

export const { setAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
