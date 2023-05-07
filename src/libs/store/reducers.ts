import { HYDRATE } from "next-redux-wrapper";
import { combineReducers, Reducer } from "@reduxjs/toolkit";
import mobileMenuReducer from "@/slices/mobileMenuSlice";
import overlayReducer from "@/slices/overlaySlice";
import webglCarouselReducer from "@/slices/webglCarouselSlice";

// Define your reducers here
const rootReducer: Reducer = combineReducers({
  mobileMenu: mobileMenuReducer,
  overlay: overlayReducer,
  webglCarousel: webglCarouselReducer,
});

const combinedReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
  } else {
    return rootReducer(state, action);
  }
};

export default combinedReducer;
