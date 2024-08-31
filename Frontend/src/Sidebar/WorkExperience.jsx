import React from "react";
import InputField from "../HomeComponents/InputField";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const WorkExperience = ({ handleChange }) => (
  <Box sx={{ color: "#032B53" }}>
    <Typography variant="h5" sx={{ my: 2 }}>
      Work Experience
    </Typography>
    <Box>
      <FormControl>
        <RadioGroup onChange={handleChange}>
          <FormControlLabel value="" control={<Radio />} label="Any" />
          <FormControlLabel
            value="Internship"
            title="Internship"
            name="test"
            control={<Radio />}
            label="Fresher"
          />
          <FormControlLabel
            value="Work remotely"
            title="Work remotely"
            name="test"
            control={<Radio />}
            label="1+ Year"
          />
        
        </RadioGroup>
      </FormControl>
    </Box>
  </Box>
);

export default WorkExperience;
