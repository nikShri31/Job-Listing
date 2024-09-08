import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
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

const style = {
  color: "#032340",
  width: "80%",
  p: 2,
};


export default function ExpEditBtn({ formData, changeData }) {
  const [localFormData, setLocalFormData] = useState({
    ...formData,
    employment: "Working",
    employmentType: "",
    experience: 0,
    employmentRecord: {
      organisation: "",
      role: "",
    },
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "organisation" || name === "role") {
      setLocalFormData((prevData) => ({
        ...prevData,
        employmentRecord: {
          ...prevData.employmentRecord,
          [name]: value,
        },
      }));
    } else {
      setLocalFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      
    }
    changeData(localFormData);
  };

  useEffect(() => {
    if(formData) setLocalFormData(formData);
  }, [formData]);
  
  return (
    <>
      <Box sx={style}>
        <Typography
          id="transition-modal-title"
          variant="h5"
          sx={{ fontWeight: "bold", my: 1 }}
        >
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
            value={localFormData?.employment || ""}
            label="Employment"
            name="employment"
            onChange={handleChange}
          >
            <MenuItem value={"Working"}>Working</MenuItem>
            <MenuItem value={"Unemployed"}>Unemployed</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        {/**Employment Type */}

        <FormControl m={2}>
          <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="employmentType"
            value={localFormData?.employmentType || ""}
            onChange={handleChange}
          >
            <FormControlLabel
              value="FullTime"
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

        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <TextField
            id="experience-input"
            label="Experience in Years"
            type="number"
            value={localFormData?.experience || 0}
            name="experience"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        {/** Company Name */}

        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Previous Employment Record
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined"
            label="Organisation"
            value={localFormData?.employmentRecord?.organisation || ""}
            name="organisation"
            onChange={handleChange}
          />
          <TextField
            id="outlined"
            label="Job Profile"
            value={localFormData?.employmentRecord?.role || ""}
            name="role"
            onChange={handleChange}
          />
        </Box>

        {/* notice period */}


            {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
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
            </FormControl> */}
      </Box>
    </>
  );
}
