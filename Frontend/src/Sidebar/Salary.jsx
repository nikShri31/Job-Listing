import React from "react";

import InputField from "../Home components/InputField";
import { Box, ButtonGroup, Typography,Button, FormControl, RadioGroup, FormControlLabel, Radio, Stack } from "@mui/material";


const Salary = ({handleChange,handleClick }) => {
  const [value, setValue] = React.useState('');

  return (
    <Stack textAlign={'left'} sx={{color: "#032B53"}}>
      <Typography variant="h5" sx={{m:2,}}>Salary</Typography>
      {/* salaryType filtering */}
      <ButtonGroup variant="outlined" aria-label="Basic button group">
      <Button onClick={handleClick}>Hourly</Button>
      <Button onClick={handleClick}>Monthly</Button>
      <Button onClick={handleClick}>Yearly</Button>
    </ButtonGroup>

      <Box>
      <FormControl>
      
      <RadioGroup
        aria-labelledby="salary-radio-buttons-group"
        name="salary-radio-buttons-group"
       
        onChange={handleChange}
      >
        <FormControlLabel value="Any" control={<Radio />} label="Any" />
        <FormControlLabel value="3 LPA" control={<Radio />} label="<3 LPA" />
        <FormControlLabel value="6 LPA" control={<Radio />} label="<6 LPA" />
        <FormControlLabel value="10 LPA" control={<Radio />} label="<10 LPA" />
        <FormControlLabel value="LPA" control={<Radio />} label=">10 LPA" />
      </RadioGroup>
    </FormControl>
      </Box>
    </Stack>
  );
};

export default Salary;
