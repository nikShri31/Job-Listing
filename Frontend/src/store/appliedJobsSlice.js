import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userAppliedJobs: [], //  applied jobs 
  userSelectedJobId: null, // Job selected for "view details"
  isLoading: false,
  error: null,
}

// Async thunk to handle the job application
export const applyJob = createAsyncThunk(
  'appliedJobs/applyJob',
  async ({ jobId, resumeFile }, { getState, rejectWithValue }) => {

    const State = getState();

    const appliedJobIds = new Set(State.appliedJobs.userAppliedJobs.map(job => job.job)); // Use job._id or job.job based on your structure

    if (appliedJobIds.has(jobId)) {
      return rejectWithValue({ message: "Job already applied" });
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    // console.log(formData)
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
      console.log('API response:', response.data);
      return response.data;  // Include additional job response data
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'An error occurred in applied jobs' });

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

    // clearUserSelectedJobView(state) {
    //   state.userSelectedJobId = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyJob.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userAppliedJobs = [...state.userAppliedJobs, action.payload];
      
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { setUserSelectedJobId } = appliedJobsSlice.actions;
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
