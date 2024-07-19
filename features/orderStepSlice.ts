import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number[] = [0];

export const counterSlice = createSlice({
  name: "orderStep",
  initialState,
  reducers: {
    nextLeve: (state) => {
      state.push(state[state.length - 1] + 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { nextLeve } = counterSlice.actions;

export default counterSlice.reducer;
