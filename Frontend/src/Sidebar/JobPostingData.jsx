import React from "react";
import InputField from "../Home components/InputField";
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";


const JobPostingData = ({handleChange}) => {


  const now = new Date(); 
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000); 
  const SevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000); 
  const ThirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000); 
  // console.log(twentyFourHoursAgo)

  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10); 
  const SevenDaysAgoDate = SevenDaysAgo.toISOString().slice(0, 10); 
  const ThirtyDaysAgoDate = ThirtyDaysAgo.toISOString().slice(0, 10); 
  console.log((twentyFourHoursAgoDate))
  return (
    <Box sx={{color: "#032B53"}}>
      <Typography variant="h5" sx={{m:2}}>Date of posting</Typography>
      <Box>
      <FormControl>
   
      <RadioGroup
        aria-labelledby="posting-date-radio-buttons-group"
        name="posting-date-radio-buttons-group"
        
        onChange={handleChange}
      >
        <FormControlLabel value="all time" control={<Radio />} label="Any Time" />
        <FormControlLabel value="24 hours" control={<Radio />} label="Last 24 Hours" />
        <FormControlLabel value="7 days" control={<Radio />} label="Last 7 Days" />
        <FormControlLabel value="last month" control={<Radio />} label="last Month" />
      </RadioGroup>
    </FormControl>
      </Box>
    </Box>
  );
};

export default JobPostingData;



