import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WebglCarouselState {
  activePlane: boolean | number;
  hoveredPlane: boolean | number;
  planesEdges: number[];
  moving: boolean;
  initialized: boolean;
  interacting: boolean;
}

const initialState: WebglCarouselState = {
  activePlane: null,
  hoveredPlane: null,
  planesEdges: null,
  moving: false,
  initialized: false,
  interacting: false,
};

export const webglCarouselSlice = createSlice({
  name: "webglCarousel",
  initialState,
  reducers: {
    setWebglCarouselActivePlane(state, action: PayloadAction<boolean | number>) {
      state.activePlane = action.payload;
    },
    setHoveredPlane(state, action: PayloadAction<boolean | number>) {
      state.hoveredPlane = action.payload;
    },
    setInitialized(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload;
    },
    setMoving(state, action: PayloadAction<boolean>) {
      state.moving = action.payload;
    },
    setInteracting(state, action: PayloadAction<boolean>) {
      state.interacting = action.payload;
    },
    setPlanesEdges(state, action: PayloadAction<number[]>) {
      state.planesEdges = action.payload;
    },
  },
});

export const {
  setWebglCarouselActivePlane,
  setMoving,
  setPlanesEdges,
  setInitialized,
  setInteracting,
  setHoveredPlane,
} = webglCarouselSlice.actions;
export default webglCarouselSlice.reducer;
