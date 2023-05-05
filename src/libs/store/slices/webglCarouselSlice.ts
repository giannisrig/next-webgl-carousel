import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WebglCarouselState {
  activePlane: boolean | number;
  planesEdges: number[];
  moving: boolean;
}

const initialState: WebglCarouselState = {
  activePlane: null,
  planesEdges: null,
  moving: false,
};

export const webglCarouselSlice = createSlice({
  name: "webglCarousel",
  initialState,
  reducers: {
    setWebglCarouselActivePlane(state, action: PayloadAction<boolean | number>) {
      state.activePlane = action.payload;
    },
    setMoving(state, action: PayloadAction<boolean>) {
      state.moving = action.payload;
    },
    setPlanesEdges(state, action: PayloadAction<number[]>) {
      state.planesEdges = action.payload;
    },
  },
});

export const { setWebglCarouselActivePlane, setMoving, setPlanesEdges } = webglCarouselSlice.actions;
export default webglCarouselSlice.reducer;
