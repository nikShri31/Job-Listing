// src/features/applications/applicationsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all applications for the organization
export const fetchAllApplications = createAsyncThunk(
  'allApplications/fetchAllApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/application/all/:jobId', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      // Return a rejected action with the error message
      return rejectWithValue(error.response.data || 'Something went wrong');
    }
  }
);

// Initial state for the applications slice
const initialState = {
  allApplications:[],
  isLoading: false,
  error: null,
};

// Slice
const allApplicationsSlice = createSlice({
  name: 'allApplications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllApplications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allApplications.push( action.payload);
      })
      .addCase(fetchAllApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default allApplicationsSlice.reducer;
