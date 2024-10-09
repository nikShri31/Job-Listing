import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stack
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignupOrg = ({ formData, setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone' && !/^\d*$/.test(value)) return;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="name"
              required
              fullWidth
              id="name"
              label="Organisation Name"
              value={formData.name || ''}
              onChange={handleChange}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sx={{ px: 2, py: 1 }}>
            <Typography variant="h6">Contact Info</Typography>
            <Stack direction={'row'} spacing={2} sx={{ mt: 1 }}>
              <TextField
                name="email"
                required
                label="Contact Email"
                size="small"
                value={formData?.email || ''}
                onChange={handleChange}
              />
              <TextField
                size="small"
                required
                name="phone"
                label="Contact Phone Number"
                value={formData.phone || ''}
                onChange={handleChange}
                helperText={
                  formData.phone && formData.phone.length !== 10
                    ? 'Phone number must be exactly 10 digits'
                    : ''
                }
                inputProps={{
                  maxLength: 10,
                  pattern: '[0-9]*',
                  inputMode: 'numeric', // Numeric keyboard on mobile devices
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="address"
              fullWidth
              label="Address"
              value={formData.address || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              required
              fullWidth
              type="text"
              label="Website"
              name="website"
              value={formData.website || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              required
              fullWidth
              type="text"
              label="Industry"
              name="industry"
              value={formData.industry || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              required
              fullWidth
              id="adminEmail"
              type="email"
              label="Login Email Address"
              name="adminEmail"
              value={formData.adminEmail || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default SignupOrg;

