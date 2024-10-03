
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
  console.log(state);
  
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
      console.log('API response:', response.data);
      return response.data; // Include additional job response data
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'An error occurred while applying for the job' });
    }
  }
);

// Thunk to fetch applied jobs
export const fetchAppliedJobs = createAsyncThunk(
  'appliedJobs/fetchAppliedJobs',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) throw new Error('Token not found');

      const response = await axios.get('http://localhost:5000/api/application/all/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data.applications; // Return the fetched applied jobs
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
        console.error('Error applying for job:', action.payload);
      })

      // Fetching applied jobs after login
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userAppliedJobs.applications = action.payload; // Set the applications array
        console.log('Fetched applied jobs:', state.userAppliedJobs.applications);
      })
      .addCase(fetchAppliedJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
        // Clear state on logout
        .addCase(logout, (state) => {
          state.userAppliedJobs.applications = [];
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


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { logout,login } from './authSlice';

// const initialState = {
//   userAppliedJobs: [], //  applied jobs 
//   userSelectedJobId: null, // Job selected for "view details"
//   isLoading: false,
//   error: null,
// }



// // Async thunk to handle the job application
// export const applyJob = createAsyncThunk(
//   'appliedJobs/applyJob',
//   async ({ jobId, resumeFile }, { getState, rejectWithValue }) => {

//     const State = getState();
//     const token = State.auth.token;

//     // const appliedJobIds = new Set(State.appliedJobs.userAppliedJobs.map(job => job.job)); // Use job._id or job.job based on your structure

//     // if (appliedJobIds.has(jobId)) {
//     //   return rejectWithValue({ message: "Job already applied" });
//     // }

//     const formData = new FormData();
//     formData.append('resume', resumeFile);
//     // console.log(formData)
  

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/application/apply/${jobId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       console.log('API response:', response.data);
//       return response.data;  // Include additional job response data
//     } catch (err) {
//       return rejectWithValue(err.response?.data || { message: 'An error occurred in applied jobs' });

//     }
//   }
// );
// // Thunk to fetch applied jobs
// export const fetchAppliedJobs = createAsyncThunk(
//   'appliedJobs/fetchAppliedJobs',
//   async (_, { getState }) => {
//     const token = getState().auth.token; // Assuming token is stored in auth slice
//     const response = await axios.get('/api/application/all/me', {
//       headers: {
//         Authorization: `Bearer ${token}`, // Send the token in the headers
//       },
//     });
//     console.log("Fetch Applied Jobs :" , response.data);
    
//     return response.data; // Return the fetched applied jobs
//   }
// );



// const appliedJobsSlice = createSlice({
//   name: 'appliedJobs',
//   initialState,
//   reducers: {
//     setUserSelectedJobId(state, action) {
//       state.userSelectedJobId = action.payload;
//     },

//     // clearUserSelectedJobView(state) {
//     //   state.userSelectedJobId = null;
//     // },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(applyJob.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(applyJob.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.userAppliedJobs = [...state.userAppliedJobs, action.payload];
      
//       })
//       .addCase(applyJob.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       // Fetch applied jobs after login
//       .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
//         state.userAppliedJobs = action.payload; // Update applied jobs from API
//       })
//       .addCase(fetchAppliedJobs.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//     // When the user logs in, load their previously applied jobs
//     .addCase(login.fulfilled, (state, action) => {
//       state.userAppliedJobs = action.payload; // Initialize from applications
//       state.isLoading = false;
//       state.error = null;
//     })
//     // Clear the state when the user logs out
//     .addCase(logout, (state) => {
//       state.userAppliedJobs = [];
//       state.userSelectedJobId = null;
//       state.error = null;
//       state.isLoading = false;
//     });
//   },
// });
// export const { setUserSelectedJobId } = appliedJobsSlice.actions;
// export default appliedJobsSlice.reducer;





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
