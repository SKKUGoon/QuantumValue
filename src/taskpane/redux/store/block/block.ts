/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";

export interface BlockState {
  debugMode: boolean;
  blocks: string[]; // Replace `string` with original type
}

const blockInit: BlockState = {
  debugMode: false,
  blocks: [],
};

const blockSlice = createSlice({
  name: "blocks",
  initialState: blockInit,
  reducers: {
    // State management
    toggleDebug: (state) => {
      state.debugMode = !state.debugMode;
    },
    debug: (state) => {
      console.log({ ...state });
    },
  },
});

export const blockSliceAction = blockSlice.actions;
