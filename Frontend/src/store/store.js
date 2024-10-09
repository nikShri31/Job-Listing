import { configureStore } from '@reduxjs/toolkit';



import appliedJobsReducer from './appliedJobsSlice';
import authReducer from './authSlice';
import notificationsReducer from './notificationSlice'
import allJobsReducer from './allJobsSlice';
import newJobsReducer from './createJobSlice'

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

/* *** Persist configuration to store data in local storage */

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

 //Persist configuration for applied jobs

 const persistConfig = {
  key: 'appliedJobs', // Key for storing in localStorage
  storage, // Use localStorage
};

// Wrapping the appliedJobs reducer with persistReducer
const persistedAppliedJobsReducer = persistReducer(persistConfig, appliedJobsReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    allJobs:allJobsReducer,
    appliedJobs: persistedAppliedJobsReducer,

    //organisation
    applications:newJobsReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false, // Disable serializable check for redux-persist
  }),
});
export const persistor = persistStore(store);