import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
export interface CounterState {
  value: boolean;
}

const isAuthenticated = () => {
  return Cookies.get("token") !== undefined;
};
const initialState: CounterState = {
  value: isAuthenticated(),
};
export const counterSlice = createSlice({
  name: "isAuthenticated",
  initialState,
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
      Cookies.remove("token");
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout } = counterSlice.actions;

export default counterSlice.reducer;
