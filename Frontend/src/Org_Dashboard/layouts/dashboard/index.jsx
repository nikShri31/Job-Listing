import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Nav from './Nav';
import Main from './Main';
import Header from './Header';
import Footer from '../../../Footer/Foooter';
import { Outlet } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <Box
        sx={{
          minHeight: 1,
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
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

// <Header onOpenNav={() => setOpenNav(true)} />
