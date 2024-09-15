// allJobsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch all jobs
export const fetchAllJobs = createAsyncThunk("jobs/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/job/getAll", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.jobs;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState: {
    jobs: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default allJobsSlice.reducer;
