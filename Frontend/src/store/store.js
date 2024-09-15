import { configureStore } from '@reduxjs/toolkit';
import appliedJobsReducer from './appliedJobsSlice';
import authReducer from './authSlice';
import notificationsReducer from './notificationSlice'
import allJobsReducer from './allJobsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    allJobs:allJobsReducer,
    appliedJobs: appliedJobsReducer,
    notifications: notificationsReducer,
  },
});
