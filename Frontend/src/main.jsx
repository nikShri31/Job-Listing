import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App.jsx'
import './index.css';
// import { RouterProvider } from 'react-router-dom'
// import router from './Router/Router'
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import {
  LandingPage,
  HomePage,
  ProfilePage,
  Dashboard,
  AppPage,
  DashboardLayout,
  UserPage,
  ProductsPage,
} from './Pages/index';
// import AccountPage from "./Pages/AccountPage";
// import JD from "./Pages/Jd_Page";

import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from './Pages/page-not-found';
import CreateNewJob from './Org_Dashboard/sections/products/Create_Job_Form';

export const LazyLoader = (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback={LazyLoader}>
          <App />
        </Suspense>
      }
    >
      <Route index element={<LandingPage />} />
      <Route path="jobs" element={<HomePage />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="org" element={<DashboardLayout />}>
        <Route index element={<AppPage />} />
        <Route path="applicants" element={<UserPage />} />
        <Route path="applications" element={<ProductsPage />} />
        <Route path="create-job-form" element={<CreateNewJob />} />
      </Route>
      <Route path="404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// <Route path="/account" element={<AccountPage />} />
