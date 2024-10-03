import { useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { account } from '../../../../_mock/account';
import { logout } from '../../../../store/authSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../../../../store/store';

// ----------------------------------------------------------------------

const EMP_MENU_OPTIONS = [
  {
    label: 'My Jobs',
    path:'dashboard',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    path:'profile',
    icon: 'eva:person-fill',
  },
];

const ORG_MENU_OPTIONS = [
  {
    label: 'Applications',
    path:'org/applications',
    icon: 'eva:home-fill',
  },
  {
    label: 'Users',
    path:'org/user',
    icon: 'eva:person-fill',
  },
];

const useNoOutlineStyles = () => ({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", // Removes TextField outline
  },
  "&:focus": {
    outline: "none", // Removes outline on focus for buttons
  },
});

// ----------------------------------------------------------------------

export default function AccountPopover() {

  const { isAuthenticated, role, user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  
  const handleNavigate = (path) => {
    handleClose();  // Close the menu first
    navigate(`/${path}`);
  };

  const handleLogout =()=>{
    setOpen(null);
    dispatch(logout()); // Dispatch the logout action 
    persistor.purge(); // Clears all persisted states
    navigate('/'); 
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={[useNoOutlineStyles(),{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }]}
      >
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        { isAuthenticated && role && role === 'employee'
          ? EMP_MENU_OPTIONS.map((option)=>(
            <MenuItem key={option.label} onClick={() => handleNavigate(option.path)}>
            {option.label}
          </MenuItem>
          )) 
          : ORG_MENU_OPTIONS.map((option)=>(
            <MenuItem key={option.label} onClick={() => handleNavigate(option.path)}>
            {option.label}
          </MenuItem>
          ))
        }

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}

// {MENU_OPTIONS.map((option) => (
//   <MenuItem key={option.label} onClick={() => handleNavigate(option.path)}>
//   {option.label}
// </MenuItem>
// ))}
