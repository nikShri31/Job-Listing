import { configureStore } from '@reduxjs/toolkit';
import appliedJobsReducer from './appliedJobsSlice';
import authReducer from './authSlice';
import notificationsReducer from './notificationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appliedJobs: appliedJobsReducer,
    notifications: notificationsReducer,
  },
});
