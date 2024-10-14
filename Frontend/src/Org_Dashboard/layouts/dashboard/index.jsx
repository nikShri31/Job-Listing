import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Nav from './Nav';
import Main from './Main';
import { Outlet } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <Box  sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Box
        sx={{
          flexGrow: 1,
         // position:'relative',
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
        <Main>
          <Box sx={{ mt: { lg: -6 } }}>
            <Outlet />
          </Box>
        </Main>
      </Box>
    </Box>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

// <Header onOpenNav={() => setOpenNav(true)} />
