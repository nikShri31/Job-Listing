import React from "react";


import {
  Box,
  ButtonGroup,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";

const Salary = ({ handleChange }) => (
  <Stack textAlign={"left"} sx={{ color: "#032B53" }}>
    <Typography variant="h5" sx={{ my: 2 }}>
      Salary
    </Typography>
    <Box>
      <FormControl>
        <RadioGroup onChange={handleChange}>
          <FormControlLabel
            value=""
            name="test2"
            control={<Radio />}
            label="Any"
          />
          <FormControlLabel
            value={30}
            name="test2"
            control={<Radio />}
            label="<5 LPA"
          />
          <FormControlLabel
            value={50}
            name="test2"
            control={<Radio />}
            label="<10 LPA"
          />
          <FormControlLabel
            value={100}
            name="test2"
            control={<Radio />}
            label="10+ LPA"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  </Stack>
);

export default Salary;

//     <FormControlLabel value="Any" control={<Radio />} label="Any" />
