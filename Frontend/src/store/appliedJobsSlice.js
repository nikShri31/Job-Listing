
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { login, logout } from './authSlice';

const initialState = {
  userAppliedJobs: { applications: [] }, //  applied jobs
  userSelectedJobId: null, // Job selected for "view details"
  isLoading: false,
  error: null,
};

// Async thunk to handle the job application
export const applyJob = createAsyncThunk(
  'appliedJobs/applyJob',
  async ({ jobId, resumeFile }, { getState, rejectWithValue }) => {
    
  const state = getState();
  // console.log(state);
  
  // const token = state.auth.token;

    const formData = new FormData();
    formData.append('resume', resumeFile);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/application/apply/${jobId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // console.log('API response:', response.data);
      return response.data; // Include additional job response data
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'An error occurred while applying for the job' });
    }
  }
);

// Thunk to fetch applied jobs
export const fetchAppliedJobs = createAsyncThunk(
  'appliedJobs/fetchAppliedJobs',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) throw new Error('Token not found');

      const response = await axios.get('http://localhost:5000/api/application/all/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log( "Fetch Response:",  response.data);
      return response.data; // Return the fetched applied jobs
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || 'Failed to fetch applied jobs');
    }
  }
);

const appliedJobsSlice = createSlice({
  name: 'appliedJobs',
  initialState,
  reducers: {
    setUserSelectedJobId(state, action) {
      state.userSelectedJobId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Applying for a job
      .addCase(applyJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userAppliedJobs.applications.push(action.payload);// Add new applied job
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetching applied jobs after login
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userAppliedJobs = action.payload; // Set the applications array
        // console.log('Fetched applied jobs:', state.userAppliedJobs);
      })
      .addCase(fetchAppliedJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
        // Clear state on logout
        .addCase(logout, (state) => {
          state.userAppliedJobs = [];
          state.userSelectedJobId = null;
          state.isLoading = false;
          state.error = null;
        })

      // // Handle login fulfillment to load applied jobs
      // .addCase(login.fulfilled, (state,) => {
      //   fetchAppliedJobs();// Trigger fetching applied jobs after login
      //   state.isLoading = false;
      //   state.error = null;
      // })
  },
});

export const { setUserSelectedJobId } = appliedJobsSlice.actions;
export default appliedJobsSlice.reducer;

