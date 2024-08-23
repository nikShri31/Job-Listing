import { Backdrop, Box, Button, Fade, Modal } from '@mui/material';
import React from 'react'
import Auth from './Auth';


const style = {
    position: 'absolute',
    
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height:'100%',

    top: '50%',
    left: '50%',
     maxWidth: 400,
    bgcolor: 'none',
    backdropFilter: 'blur(40px)', 
    borderRadius: 5,
    boxShadow: 24,
    p: 2,
    
     overflowY:'auto',
  };
const EmployerLoginBtn = () => {

    const [open, setOpen] = React.useState(false);
 
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <>
    <Button 
   variant="outlined"
 size="small"
    component="a"
   sx={{
    color:'whitesmoke'
   }}
  
    onClick={handleOpen}
    >
    Login First
  </Button>
  <Modal
    open={open}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
      sx: {
        backdropFilter: 'blur(5px)',
      },
    }}
  >
    <Fade in={open}>
      <Box
        sx={style}
      >
        <Auth/>
      </Box>
    </Fade>
  </Modal>
    </>
  )
}

export default EmployerLoginBtn;