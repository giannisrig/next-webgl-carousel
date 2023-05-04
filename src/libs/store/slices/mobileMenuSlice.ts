import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MobileMenuState {
  open: boolean;
}

const initialState: MobileMenuState = {
  open: false,
};

export const mobileMenuSlice = createSlice({
  name: "mobileMenu",
  initialState,
  reducers: {
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
  },
});

export const { setMobileMenuOpen } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
