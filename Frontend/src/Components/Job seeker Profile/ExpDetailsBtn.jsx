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
  color: "#032340",
  width: "80%",
  p: 2,
 
};

export default function ExpEditBtn() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [employment, setEmployment] = React.useState("");

  const handleEmpChange = (event) => {
    setEmployment(event.target.value);
  };
  const [exp, setExp] = React.useState("");

  const handleExpChange = (event) => {
    setExp(event.target.value);
  };

  const [notice, setNotice] = React.useState("");

  const handleNoticeChange = (event) => {
    setNotice(event.target.value);
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
    <>
     
          <Box sx={style}>
          <Typography id="transition-modal-title"variant="h5"  sx={{ fontWeight:'bold',my:1}}>
          Add Experience
          </Typography>


            {/**Employment */}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Employment
            </Typography>
            <FormControl required sx={{ m: 1, minWidth: "70%" }}>
              <InputLabel id="demo-simple-select-required-label">
                Employment
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={employment}
                label="Employment*"
                onChange={handleEmpChange}
                required
              >
                <MenuItem value={10}>Working</MenuItem>
                <MenuItem value={20}>Unemployed</MenuItem>
              </Select>
              
            </FormControl>

            {/**Employment Type */}

            <FormControl m={2}>
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
                  value="internship"
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
                value={exp}
                label="Exp"
                onChange={handleExpChange}
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
            <TextField required id="outlined-required" label="Company" />
            <TextField required id="outlined-required" label="Job Profile" />
            </Box>
           
           

            {/*Joining Date */}

            {/* Skills Used */}

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Skills
            </Typography>

            <Stack spacing={3} sx={{ width:'50%' }}>
              <Autocomplete
                multiple
                limitTags={3}
                id="multiple-limit-tags"
                options={itSkills}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Skills" value={selectedSkills} onChange={handleSkillChange} />
                )}
                sx={{ width: "130%" }}
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
                value={notice}
                onChange={handleNoticeChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={15}>15 Days or Less</MenuItem>
                <MenuItem value={30}>30 Days</MenuItem>
                <MenuItem value={60}>60 Days or More</MenuItem>
              </Select>
            </FormControl>
          </Box>
       
    </>
  );
}
