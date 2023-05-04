import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OverlayState {
  active: boolean;
}

const initialState: OverlayState = {
  active: false,
};

export const overlaySlice = createSlice({
  name: "overlay",
  initialState,
  reducers: {
    setOverlayActive(state, action: PayloadAction<boolean>) {
      state.active = action.payload;
    },
  },
});

export const { setOverlayActive } = overlaySlice.actions;
export const selectOverlayActive = (state) => state.overlay.active;
export default overlaySlice.reducer;
