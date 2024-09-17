import { Backdrop, Box, Button, Fade, Modal } from "@mui/material";
import React, { useState } from "react";
import Auth from "./Auth";
import { pink } from "@mui/material/colors";

const style = {
  position: "absolute",

  transform: "translate(-50%, -50%)",
  width: "100%",
  height:500,
  top: "50%",
  left: "50%",
  maxWidth: 450,
  bgcolor: "background.paper",
  borderRadius: 5,
  p: 2,
 scrollbarWidth: "none",
  overflowY: "scroll",
};
const LoginBtn = ({role}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        variant='contained'
         color="inherit"
        size="medium"
        component="a"
        onClick={handleOpen}
        sx={{ backgroundColor:'#032B53', color:'white' }} 
      >
        {role}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backdropFilter: "blur(5px)", // Apply blur effect
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Auth role={role} handleClose={handleClose}/>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default LoginBtn;
