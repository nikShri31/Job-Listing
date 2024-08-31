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

const EmploymentType = ({ handleChange }) => (
  <Box sx={{ color: "#032B53" }}>
    <Typography variant="h5" sx={{ my: 2 }}>
      Employment Type
    </Typography>
    <Box>
      <FormControl>
        <RadioGroup onChange={handleChange}>
          <FormControlLabel value="Any" control={<Radio />} label="Any" />
          <FormControlLabel
            value="full-time"
            title="Full-time"
            name="test"
            control={<Radio />}
            label="Full-Time"
          />
          <FormControlLabel
            value="temporary"
            title="Temporary"
            name="test"
            control={<Radio />}
            label="Internship"
          />
          <FormControlLabel
            value="part-time"
            title="Part-time"
            name="test"
            control={<Radio />}
            label="Part-Time"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  </Box>
);

export default EmploymentType;
