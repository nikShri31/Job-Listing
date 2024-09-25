import './App.css';
//import EmployerPage from './Pages/EmployerPage';

import { Outlet } from 'react-router-dom';

import { Suspense, useState } from 'react';
import Header_2 from './Header/Header_2';
import Footer from './Footer/Foooter';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import Header from './Org_Dashboard/layouts/dashboard/Header';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header />
      <main>
        <Suspense
          fallback={
            <Typography variant="h2">
              
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
              
            </Typography>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
