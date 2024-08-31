import { configureStore } from '@reduxjs/toolkit';
import appliedJobsReducer from './appliedJobsSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appliedJobs: appliedJobsReducer,
  },
});
