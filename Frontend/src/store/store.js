import { configureStore } from '@reduxjs/toolkit';

import appliedJobsReducer from './appliedJobsSlice';
import authReducer from './authSlice';
import notificationsReducer from './notificationSlice'
import allJobsReducer from './allJobsSlice';
import createJobsReducer from './createJobSlice'
import allApplicationsReducer from './allApplicationsSlice'

/* *** Persist configuration to store data in local storage */
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

//Persist configuration for applied jobs

 const appliedJobsPersistConfig = {
  key: 'appliedJobs', // Key for storing in localStorage
  storage, // Use localStorage
};
const applicationsOrgPersistConfig = {
  key: 'applications', // Key for storing in localStorage
  storage, // Use localStorage
};

// Wrapping the appliedJobs reducer with persistReducer
const persistedAppliedJobsReducer = persistReducer(appliedJobsPersistConfig, appliedJobsReducer);
const persistedApplicationsReducer = persistReducer(applicationsOrgPersistConfig, createJobsReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    allJobs:allJobsReducer,
    appliedJobs: persistedAppliedJobsReducer,

    //organisation
    applications:persistedApplicationsReducer,
    allApplications: allApplicationsReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false, // Disable serializable check for redux-persist
  }),
});
export const persistor = persistStore(store);


// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     allJobs: allJobsReducer,
//     appliedJobs: appliedJobsReducer, // No redux-persist here
//     notifications: notificationsReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck: false, // Still needed for other potential async actions, but not for redux-persist
//   }),
// });