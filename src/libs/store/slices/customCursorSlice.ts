import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomCursorState {
  hover: boolean;
  text: string;
}

const initialState: CustomCursorState = {
  hover: false,
  text: null,
};

export const customCursorSlice = createSlice({
  name: "customCursor",
  initialState,
  reducers: {
    setCustomCursorHover(state, action: PayloadAction<boolean>) {
      state.hover = action.payload;
    },
    setCustomCursorText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
  },
});

export const { setCustomCursorHover, setCustomCursorText } = customCursorSlice.actions;
export default customCursorSlice.reducer;
