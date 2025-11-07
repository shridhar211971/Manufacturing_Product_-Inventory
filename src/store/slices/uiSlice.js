import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { snack: null },
  reducers: {
    showSnackbar(state, action) {
      state.snack = { message: action.payload };
    },
    hideSnackbar(state) {
      state.snack = null;
    },
  },
});

export const { showSnackbar, hideSnackbar } = uiSlice.actions;
export default uiSlice.reducer;
