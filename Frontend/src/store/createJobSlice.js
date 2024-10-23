import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';


const initialState={
  applications: [],
  selectedJob: null,
  isLoading: false,
  error: null,
};

// Thunk to submit form data
export const createApplication = createAsyncThunk(
  'applications/createApplication',
  async (formData, { getState,rejectWithValue }) => {
    const state = getState();
    console.log(state);
    

    // Check if the user is logged in and is an employer
    // if (!auth.isAuthenticated || auth.user.role !== 'employer') {
    //   return rejectWithValue(' first logged in as an employer to create an application.');
    // }
    try {
      formData.requirements = {
        skills : formData.skills,
        experience : formData.experience,
        education : formData.education
      }
      console.log("Form Data :",formData);
        const response = await axios.post('http://localhost:5000/api/job', formData, {
            headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
          });
          console.log("org applications: ",response.data);
          return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to fetch applications

export const fetchApplications = createAsyncThunk(
    'applications/fetchApplications',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('http://localhost:5000/api/job', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        return await response.data; // Assuming API returns the list of applications
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'An unexpected error occurred while fetching applications');
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
        .addCase(logout, (state) => {
          state.applications = [];
          state.selectedJob = null;
          state.isLoading = false;
          state.error = null;
        });
    },
  });

  export const { setSelectedJob} = newJobsSlice.actions;
  
  export default newJobsSlice.reducer;
  