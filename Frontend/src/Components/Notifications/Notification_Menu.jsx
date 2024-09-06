import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Badge, Box, IconButton, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="text.primary"
        size="large"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={""} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
      
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Box sx={{diaplay:'flex',flexDirection:'column',mt:1}}>
            <Typography variant="body1" gutterBottom sx={{fontWeight:'bold'}}>
              Job Profile Name1
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Your Job status has changed.
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Box sx={{diaplay:'flex',flexDirection:'column',mt:1,}}>
            <Typography variant="body1" gutterBottom sx={{fontWeight:'bold'}}>
              Job Profile Name 2
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Your Job status has changed.
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Box sx={{diaplay:'flex',flexDirection:'column',mt:1}}>
            <Typography variant="body1" gutterBottom sx={{fontWeight:'bold'}}>
              Job Profile Name 3
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Your Job status has changed.
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        {" "}
        <Box sx={{diaplay:'flex',flexDirection:'column',mt:1}}>
          <Typography variant="body1" gutterBottom sx={{fontWeight:'bold'}}>
            Job Profile Name 4
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Your Job status has changed.
          </Typography>
        </Box>
      </MenuItem>
      </Menu>
    </div>
  );
}

/**
 *     <IconButton
    size="large"
    aria-label="show  new notifications"
    color="text.primary"
  >
    
  </IconButton>
 * 
 */