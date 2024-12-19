import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: string;
}

const initialState: CounterState = {
  value: "phone",
};

export const counterSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    nextLeve: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { nextLeve } = counterSlice.actions;

export default counterSlice.reducer;
