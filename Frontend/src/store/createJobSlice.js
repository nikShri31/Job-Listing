import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';



const initialState = {
  applications: [],
  selectedJob: null,
  isLoading: false,
  error: null,
};


// ******************* Thunk to submit form data ********************************
export const createApplication = createAsyncThunk(
  'applications/createApplication',
  async (formData, { getState, rejectWithValue }) => {
    const state = getState();
    //console.log("BEFORE TRY")
    try {
      formData.requirements = {
        skills: formData.skills,
        experience: formData.experience,
        education: formData.education
      }
      const response = await axios.post('http://localhost:5000/api/job', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      //console.log({ "org applications": response.data.job });
      return response.data.job;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// *************  Thunk to fetch all applications ***************************
export const fetchApplications = createAsyncThunk(
  'applications/fetchApplications',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const orgId = state.auth.user._id;
      const response = await axios.get(`http://localhost:5000/api/job/organisation/${orgId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Fetched applications:', response.data); // Log the response data
      
      return response.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'An unexpected error occurred while fetching applications'
      );
    }
  }
);


// ******************* Thunk to delete an application *************************
export const deleteApplication = createAsyncThunk(
  'applications/deleteApplication',
  async (jobId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return jobId; // Return the jobId to use for updating the state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete this application.'
      );
    }
  }
);


const newJobsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setSelectedJob(state, action) {
      state.selectedJob = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle application submission
    builder
      .addCase(createApplication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications.push(action.payload);
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchApplications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = action.payload;

      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.applications = state.applications.filter(
          (application) => application._id !== action.payload
        );
      })
      .addCase(logout, (state) => {
        state.applications = [];
        state.selectedJob = null;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { setSelectedJob } = newJobsSlice.actions;

export default newJobsSlice.reducer;
