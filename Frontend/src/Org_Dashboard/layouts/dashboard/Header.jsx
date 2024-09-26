import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AdbIcon from '@mui/icons-material/Adb';
import Iconify from '../../components/iconify';
import { useResponsive } from '../../../hooks/use-responsive';
import { bgBlur } from '../../../theme/css';

import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import LanguagePopover from './common/language-popover';
import NotificationsPopover from './common/notifications-popover';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authError, authLoading, logout } from '../../../store/authSlice';
import { Button, Divider, Typography } from '@mui/material';
import LoginBtn from '../../../Authentication/LoginBtn';
// import NotificationMenu from '../../../Components/Notification/Notification_Menu';

// ----------------------------------------------------------------------
const headingStyles = {
  my: 2,
  mx: 1,
  fontSize: '1.1rem',
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

export default function Header({ onOpenNav }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Auth Slice
  const { isAuthenticated, role, user } = useSelector((state) => state.auth);
  const isLoading = useSelector(authLoading);
  const error = useSelector(authError);
  console.log('Auth State:', { isAuthenticated, role, user });

  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const handleLogout = () => {
    // handleCloseUserMenu();
    dispatch(logout()); // Dispatch the logout action to clear the auth state
    navigate('/'); // Redirect to home page after logout
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  const renderContent = (
    <>
      {!mdUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        
      )}
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
        JOBBER
      </Typography>

      <Box sx={{ flexGrow: 1, display:{xs:'none', md:'flex'}, px: 1 }}>
        <Button sx={headingStyles} onClick={() => navigate('/jobs')}>
          Home
        </Button>
        <Button sx={headingStyles} onClick={() => navigate('/dashboard')}>
          My Jobs
        </Button>
        <Button sx={headingStyles} onClick={() => navigate('/org')}>
          OrgHome
        </Button>
        <Button sx={headingStyles} onClick={() => navigate('/org/user')}>
          User
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        {!isAuthenticated ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <LoginBtn role="employee" variant="outlined" bgColor="primary" />
            <LoginBtn role="employer" variant="outlined" bgColor="secondary" />
          </Box>
        ) : (
          <>
            <Searchbar />
            <NotificationsPopover/>
          
            <AccountPopover />
          </>
        )}
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
      mb:5,
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.paper,
         
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(mdUp && {
          width: `100%`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
       
      </Toolbar>
    </AppBar>
    
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

//  width: `calc(100% - ${NAV.WIDTH + 1}px)`,
