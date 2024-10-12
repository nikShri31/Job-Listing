import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';

import LoginBtn from '../Authentication/LoginBtn';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

const menuItem = ['Home', 'About', 'Highlight'];

function Header() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            variant="regular"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor: 'primary',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 2,
              }}
            >
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#"
                sx={{
                  color: 'black',
                  pr: 3,
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  letterSpacing: '.3rem',
                  display: { xs: 'none', md: 'flex', lg: 'flex' },
                }}
              >
                {' '}
                JOBS{' '}
              </Typography>
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                {menuItem.map((item, index) => (
                  <MenuItem
                    key={index}
                    sx={{
                      py: '6px',
                      px: '12px',
                      transition: 'box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.1) translateZ(30px)',
                      },
                    }}
                    onClick={() => scrollToSection({ item })}
                  >
                    <Typography key={index} variant="body2" color="text.primary">
                      {item}
                    </Typography>
                  </MenuItem>
                ))}
              </Box>
            </Box>

            {/*Login Modal */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex', lg: 'flex' },
                gap: 0.5,
                alignItems: 'right',
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1) translateZ(30px)',
                },
              }}
            >
              <LoginBtn role="Individual" variant={'outlined'} bgColor={'grey'} />
              <LoginBtn role="Organisation" variant={'outlined'} bgColor={'black'} />
            </Box>

            {/** App Drawer for small screens */}
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <MenuItem onClick={() => scrollToSection('features')}>Home</MenuItem>
                  <MenuItem onClick={() => scrollToSection('testimonials')}>About</MenuItem>
                  <MenuItem onClick={() => scrollToSection('highlights')}>Highlights</MenuItem>

                  <Divider />

                  <MenuItem>
                    <LoginBtn
                      color="primary"
                      variant="outlined"
                      component="a"
                      sx={{ width: '80%' }}
                    />
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;
