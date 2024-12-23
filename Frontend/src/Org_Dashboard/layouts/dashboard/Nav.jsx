import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';


import Scrollbar from '../../components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';
import { useResponsive } from '../../../hooks/use-responsive';
import { account } from '../../../_mock/account';
import Logo from '../../components/logo';
import { RouterLink } from '../../../routes/components';
import { usePathname } from '../../../routes/hooks/use-pathname';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {

  const pathname = usePathname();

const user = useSelector(state=> state.auth.user);

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={user.profilePic} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="subtitle2">{user.website}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {user.industry}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );



const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />

      {/*renderUpgrade*/}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: '100vh', // Full height for fixed navigation
            position: 'sticky',
            top: 80,
            left: 0,
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};


{
  //   const renderUpgrade = (
  //     <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
  //       <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
  //         <Box
  //           component="img"
  //           src="/assets/illustrations/illustration_avatar.png"
  //           sx={{ width: -0, position: 'absolute', top: -50 }}
  //         />
  
  // <Box sx={{ textAlign: 'center', display: 'none' }}>
  //   <Typography variant="h6">Get more?</Typography>
  //   <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
  //     From only $69
  //   </Typography>
  // </Box>
  //  <Button
  //           href=""
  //           target="_white"
  //           variant="contained"
  //           color="inherit"
  //           sx={{ display: 'none' }}
  //         >
  //           -
  //         </Button>
  //       </Stack>
  //     </Box>
  //   );
  }