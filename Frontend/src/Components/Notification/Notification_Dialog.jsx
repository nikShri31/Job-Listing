import React, { forwardRef } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  MenuItem,
  Divider,
  Slide,
  Stack,
  Container,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  clearAllNotifications,
  deleteNotification,
  markAsRead,
} from "../../store/notificationSlice";
import DeleteIcon from "@mui/icons-material/Delete";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotificationDialog({
  dialogOpen,
  handleDialogClose,
  notifications,
}) {
  const dispatch = useDispatch();
  //const notifications = useSelector((state) => state.notifications.notifications);
  // console.log(notifications);
  const unreadCount = useSelector((state) => state.notifications.unreadCount);
  //console.log(unreadCount);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
    // variant = "body2";
    disable;
  };

  const handleAddNotification = () => {
    dispatch(
      addNotification({
        id: new Date().getTime(),
        profile: "Profile :",
        message: "New notification received!", // Custom message
        read: false,
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(deleteNotification(id));
  };

  const handleDeleteAll = () => {
    dispatch(clearAllNotifications());
  };

  const handleScroll = (ref) => {
    window.scrollTo({ top: window.scrollY - 1 });

    setTimeout(() => {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <Box>
      <Dialog
     
        fullScreen
        open={dialogOpen}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "fixed",backgroundColor:'#E3F0FE' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1,color:'#032B53' }} variant="h6" component="div">
              Notifications ({unreadCount})
            </Typography>
            <Button 
            autoFocus 
              color="inherit"
            variant="contained"
            onClick={handleDeleteAll}
            sx={{ mx:2, backgroundColor:'#032B53', color:'white','&:hover':{color:'#032B53'} }} 
            >
              Delete All
            </Button>
            <Button
              autoFocus
              color="inherit"
              onClick={handleAddNotification}
              variant="contained"
              sx={{ backgroundColor:'#032B53', color:'white','&:hover':{color:'#032B53'} }} 
            >
              Add Notification
            </Button>
          </Toolbar>
        </AppBar>

        {/* Same content as the menu */}
        <Box sx={{ backgroundColor: "#E3F0FE", position: "relative" }}>
          <Box sx={{ my: 9, py: 2, alignContent: "center" }}>
            <Container>
              {notifications.map((notification, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    py: 1,
                    px: 6,
                  }}
                >
                  <MenuItem
                    key={notification.id}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      backgroundColor: notification.read ? "#FFF" : "#f0f0f0",
                    }}
                  >
                    {/* Add a valid child like Box to wrap the elements */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {!notification.read && (
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            backgroundColor: "green",
                            borderRadius: "50%",
                            marginRight: "15px",
                          }}
                        />
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{ fontWeight: "bold" }}
                        >
                          {notification.profile || "Profile"}
                        </Typography>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent={"flex-end"}
                        >
                          <Typography variant="subtitle2" gutterBottom>
                            {notification.message}
                          </Typography>
                          <Stack
                            direction={"row"}
                            justifyContent={"flex-end"}
                            sx={{ px: 15 }}
                          >
                            {!notification.read && (
                              <Button
                                onClick={() =>
                                  handleMarkAsRead(notification.id)
                                }
                              >
                                Mark as Read
                              </Button>
                            )}
                            <IconButton
                              aria-label="delete"
                              color="primary"
                              onClick={() => handleDelete(notification.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Box>
                    </Box>
                  </MenuItem>
                  <Divider />
                </Paper>
              ))}
            </Container>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

// import React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemButton from '@mui/material/ListItemButton';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
// import Slide from '@mui/material/Slide';
// import { forwardRef} from 'react';

// export default function NotificationDialog({handleDialogOpen,handleDialogClose}) {

//   return (
//     <React.Fragment>

//       <Dialog
//         fullScreen
//         open={handleDialogOpen}
//         onClose={handleDialogClose}
//         TransitionComponent={Transition}
//       >
//         <AppBar sx={{ position: 'relative' }}>
//           <Toolbar>
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={handleDialogClose}
//               aria-label="close"
//             >
//               <CloseIcon />
//             </IconButton>
//             <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//               Sound
//             </Typography>
//             <Button autoFocus color="inherit" onClick={handleDialogClose}>
//               save
//             </Button>
//           </Toolbar>
//         </AppBar>
//         <List>
//           <ListItemButton>
//             <ListItemText primary="Phone ringtone" secondary="Titania" />
//           </ListItemButton>
//           <Divider />
//           <ListItemButton>
//             <ListItemText
//               primary="Default notification ringtone"
//               secondary="Tethys"
//             />
//           </ListItemButton>
//         </List>
//       </Dialog>
//     </React.Fragment>
//   );
// }
