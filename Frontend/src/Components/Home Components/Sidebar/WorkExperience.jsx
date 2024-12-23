import React from "react";

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
            value="Fresher"
            title="Fresher"
            name="test"
            control={<Radio />}
            label="Fresher"
          />
          <FormControlLabel
            value="1"
            title="1"
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
