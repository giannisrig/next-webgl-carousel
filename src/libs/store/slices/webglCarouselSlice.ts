import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WebglCarouselState {
  activePlane: boolean | number;
}

const initialState: WebglCarouselState = {
  activePlane: null,
};

export const webglCarouselSlice = createSlice({
  name: "webglCarousel",
  initialState,
  reducers: {
    setWebglCarouselActivePlane(state, action: PayloadAction<boolean | number>) {
      state.activePlane = action.payload;
    },
  },
});

export const { setWebglCarouselActivePlane } = webglCarouselSlice.actions;
export const selectActivePlane = (state) => state.webglCarousel.activePlane;
export default webglCarouselSlice.reducer;
