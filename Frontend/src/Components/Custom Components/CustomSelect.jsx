import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const CustomSelect = ({ label, value, onChange, options }) => {
  return (
    <FormControl required sx={{ m: 1, minWidth: "80%" }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Required</FormHelperText>
    </FormControl>
  );
};

export default CustomSelect;