import { Backdrop, Box, Button, Fade, Modal } from "@mui/material";
import React from "react";
import Auth from "./Auth";
import { pink } from "@mui/material/colors";

const style = {
  position: "absolute",

  transform: "translate(-50%, -50%)",
  width: "100%",
  minheight: "100%",
  top: "50%",
  left: "50%",
  maxWidth: 450,
  bgcolor: "background.paper",
  borderRadius: 5,
  p: 2,
  overflowY: "auto",
};
const LoginBtn = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        variant="contained"
        size="small"
        component="a"
        onClick={handleOpen}
        sx={{
          color: pink[800],
        }}
      >
        Login
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
            <Auth />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default LoginBtn;
