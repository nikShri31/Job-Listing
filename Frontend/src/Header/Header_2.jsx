import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Drawer, List, ListItem, ListItemText, Stack } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginBtn from '../Authentication/LoginBtn';
import NotificationMenu from '../Components/Notification/Notification_Menu';
import { authError, authLoading, logout } from '../store/authSlice';
import { useResponsive, useWidth } from '../hooks/use-responsive';

const useNoOutlineStyles = () => ({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", // Removes TextField outline
  },
  "&:focus": {
    outline: "none", // Removes outline on focus for buttons
  },
});

const pages = ['Home', 'My Jobs', ''];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const headingStyles = {
  my: 2,
  mx:1,
   fontSize: "1.1rem",
  textDecoration: 'none',
  display: 'block',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:focus': {
    outline: 'none',
  },
  '&:hover': {
    boxShadow: ` 10px 10px 10px #00000041, inset 5px 5px 6px rgba(0, 0, 0, 0.2) `,
    fontWeight: 'bold',
  },
};

function Header_2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { isAuthenticated, role, user } = useSelector((state) => state.auth);
  const isLoading = useSelector(authLoading);
  const error = useSelector(authError);
  

  console.log('Auth State:', { isAuthenticated, role, user });

  const isMobile = useResponsive('down', 'sm'); // Small screens
  const isMediumScreen = useResponsive('between', 'sm', 'md'); // Medium screens
  const isLargeScreen = useResponsive('up', 'md'); // Large screens
  const currentWidth = useWidth(); // Get the current width of the screen


  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);


 
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout()); // Dispatch the logout action to clear the auth state
    navigate('/'); // Redirect to home page after logout
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <Box>
      <AppBar
        position="sticky"
        sx={{
          boxShadow: 0,
          bgcolor:'white',
          pt: currentWidth < 400 ? 0.5 : 1,
          width: isMobile ? '100%':'100%'
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
              borderRadius:'99px',
              bgcolor: '#E3F0FE',
              backdropFilter: 'blur(30px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 1,
            }}
          >
            {/* Logo */}
            <Box sx={{ display: 'flex' }}>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex', lg: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex', lg: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  letterSpacing: '.3rem',
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                JOBS
              </Typography>
            </Box>

           {/* Drawer for Small Screens */}
           {isMobile && (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="menu" onClick={toggleDrawer} color="inherit">
                <MenuIcon />
              </IconButton>
              <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
                <List sx={{ width: 250 }}>
                  <ListItem button onClick={() => { navigate('/jobs'); toggleDrawer(); }}>
                    <ListItemText primary="Jobs" />
                  </ListItem>
                  <ListItem button onClick={() => { navigate('/dashboard'); toggleDrawer(); }}>
                    <ListItemText primary="My Jobs" />
                  </ListItem>
                </List>
              </Drawer>
            </Box>
          )}

          {/* Main Logo for Small Screens */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 'bold',
              letterSpacing: '.3rem',
              textDecoration: 'none',
              color: 'black',
            }}
          >
            JOBS
          </Typography>

           {/* Buttons and User Menu for Large Screens */}
           {isLargeScreen && (
            <Box sx={{ flexGrow: 1, display: 'flex',px:1 }}>
              <Button sx={headingStyles} onClick={() => navigate('/jobs')}>Home</Button>
              <Button sx={headingStyles} onClick={() => navigate('/dashboard')}>My Jobs</Button>
            
            </Box>
          )}

        
            {/* Authentication Controls */}
            {!isAuthenticated ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <LoginBtn role="employee" variant="outlined" bgColor="primary" />
                <LoginBtn role="employer" variant="outlined" bgColor="secondary" />
              </Box>
            ) : (
              <React.Fragment>
                <Box sx={{ flexGrow: 0 }}>
                  <Stack direction="row" spacing={3}>
                    <MenuItem>
                      <NotificationMenu />
                    </MenuItem>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={[useNoOutlineStyles(),{ p: 0 }]}>
                        <Avatar alt={user?.name} src={user?.avatar} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      anchorEl={anchorElUser}
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={() => {navigate('/profile'); handleCloseUserMenu();}}>
                        <Typography textAlign="center">Profile</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => {navigate('/dashboard'); handleCloseUserMenu();}}>
                        <Typography textAlign="center">My Jobs</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </Stack>
                </Box>
              </React.Fragment>
            )}
            
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default Header_2;




// <Box>
//    <AppBar
//   position="sticky"
//   sx={{
//     boxShadow: 0,
//     bgcolor: '#E3F0FE',
//     pt: 1,
//   }}
// >
//   <Container maxWidth="xl">
//     <Toolbar
//       variant="regular"
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         flexShrink: 0,
//         borderRadius: '999px',
//         bgcolor: 'primary',
//         backdropFilter: 'blur(30px)',
//         maxHeight: 40,
//         border: '1px solid',
//         borderColor: 'divider',
//         boxShadow: 1,
//       }}
//     >
//       {/* Logo */}
//       <Box sx={{ display: 'flex' }}>
//         <AdbIcon sx={{ display: { xs: 'none', md: 'flex', lg: 'flex' }, mr: 1 }} />
//         <Typography
//           variant="h6"
//           noWrap
//           component="a"
//           href="#"
//           sx={{
//             mr: 2,
//             display: { xs: 'none', md: 'flex', lg: 'flex' },
//             fontFamily: 'monospace',
//             fontWeight: 'bold',
//             letterSpacing: '.3rem',
//             color: 'black',
//             textDecoration: 'none',
//           }}
//         >
//           JOBS
//         </Typography>
//       </Box>

//       {/* Small screen menu */}
//       <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//         <IconButton
//           size="large"
//           aria-label="account of current user"
//           aria-controls="menu-appbar"
//           aria-haspopup="true"
//           onClick={handleOpenNavMenu}
//           color="inherit"
//         >
//           <MenuIcon />
//         </IconButton>
//         <Menu
//           id="menu-appbar"
//           anchorEl={anchorElNav}
//           anchororigin={{
//             vertical: 'bottom',
//             horizontal: 'left',
//           }}
//           keepMounted
//           transformorigin={{
//             vertical: 'top',
//             horizontal: 'left',
//           }}
//           open={Boolean(anchorElNav)}
//           onClose={handleCloseNavMenu}
//           sx={{
//             display: { xs: 'block', md: 'none' },
//           }}
//         >
//           <MenuItem onClick={() => navigate('/jobs')}>
//             <Typography textAlign="center">Jobs</Typography>
//           </MenuItem>
//           <MenuItem onClick={() => navigate('/dashboard')}>
//             <Typography textAlign="center">My Jobs</Typography>
//           </MenuItem>
//         </Menu>
//       </Box>

//       {/* Main logo for small screen */}
//       <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//       <Typography
//         variant="h5"
//         noWrap
//         component="a"
//         href="#"
//         sx={{
//           mr: 2,
//           display: { xs: 'flex', md: 'none' },
//           flexGrow: 1,
//           fontFamily: 'monospace',
//           fontWeight: 'bold',
//           letterSpacing: '.3rem',
//           textDecoration: 'none',
//           color: 'black',
//         }}
//       >
//         JOBS
//       </Typography>

//       {/* Conditional rendering based on authentication */}
//       {!isAuthenticated ? (
//         <Box sx={{ display: 'flex', gap: 2 }}>
//           {/* Login Buttons */}
//           <LoginBtn role="employee" variant="!outlined" bgColor="primary" />
//           <LoginBtn role="employer" variant="!outlined" bgColor="secondary" />
//         </Box>
//       ) : (
//         <React.Fragment>
//           <Box
//             sx={{
//               flexGrow: 1,
//               display: { xs: 'none', md: 'flex', lg: 'flex' },
//             }}
//           >
//             <Button sx={headingStyles} onClick={() => navigate('/jobs')}>
//               Home
//             </Button>
//             <Button sx={headingStyles} onClick={() => navigate('/dashboard')}>
//               My Jobs
//             </Button>
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Stack direction={'row'} spacing={3}>
//               <MenuItem>
//                 <NotificationMenu />
//               </MenuItem>

//               {/* Profile and Logout */}
//               <Tooltip title="Open settings">
//                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                   <Avatar alt={user?.name} src={user?.avatar} />
//                 </IconButton>
//               </Tooltip>
//               <Menu
//                 sx={{ mt: '45px' }}
//                 id="menu-appbar"
//                 anchorEl={anchorElUser}
//                 anchorOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 open={Boolean(anchorElUser)}
//                 onClose={handleCloseUserMenu}
//               >
//                 <MenuItem onClick={() => navigate('/profile')}>
//                   <Typography textAlign="center">Profile</Typography>
//                 </MenuItem>
//                 <MenuItem onClick={() => navigate('/dashboard')}>
//                   <Typography textAlign="center">My Jobs</Typography>
//                 </MenuItem>
//                 <MenuItem onClick={handleLogout}>
//                   <Typography textAlign="center">Logout</Typography>
//                 </MenuItem>
//               </Menu>
//             </Stack>
//           </Box>
//         </React.Fragment>
//       )}

      
//     </Toolbar>
//   </Container>
// </AppBar>
// </Box>








