import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  ButtonGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  color:'#032340',
  transform: "translate(-50%, -50%)",
  width: "100%",
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

export default function EducationEditBtn() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={{color:'whitesmoke'}}>Add Education</Button>
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
              Education
            </Typography>
            {/**Education */}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Education
            </Typography>
            <FormControl required sx={{ m: 1, minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-required-label">
                Education
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={age}
                label="Age *"
                onChange={handleChange}
              >
                <MenuItem value={10}>Doctarate/Phd</MenuItem>
                <MenuItem value={20}>Masters/PostGraduation</MenuItem>
                <MenuItem value={30}>Graduation/Diploma</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            {/*University/College*/}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              University/College
            </Typography>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <TextField fullWidth label="College" id="fullWidth" />
            </Box>

            {/*Course*/}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Course
            </Typography>
            <FormControl required sx={{ m: 1, minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-required-label">
                Course
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={age}
                label="Age *"
                onChange={handleChange}
              >
                <MenuItem value={10}>B.Tech</MenuItem>
                <MenuItem value={20}>M.Tech/MCA</MenuItem>
                <MenuItem value={30}>BCA</MenuItem>
                <MenuItem value={30}>Diploma</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            {/**Specialization */}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Specialization
            </Typography>
            <FormControl required sx={{ m: 1, minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-required-label">
                Education
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={age}
                label="Age *"
                onChange={handleChange}
              >
                <MenuItem value={10}>Doctarate/Phd</MenuItem>
                <MenuItem value={20}>Masters/PostGraduation</MenuItem>
                <MenuItem value={30}>Graduation/Diploma</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            {/**Course Type */}

            <FormControl sx={{ mt: 2 }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Course Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="full Time"
                  control={<Radio />}
                  label="full Time"
                />
                <FormControlLabel
                  value="Part Time"
                  control={<Radio />}
                  label="Part Time"
                />
                <FormControlLabel
                  value="Distance"
                  control={<Radio />}
                  label="Distance"
                />
              </RadioGroup>
            </FormControl>

            {/*Course Duration */}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Course Duration(Years)
            </Typography>
            {/*Start */}
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">
                Age
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={age}
                label="Age *"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">
                Age
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={age}
                label="Age *"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            {/*Grade */}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Grade
            </Typography>

            <FormControl required sx={{ m: 1, minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-required-label">
                Grade
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={age}
                label="Age *"
                onChange={handleChange}
              >
                <MenuItem value={10}>Percentage [%]</MenuItem>
                <MenuItem value={20}>GPA</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

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
