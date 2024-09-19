import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Box,
  Typography,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationDialog from "./Notification_Dialog"; // Import Dialog component
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

const useNoOutlineStyles = () => ({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", // Removes TextField outline
  },
  "&:focus": {
    outline: "none", // Removes outline on focus for buttons
  },
});

export default function NotificationMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const lastNotifications = notifications.slice(-4); // Get the last 4 notifications

  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const open = Boolean(anchorEl);

  //Menu state
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose=()=>{
    setAnchorEl(null); 
  };
  const handleMenuItemClick = () => {
    setAnchorEl(null);  // menu close
   navigate('/dashboard');
  };

  //Dialog state
  const handleDialogOpen = () => {
    setDialogOpen(true);
    setAnchorEl(null);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box>
      {/* Icon Button to trigger the menu */}
      <IconButton
        color="text.primary"
        size="medium"
        aria-controls={open ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={[useNoOutlineStyles()]}
      >
        <Badge badgeContent={''} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* Menu */}
      <Menu
        id="notification-menu"
        
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box>
          <Typography
            variant="h5"
            px={4}
            pt={2}
            textAlign={"center"}
            sx={{ fontWeight: "bold" }}
          >
           
            Notifications
          </Typography>
          {lastNotifications.length !== 0 && (
            <Typography variant="body2" textAlign={"center"}>
       
              You have new Notifications
            </Typography>
          )}
          <Divider component="li" />
        </Box>

        {lastNotifications.length === 0 ? (
          <MenuItem >
            <Typography variant="body1">No notifications</Typography>
          </MenuItem>
        ) : (
          lastNotifications.map((notification) => (
            <Box   key={notification.id} sx={{ display: "flex", flexDirection: "column", mt: 1 , px:4}}>
            <MenuItem
            
              onClick={handleMenuItemClick}
              sx={{ 
                minWidth: { xs: "none", md: 320 }, 
              display: "flex", flexDirection: "row", mt: 1, justifyContent:'flex-start' 
            }}
            >
            {!notification.read && (
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  backgroundColor: 'green',
                  borderRadius: '50%',
                  marginRight: '15px',
                }}
              />
            )}
            <Box sx={{   display: "flex", flexDirection: "column", alignItems:'flex-start' }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {notification.title || "Profile"}
            </Typography>
            <Typography variant="subtitle2">
            {notification.message}
            </Typography>
            </Box>
                </MenuItem>
                </Box>
          ))
        )}

     

        {/* SEE all Button */}
        { lastNotifications.length !== 0 && (
          <Box>
            <Divider variant="middle" component="li" />
            <Box sx={{ display: "flex", justifyContent: "center",mt:1 }}>
              <Button variant="outlined" onClick={handleDialogOpen}>
                View All
              </Button>
            </Box>
          </Box>
        )}
      </Menu>

      {/* Dialog component with content */}
      <NotificationDialog
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
        notifications={notifications}
      />
    </Box>
  );
}



// export default function NotificationMenu() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   //Dialog
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const handleDialogOpen = () => {
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setAnchorEl(null);
//   };

//   return (
//     <Box>
//       <IconButton
//         color="text.primary"
//         size="large"
//         aria-controls={open ? "notification-menu" : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? "true" : undefined}
//         onClick={handleClick}
//       >
//         <Badge badgeContent={""} color="error">
//           <NotificationsIcon />
//         </Badge>
//       </IconButton>
//       <Paper >
//       <Menu

//         id="notification-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleMenuClose}

//         anchorOrigin={{
//           vertical: 'bottom', // Aligns the menu to the bottom of the button
//           horizontal: 'right', // Aligns the menu to the right of the button
//         }}
//         transformOrigin={{
//           vertical: 'top', // Menu's top aligns with the button's bottom
//           horizontal: 'right', // Menu's right aligns with the button's right
//         }}
//       >
//         <MenuItem onClick={handleMenuClose} sx={{ width:{xs:'none', md:420} }}>
//           <Box sx={{display:'flex',flexDirection:'column',mt:1}}>
//             <Typography variant="body1" gutterBottom sx={{fontWeight:'bold'}}>
//               Job Profile Name1
//             </Typography>
//             <Typography variant="subtitle2" gutterBottom>
//               Your Job status has changed.
//             </Typography>
//           </Box>
//         </MenuItem>
//         <Divider component="li" />
//         <MenuItem onClick={handleMenuClose} >
//           {" "}
//           <Box sx={{display:'flex',flexDirection:'column',mt:1,}}>
//             <Typography variant="body1" gutterBottom sx={{fontWeight:'bold'}}>
//             Job Profile Name 2
//             </Typography>
//             <Typography variant="subtitle2" gutterBottom>
//               Your Job status has changed.
//             </Typography>
//           </Box>
//         </MenuItem>
//         <Divider component="li" />
//         <MenuItem >
//           {" "}
//           <Box sx={{display:'flex',flexDirection:'column',mt:1}}>
//             <Typography variant="body1" gutterBottom sx={{fontWeight:'bold'}}>
//               Job Profile Name 3
//             </Typography>
//             <Typography variant="subtitle2" gutterBottom>
//               Your Job status has changed.
//             </Typography>
//           </Box>
//         </MenuItem>
//         <Divider component="li" />
//         <MenuItem >
//         {" "}
//         <Box sx={{display:'flex',flexDirection:'column',mt:1}}>
//           <Typography variant="body1" gutterBottom sx={{fontWeight:'bold'}}>
//             Job Profile Name 4
//           </Typography>
//           <Typography variant="subtitle2" gutterBottom>
//             Your Job status has changed.
//           </Typography>
//         </Box>
//       </MenuItem>

//       <MenuItem mt={2}>
//       <Button variant='outlined' onClick={handleDialogOpen}> See All</Button>
//       </MenuItem>
//       </Menu>
//       </Paper>
//       <NotificationDialog handleDialogOpen={handleDialogOpen} handleDialogClose={handleDialogClose}/>
//     </Box>
//   );
// }

// /**
//  *     <IconButton
//     size="large"
//     aria-label="show  new notifications"
//     color="text.primary"
//   >

//   </IconButton>
//  *
//  */
