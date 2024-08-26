import React from 'react'
import InputField from '../HomeComponents/InputField'
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'

const WorkExperience = ({handleChange}) => {
  const [value, setValue] = React.useState('');

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Box sx={{color: "#032B53"}}>
         <Typography variant='h5' sx={{m:2}}>Work experience </Typography>

      <Box>
      <FormControl>
      
      <RadioGroup
        aria-labelledby="exp-radio-buttons-group"
        name="exp-radio-buttons-group"
      
        onChange={handleChange}
      >
        <FormControlLabel value="Fresher" control={<Radio />} label="Fresher" />
        <FormControlLabel value="1 year" control={<Radio />} label="<1 year" />
        <FormControlLabel value="3 year" control={<Radio />} label="<3 Years" />
        <FormControlLabel value="3+ year" control={<Radio />} label=" 3+ Years" />
        <FormControlLabel value="10 year" control={<Radio />} label=">10+ Years" />
      </RadioGroup>
    </FormControl>
      </Box>
    </Box>
  )
}

export default WorkExperience