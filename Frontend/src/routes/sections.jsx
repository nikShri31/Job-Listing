
// // import { Outlet, Navigate, useRoutes } from 'react-router-dom';
// import { createBrowserRouter, createRoutesFromElements, Route, Navigate, Routes, useRoutes } from 'react-router-dom';
// import {
//   AppPage,
//   LandingPage,
//   HomePage,
//   Dashboard,
//   UserPage,
//   ProductsPage,
//   ProfilePage,
//   DashboardLayout,
// } from '../Pages/index'
// import App from '../App';
// import NotFoundPage from '../Pages/page-not-found';
// import { Suspense } from 'react';

// const LoadingFallback = () => (
//   <div sx={{ display: 'flex', justifyContent: 'center' }}>
//     <CircularProgress />
//   </div>
// );



// const  AppPage = lazy(() => import('../Pages/AppPage'));
// //import LandingPage from '../Pages/LandingPage';

// const LandingPage = lazy(() => import('../Pages/LandingPage'));
// const HomePage = lazy(() => import('../Pages/HomePage'));
// const Dashboard = lazy(() => import('../Pages/DashboardPage'));
// const UserPage = lazy(() => import('../Pages/UserPage'));
// const ProductsPage = lazy(() => import('../Pages/ProductsPage'));

// const ProfilePage = lazy(() => import('../Pages/ProfilePage'));
// //const AccountPage = lazy(() => import('./pages/AccountPage'));

// Fallback component while lazy-loaded components are being fetched


 export default function Router() {
//   const routes = useRoutes([

 <div> hello</div>
//     {
//       path: '/',
//       element: <App />,
//       children: [
//         { index: true, element: <LandingPage /> }, // Default Landing Page
//         { path: 'jobs', element: <HomePage /> },
//         { path: 'dashboard', element: <Dashboard /> },
//         {
//           element: (
//             <DashboardLayout>
//               <Suspense fallback={LoadingFallback}>
//                 <Outlet />
//               </Suspense>
//             </DashboardLayout>
//           ),
//           children: [
//             { path: 'appPage', element: <AppPage /> },
//             { path: 'user', element: <UserPage /> },
//             { path: 'products', element: <ProductsPage /> },
//           ],
//         },
//         { path: 'profile', element: <ProfilePage /> },
//       ],
//     },
//     { path: '404', element: <NotFoundPage /> },
//     { path: '*', element: <Navigate to="/404" replace /> }, // Redirect unknown paths to 404
//   ]);

//   return routes;
// }
    
    //<Route path="*" element={<Navigate to="/404" replace />} />


    // export const IndexPage = lazy(() => import('src/pages/app'));
// export const BlogPage = lazy(() => import('src/pages/blog'));
// export const UserPage = lazy(() => import('src/pages/user'));
// export const LoginPage = lazy(() => import('src/pages/login'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
// export const Page404 = lazy(() => import('src/pages/page-not-found'));

// // ----------------------------------------------------------------------

// export default function Router() {
//   const routes = useRoutes([
//     {
//       element: (
//         <DashboardLayout>
//           <Suspense>
//             <Outlet />
//           </Suspense>
//         </DashboardLayout>
//       ),
//       children: [
//         { element: <IndexPage />, index: true },
//         { path: 'user', element: <UserPage /> },
//         { path: 'products', element: <ProductsPage /> },
//         { path: 'blog', element: <BlogPage /> },
//       ],
//     },
//     {
//       path: 'login',
//       element: <LoginPage />,
//     },
//     {
//       path: '404',
//       element: <Page404 />,
//     },
//     {
//       path: '*',
//       element: <Navigate to="/404" replace />,
//     },
//   ]);

//   return routes;
 }
