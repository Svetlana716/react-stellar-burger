import { createSlice } from '@reduxjs/toolkit';
import { registrationUser, updateUser, loginToProfile, logoutOfProfile } from "./actions";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthChecked: false,

    loading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAuthChecked(state, action) {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrationUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registrationUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(registrationUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.loading = false;
      })

      .addCase(loginToProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginToProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(loginToProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.loading = false;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.loading = false;
      })

      .addCase(logoutOfProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutOfProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(logoutOfProfile.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
        state.loading = false;
      })
  }
});

export const { setUser, setAuthChecked } = userSlice.actions;

export const userReducer = userSlice.reducer;
