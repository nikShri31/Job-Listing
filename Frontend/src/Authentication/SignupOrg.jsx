import { useState } from "react";
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
  Select,
  MenuItem,
  Stack
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

function SignupOrg() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await axios.post(
      "http://localhost:5000/api/organisation/signup",
      {
        name: data.get("name"),
        adminEmail: data.get("adminEmail"),
        password: data.get("password"),
        role: "Organisation",
        email: data.get("contactEmail"),
        phone: data.get("phone"),
        address: data.get("address"),
        website: data.get("website"),
        industry: data.get("industry"),
        // description: data.get("description"),
      }
    );
    localStorage.setItem("token", response.data.token);
    console.log(localStorage.getItem("token"))
    navigate('/home')
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="name"
              required
              fullWidth
              id="name"
              label="Organisation Name"
              autoFocus
            />
          </Grid>
          <Grid xs={12} sx={{px:2, py:1}}>
            <Typography variant="h6">Contact Info</Typography>
            <Stack direction={"row"} spacing={2} sx={{mt:1}}>
            <TextField name="contactEmail" required label="Contact Email" size="small" autoComplete="email"/>
            <TextField name="phone" required label="Contact Phone Number" size="small"/>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="address"
              fullWidth
              label="Address"
              autoFocus
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
          {/* <Grid item xs={12}>
            <TextField
              size="small"
              name="description"
              fullWidth
              label="Description"
              autoFocus
              multiline
            /> */}
          </Grid>
        <Grid/>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, color: "white" }}
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
}

export default SignupOrg;
