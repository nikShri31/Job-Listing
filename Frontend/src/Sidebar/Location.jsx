// import { Input } from "postcss";
import React from "react";
import InputField from "../HomeComponents/InputField";
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";

const Location = ({ handleChange }) => {
  return (
    <Box sx={{color: "#032B53"}}>
      <Typography variant="h5" sx={{m:2,}} className="text-lg font-medium mb-2">Location</Typography>
      <Box>
      <FormGroup
      onChange={handleChange}
      >
      <FormControlLabel control={<Checkbox defaultChecked />} label="All" />
      <FormControlLabel control={<Checkbox />} label="Benglore" />
      <FormControlLabel control={<Checkbox />} label="Dehli NCR" />
      <FormControlLabel control={<Checkbox />} label="Mumbai" />
      <FormControlLabel control={<Checkbox />} label="Hydrabad" />
     
    </FormGroup>
      
      </Box>
    </Box>
  );
};

export default Location;


 { // <label className="sidebar-label-container">
        //   <input onChange={handleChange} type="radio" value="" name="test" />
        //   <span className="checkmark"></span>All
        // </label>

        //  <InputField
        //   handleChange={handleChange}
        //   value="london"
        //   title="London"
        //   name="test"
        // /> 
        // <InputField
        //   handleChange={handleChange}
        //   value="seattle"
        //   title="Seattle"
        //   name="test"
        // />
        // <InputField
        //   handleChange={handleChange}
        //   value="madrid"
        //   title="Madrid"
        //   name="test"
        // />
        // <InputField
        //   handleChange={handleChange}
        //   value="boston"
        //   title="Boston"
        //   name="test"
        // />
      }