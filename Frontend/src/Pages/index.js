// src/routes/pages.js
import { lazy } from 'react';

const AppPage = lazy(() => import('./AppPage'));

const HomePage = lazy(() => import('./HomePage'));
const Dashboard = lazy(() => import('./DashboardPage'));
const UserPage = lazy(() => import('./UserPage'));
const ProductsPage = lazy(() => import('./ProductsPage'));
const ProfilePage = lazy(() => import('./ProfilePage'));
import DashboardLayout from '../Org_Dashboard/layouts/dashboard';
import LandingPage from './LandingPage';

// Export all components
export {
  LandingPage,
  HomePage,
  Dashboard,
  ProfilePage,
  AppPage,
  UserPage,
  ProductsPage,
  DashboardLayout,
};
