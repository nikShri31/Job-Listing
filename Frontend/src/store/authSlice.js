// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userRole: null, // "jobSeeker" or "organization"
  userInfo: null, // Store user details like name, email, etc.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.userRole;
      state.userInfo = action.payload.userInfo;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.userInfo = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
