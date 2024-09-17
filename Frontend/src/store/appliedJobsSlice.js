import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to handle the job application
export const applyJob = createAsyncThunk(
  'appliedJobs/applyJob',
  async ({ jobId, resumeFile }, { getState, rejectWithValue }) => {

    const { appliedJobs } = getState(); // Get current applied jobs
    console.log(appliedJobs.title);
    

    // Check if the job has already been applied
    if (appliedJobs.userAppliedJobs.some(job => job.jobId === jobId)) {
      return rejectWithValue({ message: "You have already applied for this job." });
    }
    

    const formData = new FormData();
    formData.append('resume', resumeFile);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    try {
      const response = await axios.post(
        `http://localhost:5000/api/application/apply/${jobId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data); 
      return { jobId, ...response.data }; // Include additional job response data
    } catch (err) {
     return rejectWithValue(err.response?.data || { message: 'An error occurred' });

    }
  }
);

const appliedJobsSlice = createSlice({
  name: 'appliedJobs',
  initialState: {
    userAppliedJobs: [], //  applied jobs 
    userSelectedJob: null, // Job selected for "view details"
    isLoading: false,
    error: null,
  },
  reducers: {
    setUserSelectedJobView(state, action) {
      state.userSelectedJob= action.payload; 
    },
   
    clearUserSelectedJobView(state) {
      state.userSelectedJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userAppliedJobs.push(action.payload); 
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const {  setUserSelectedJobView,  clearUserSelectedJobView } = appliedJobsSlice.actions
export default appliedJobsSlice.reducer;





// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   userAppliedJobs: [], //  applied jobs list
//   userSelectedJobId: null, // For storing the job selected for viewing details
// };
// const appliedJobsSlice = createSlice({
//   name: "appliedJobs",
//   initialState,
//   reducers: {
//     setUserAppliedJobs: (state, action) => {
//       const existingJob = state.userAppliedJobs.find(
//         (job) => job.id === action.payload.id
//       );
//       if (!existingJob) {
//         state.userAppliedJobs.push(action.payload);
//       }
//     },
//     setUserSelectedJobId: (state, action) => {
//       state.userSelectedJobId = action.payload;
//     },
//     clearUserSelectedJobId(state) {
//       state.userSelectedJobId = null;
//     },
//   },
// });
// console.log(appliedJobsSlice);

// export const { setUserAppliedJobs, setUserSelectedJobId, clearUserSelectedJobId } =
//   appliedJobsSlice.actions;
// export default appliedJobsSlice.reducer;
