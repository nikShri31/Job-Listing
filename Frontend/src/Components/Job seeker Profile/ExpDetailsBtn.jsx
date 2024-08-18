import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  ButtonGroup,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import itSkills from "../../assets/itSkills";

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

export default function ExpEditBtn() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [selectedSkills, setSelectedSkills] = React.useState([]);

  const handleSkillChange = (event, newValue) => {
    if (Array.isArray(newValue)) {
      setSelectedSkills(newValue); // Only set the array if it's valid
    }
  };

  const handleDelete = (skillToDelete) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.filter((skill) => skill.title !== skillToDelete.title)
    );
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={{color:'whitesmoke'}}>Add Experience</Button>
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
              Experience
            </Typography>

            {/**Employment */}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Employment
            </Typography>
            <FormControl required sx={{ m: 1, minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-required-label">
                Employment
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={age}
                label="Age *"
                onChange={handleChange}
              >
                <MenuItem value={10}>Current</MenuItem>
                <MenuItem value={20}>Previous</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>

            {/**Employment Type */}

            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="fullTime"
                  control={<Radio />}
                  label="Full Time"
                />
                <FormControlLabel
                  value="Internship"
                  control={<Radio />}
                  label="Internship"
                />
              </RadioGroup>
            </FormControl>

            {/** Experience */}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Experience
            </Typography>

            <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
              <InputLabel id="demo-select-small-label">Exp</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Fresher</em>
                </MenuItem>
                <MenuItem value={1}>1 year</MenuItem>
                <MenuItem value={2}>2 years</MenuItem>
                <MenuItem value={3}>3 years</MenuItem>
                <MenuItem value={4}>3+ years</MenuItem>
              </Select>
            </FormControl>

            {/** Company Name */}

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Company Name
            </Typography>

            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField required id="outlined-required" label="Required" />
            </Box>

            {/**Job title */}

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Job Title
            </Typography>

            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField required id="outlined-required" label="Required" />
            </Box>

            {/*Joining Date */}

            {/* Skills Used */}

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Skills
            </Typography>

            <Stack spacing={3} sx={{ width: 300 }}>
              <Autocomplete
                multiple
                limitTags={3}
                id="multiple-limit-tags"
                options={itSkills}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Skills" />
                )}
                sx={{ width: "350px" }}
              />
            </Stack>

            {/*notice period */}

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Notice Period
            </Typography>

            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>15 Days or Less</MenuItem>
                <MenuItem value={20}>1 Month</MenuItem>
                <MenuItem value={30}>60 Days or More</MenuItem>
              </Select>
            </FormControl>

            {/**Submit */}
            <Box sx={{ m: 1 }}>
              <ButtonGroup aria-label="Loading button group">
                <Button variant="contained" sx={{ m: 1 }}>
                  Submit
                </Button>
                <Button variant="outlined" onClick={handleClose} sx={{ m: 1 }}>
                  cancel
                </Button>
              </ButtonGroup>
            </Box>

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
