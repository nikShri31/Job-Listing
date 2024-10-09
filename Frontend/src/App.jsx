import './App.css';
//import EmployerPage from './Pages/EmployerPage';

import './global.css';

import { Suspense } from 'react';
import Header_2 from './Header/Header_2';
import Footer from './Footer/Foooter';
//import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import { useSelector } from 'react-redux';
import ThemeProvider from './theme';
import { Box, CircularProgress } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Router from './routes/sections';
import Header from './Org_Dashboard/layouts/dashboard/Header';


function App() {
  useScrollToTop();

  //const role = useSelector((state) => state.auth.role);

  return (
    <ThemeProvider>
    <Header onOpenNav={() => setOpenNav(true)} />
      <main >
      <Box sx={{mt:10}}>
      <Outlet />
      </Box>
     
      
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

//  {role === 'employee' && <Header_2 />} {/* Conditional header */}
