import React from 'react';
import { TextField, Box } from '@mui/material';

const CustomTextField = ({ label, name, value, onChange, multiline = false }) => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "80%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id={`outlined-${name}`}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        multiline={multiline}
      />
    </Box>
  );
};

export default CustomTextField;