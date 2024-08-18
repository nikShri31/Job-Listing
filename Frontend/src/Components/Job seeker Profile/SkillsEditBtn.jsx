import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Autocomplete, ButtonGroup, Stack, TextField } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import countries from '../../assets/countryList';
import itSkills from '../../assets/itSkills';

const style = {
 color:'#032340',
  position: "absolute",
  transform: "translate(-50%, -50%)",
  width: "200%",
  height: "80%",
  top: "50%",
  left: "50%",
  maxWidth: 400,
  bgcolor: "background.paper",
  backdropFilter: "blur(40px)",
  borderRadius: 5,
  boxShadow: 24,
  p: 2,
  overflowY: "auto",
};

export default function SkillsEditBtn() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}  sx={{color:'whitesmoke'}}><EditIcon/></Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backdropFilter: "blur(5px)",
            },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5"  sx={{ fontWeight:'bold',}}>
              Key Skills
            </Typography>
            <Stack spacing={3} sx={{ width: '90%' }}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={itSkills}
              getOptionLabel={(option) => option.title}
              
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Multiple values"
                 
                />
              )}
            />
            </Stack>

             {/**Submit */}
             <Box sx={{ m: 1 }}>
             <ButtonGroup aria-label="Loading button group">
               <Button variant="contained" sx={{ m: 1 }} >
                 Submit
               </Button>
               <Button variant="outlined" onClick={handleClose} sx={{ m: 1 }}>cancel</Button>
             </ButtonGroup>
           </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
