import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    currentUser: {},
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      // state.isLoggedIn = action.payload;
      // state.currentUser = action.payload;
      state.isLoggedIn = action.payload?.isLoggedIn
        ? action.payload?.isLoggedIn
        : action.payload;
      state.currentUser = action.payload?.user
        ? action.payload?.user
        : action.payload;
    },
  },
});

export const { setIsLoggedIn } = userSlice.actions;
