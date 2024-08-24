import React, {useState} from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import itSkills from "../../assets/itSkills";
import EditIcon from "@mui/icons-material/Edit";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const style = {
  color: "#032340",
  width: "80%",

  p: 2,
};


export default function AddProjectsBtn({formData, changeData}) {
  
  const [localFormData, setLocalFormData] = useState(formData);

 

  const handleChange = (e) =>{
    const {name, value} = e.target;
    const formDetails = {...localFormData, [name] : value};

    setLocalFormData(formDetails);
    changeData(formDetails);
  }

  return (
    <>
    {console.log(localFormData)}
      <Box sx={style}>
      <Typography id="transition-modal-title"variant="h5"  sx={{ fontWeight:'bold',}}>
      Add Projects
      </Typography>

        {/**Project Title */}
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Project Title
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "80%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField required id="outlined-required" label="Title" name="title" value={localFormData?.title || "" }onChange={handleChange}/>
        </Box>

        {/**Project Status */}

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="progress"
            value={localFormData?.progress || ""}
            onChange={handleChange}
          >
            <FormControlLabel
              value="process"
              control={<Radio />}
              label="In Process"
            />
            <FormControlLabel
              value="Finished"
              control={<Radio />}
              label="Finished"
            />
          </RadioGroup>
        </FormControl>

        {/**Project Worked From */}
        {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Duration
        </Typography>

        <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-required-label">Year</InputLabel>
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
        </FormControl> */}

        {/**Worked Till */}
        {/* <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-required-label">Year</InputLabel>
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
        </FormControl> */}

        {/**Description*/}
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Description
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "80%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Multiline"
            name="description"
            value={localFormData?.description || ""}
            onChange={handleChange}
            multiline
          />
        </Box>  
        
        {/**Role */}
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Role
        </Typography>
        <TextField required id="outlined-required" sx={{mx:1}} label="Role" name="role" onChange={handleChange}/>
      </Box>
    </>
  );
}
