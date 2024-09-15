import React,{ useState } from "react";
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
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//import axios from "axios";



const Signup = ({ formData, setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNo" && !/^\d*$/.test(value)) return;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle changes for profile-related fields
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      profile: {
        ...prevData.profile,
        [name]: value,
      },
    }));
  };


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
     
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="name"
              required
              fullWidth
              id="name"
              label="Full Name"
              value={formData?.name || ''}
              onChange={handleChange}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="username"
              required
              fullWidth
              id="username"
              label="Username"
              value={formData?.username || ''}
              onChange={handleChange}
            />
          </Grid>
        {/* Profile-specific fields */}
          <Grid item xs={12}>
            <TextField
              size="small"
              name="workRole"
              required
              fullWidth
              id="role"
              label="Profile Role (e.g., Developer)"
              value={formData?.workRole || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              size="small"
              required
              fullWidth
              id="phoneNo"
              type="text"
              label="Phone Number"
              name="phoneNo"
              value={formData?.phoneNo || ''}
              onChange={handleChange}
              helperText={
                formData.phoneNo && formData.phoneNo.length !== 10
                  ? "Phone number must be exactly 10 digits"
                  : ""
              }
              inputProps={{
                maxLength: 10, 
                pattern: "[0-9]*",
                inputMode: "numeric" // Numeric keyboard on mobile devices
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              size="small"
              required
              fullWidth
              id="location"
              type="text"
              label="Location"
              name="location"
              value={formData?.location || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              value={formData?.email || ''}
              onChange={handleChange}
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData?.password || ''}
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
}




export default Signup;