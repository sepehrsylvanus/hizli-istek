import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: boolean;
}

const initialState: CounterState = {
  value: false,
};

export const counterSlice = createSlice({
  name: "openAuth",
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
      console.log(state.value);
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = counterSlice.actions;

export default counterSlice.reducer;
