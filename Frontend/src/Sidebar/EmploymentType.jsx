import React from 'react'
import InputField from '../HomeComponents/InputField'
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const EmploymentType = ({handleChange}) => {
  
  return (
    <Box sx={{color: "#032B53"}}>
    <Typography variant='h5' sx={{m:2,}}>Eployment Type</Typography>
 <Box>
 <FormControl>
  <RadioGroup
   aria-labelledby="emp-radio-buttons-group"
   name="emp-radio-buttons-group"
   
   onChange={handleChange}
 >
   <FormControlLabel value="Any" control={<Radio />} label="Any" />
   <FormControlLabel value="fullTime" control={<Radio />} label="Full-Time" />
   <FormControlLabel value="intern" control={<Radio />} label="Internship" />
   <FormControlLabel value="partTime" control={<Radio />} label="Part-Time" />
   
 </RadioGroup>
</FormControl>
 </Box>
</Box>
  )
}

export default EmploymentType;