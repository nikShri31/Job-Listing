import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Badge, Stack } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginBtn from "../Authentication/LoginBtn";
import NotificationMenu from "../Components/Notification/Notification_Menu";

const pages = ["Home", "My Jobs", "Profile"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const headingStyles = {
  my: 2,
  textDecoration: "none",
  display: "block",
  transition: "box-shadow 0.3s ease-in-out",
  "&:focus": {
    outline: "none",
  },
  "&:hover": {
    boxShadow: ` 10px 10px 10px #00000041, inset 5px 5px 6px rgba(0, 0, 0, 0.2) `,
    fontWeight: "bold",
  },
};

function Header_2() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();
  const { isAuthenticated, userRole, userInfo } = useSelector( (state) => state.auth );

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleCloseUserMenu();
    dispatch(logout());
  };

  return (
    <Box>
      <AppBar
        position="sticky"
        sx={{
          boxShadow: 0,
          bgcolor: " #E3F0FE",
          pt: 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            variant="regular"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor: "primary",
              backdropFilter: "blur(30px)",
              maxHeight: 40,

              border: "1px solid",
              borderColor: "divider",
              boxShadow: 1,
            }}
          >
            <AdbIcon
              sx={{ display: { xs: "none", md: "flex", lg: "flex" }, mr: 1 }}
            />

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex", lg: "flex" },
                fontFamily: "monospace",
                fontWeight: "bold",
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              JOBS
            </Typography>
            {/** Small screen */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <MenuItem
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchororigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepmounted="true"
                transformorigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </MenuItem>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#"
              color="text.primary"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: "bold",
                letterSpacing: ".3rem",

                textDecoration: "none",
              }}
            >
              JOBS
            </Typography>

          { isAuthenticated ? (
              <React.Fragment>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex", lg: "flex" },
                    gap: 0.5,
                    alignItems: "right",
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.1) translateZ(30px)",
                    },
                  }}
                >
                  <LoginBtn
                    role="Individual"
                    variant={"outlined"}
                    bgColor={"grey"}
                  />
                  <LoginBtn
                    role="Organisation"
                    variant={"outlined"}
                    bgColor={"black"}
                  />
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex", lg: "flex" },
                  }}
                >
                  <Button sx={headingStyles} onClick={() => navigate("/home")}>
                  Jobs
                  </Button>
                  <Button
                    sx={headingStyles}
                    onClick={() => navigate("/dashboard")}
                  >
                    MyJobs
                  </Button>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Stack direction={"row"} spacing={3}>
                    <MenuItem>
                     <NotificationMenu/>
                    </MenuItem>

                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={()=> navigate("/profile")}>
                        <Typography textAlign="center">Profile</Typography>
                      </MenuItem>
                      <MenuItem>
                        <Typography textAlign="center">Dashboard</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </Stack>
                </Box>
              </React.Fragment>
            )
         }
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default Header_2;

// import React, { useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";

// import AdbIcon from "@mui/icons-material/Adb";
// import { Badge, Stack } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";

// import Divider from "@mui/material/Divider";
// import MenuItem from "@mui/material/MenuItem";
// import Drawer from "@mui/material/Drawer";
// import LoginBtn from "../Authentication/LoginBtn";

// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { logout } from "../store/authSlice";

// const menuItem = ["About", "Highlight"];
// const pages = ["Home", "My Jobs", "Profile"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];
// const headingStyles = {
//   my: 2,
//   textDecoration: "none",
//   display: "block",
//   transition: "box-shadow 0.3s ease-in-out",
//   "&:focus": {
//     outline: "none",
//   },
//   "&:hover": {
//     boxShadow: ` 10px 10px 10px #00000041, inset 5px 5px 6px rgba(0, 0, 0, 0.2) `,
//     fontWeight: "bold",
//   },
// };

// function Header_2() {
//   const [open, setOpen] = React.useState(false);
//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//   };

//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const user = useSelector((state) => state.auth.user);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     handleCloseUserMenu();
//     dispatch(logout());
//     navigate("/");
//   };

//   const scrollToSection = (sectionId) => {
//     const sectionElement = document.getElementById(sectionId);
//     const offset = 128;
//     if (sectionElement) {
//       const targetScroll = sectionElement.offsetTop - offset;
//       sectionElement.scrollIntoView({ behavior: "smooth" });
//       window.scrollTo({
//         top: targetScroll,
//         behavior: "smooth",
//       });
//       setOpen(false);
//     }
//   };

//   return (
//     <Box>
//       <AppBar
//         position="sticky"
//         sx={{
//           boxShadow: 0,
//           bgcolor: " #E3F0FE",
//           pt: 1,
//         }}
//       >
//         <Container maxWidth="xl">
//           <Toolbar
//             variant="regular"
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               flexShrink: 0,
//               borderRadius: "999px",
//               bgcolor: "primary",
//               backdropFilter: "blur(30px)",
//               maxHeight: 40,

//               border: "1px solid",
//               borderColor: "divider",
//               boxShadow: 1,
//             }}
//           >
//             <AdbIcon
//               sx={{ display: { xs: "none", md: "flex", lg: "flex" }, mr: 1 }}
//             />

//             <Typography
//               variant="h6"
//               noWrap
//               component="a"
//               href="#"
//               sx={{
//                 mr: 2,
//                 display: { xs: "none", md: "flex", lg: "flex" },
//                 fontFamily: "monospace",
//                 fontWeight: "bold",
//                 letterSpacing: ".3rem",
//                 color: "black",
//                 textDecoration: "none",
//               }}
//             >
//               JOBS
//             </Typography>
//             {isAuthenticated ? (
//               <>
//                 <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//                   <IconButton
//                     size="large"
//                     aria-label="account of current user"
//                     aria-controls="menu-appbar"
//                     aria-haspopup="true"
//                     onClick={handleOpenNavMenu}
//                     color="inherit"
//                   >
//                     <MenuIcon />
//                   </IconButton>
//                   <MenuItem
//                     id="menu-appbar"
//                     anchorEl={anchorElNav}
//                     anchororigin={{
//                       vertical: "bottom",
//                       horizontal: "left",
//                     }}
//                     keepmounted="true"
//                     transformorigin={{
//                       vertical: "top",
//                       horizontal: "left",
//                     }}
//                     open={Boolean(anchorElNav)}
//                     onClose={handleCloseNavMenu}
//                     sx={{
//                       display: { xs: "block", md: "none" },
//                     }}
//                   >
//                     {pages.map((page) => (
//                       <MenuItem key={page} onClick={handleCloseNavMenu}>
//                         <Typography textAlign="center">{page}</Typography>
//                       </MenuItem>
//                     ))}
//                   </MenuItem>
//                 </Box>

//                 <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//                 <Typography
//                   variant="h5"
//                   noWrap
//                   component="a"
//                   href="#"
//                   color="text.primary"
//                   sx={{
//                     mr: 2,
//                     display: { xs: "flex", md: "none" },
//                     flexGrow: 1,
//                     fontFamily: "monospace",
//                     fontWeight: "bold",
//                     letterSpacing: ".3rem",

//                     textDecoration: "none",
//                   }}
//                 >
//                   JOBS
//                 </Typography>

//                 {/** For md or lg screen */}
//                 <Box
//                   sx={{
//                     flexGrow: 1,
//                     display: { xs: "none", md: "flex", lg: "flex" },
//                   }}
//                 >
//                   <Button sx={headingStyles} onClick={() => navigate("/home")}>
//                     Home
//                   </Button>
//                   <Button
//                     sx={headingStyles}
//                     onClick={() => navigate("/dashboard")}
//                   >
//                     MyJobs
//                   </Button>
//                 </Box>

//                 <Box sx={{ flexGrow: 0 }}>
//                   <Stack direction={"row"} spacing={3}>
//                     <MenuItem>
//                       <IconButton
//                         size="large"
//                         aria-label="show 17 new notifications"
//                         color="text.primary"
//                       >
//                         <Badge badgeContent={""} color="error">
//                           <NotificationsIcon />
//                         </Badge>
//                       </IconButton>
//                     </MenuItem>

//                     <Tooltip title="Open settings">
//                       <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                         <Avatar
//                           alt="Remy Sharp"
//                           src="/static/images/avatar/2.jpg"
//                         />
//                       </IconButton>
//                     </Tooltip>
//                     <Menu
//                       sx={{ mt: "45px" }}
//                       id="menu-appbar"
//                       anchorEl={anchorElUser}
//                       anchorOrigin={{
//                         vertical: "top",
//                         horizontal: "right",
//                       }}
//                       transformOrigin={{
//                         vertical: "top",
//                         horizontal: "right",
//                       }}
//                       open={Boolean(anchorElUser)}
//                       onClose={handleCloseUserMenu}
//                     >
//                       <MenuItem onClick={() => navigate("/profile")}>
//                         <Typography textAlign="center">Profile</Typography>
//                       </MenuItem>
//                       <MenuItem>
//                         <Typography textAlign="center">Dashboard</Typography>
//                       </MenuItem>
//                       <MenuItem onClick={handleLogout}>
//                         <Typography textAlign="center">Logout</Typography>
//                       </MenuItem>
//                     </Menu>
//                   </Stack>
//                 </Box>
//               </>
//             ) : (
//               <>
//                 <Box
//                   sx={{
//                     display: { xs: "none", md: "flex" },
//                   }}
//                 >
//                   {menuItem.map((item, index) => (
//                     <MenuItem
//                       key={index}
//                       sx={{
//                         py: "6px",
//                         px: "12px",
//                         transition: "box-shadow 0.3s ease-in-out",
//                         "&:hover": {
//                           transform: "scale(1.1) translateZ(30px)",
//                         },
//                       }}
//                       onClick={() => scrollToSection({ item })}
//                     >
//                       <Typography
//                         key={index}
//                         variant="body2"
//                         color="text.primary"
//                       >
//                         {item}
//                       </Typography>
//                     </MenuItem>
//                   ))}
//                 </Box>

//                 {/*Login Modal */}
//                 <Box
//                   sx={{
//                     display: { xs: "none", md: "flex", lg: "flex" },
//                     gap: 0.5,
//                     alignItems: "center",
//                     transition: "box-shadow 0.3s ease-in-out",
//                     "&:hover": {
//                       transform: "scale(1.1) translateZ(30px)",
//                     },
//                   }}
//                 >
//                   <LoginBtn
//                     role="Individual"
//                     variant={"outlined"}
//                     bgColor={"grey"}
//                   />
//                   <LoginBtn
//                     role="Organisation"
//                     variant={"outlined"}
//                     bgColor={"black"}
//                   />
//                 </Box>

//                 {/** App Drawer for small screens */}
//                 <Box sx={{ display: { sm: "", md: "none" } }}>
//                   <Button
//                     variant="text"
//                     color="primary"
//                     aria-label="menu"
//                     onClick={toggleDrawer(true)}
//                     sx={{ minWidth: "30px", p: "4px" }}
//                   >
//                     <MenuIcon />
//                   </Button>
//                   <Drawer
//                     anchor="right"
//                     open={open}
//                     onClose={toggleDrawer(false)}
//                   >
//                     <Box
//                       sx={{
//                         minWidth: "60dvw",
//                         p: 2,
//                         backgroundColor: "background.paper",
//                         flexGrow: 1,
//                       }}
//                     >
//                       <MenuItem onClick={() => scrollToSection("testimonials")}>
//                         About
//                       </MenuItem>
//                       <MenuItem onClick={() => scrollToSection("highlights")}>
//                         Highlights
//                       </MenuItem>

//                       <Divider />

//                       <MenuItem>
//                         <LoginBtn
//                           color="primary"
//                           variant="outlined"
//                           component="a"
//                           sx={{ width: "80%" }}
//                         />
//                       </MenuItem>
//                     </Box>
//                   </Drawer>
//                 </Box>
//               </>
//             )}
//           </Toolbar>
//         </Container>
//       </AppBar>
//     </Box>
//   );
// }
// export default Header_2;
