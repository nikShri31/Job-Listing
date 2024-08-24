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
  Link,
  Alert,
} from "@mui/material";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const route = "http://localhost:5000/";

function Login({role}) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmitOrg = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const adminEmail = data.get("email");
    const password = data.get("password");
    const response = await axios.post(`${route}api/organisation/login`, { adminEmail, password });
    localStorage.setItem("token", response.data.token);
    navigate('/home')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const response = await axios.post(`${route}api/login`, { email, password });
    localStorage.setItem("token", response.data.token);
    console.log(localStorage.getItem("token"));
    navigate('/home') 
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={role === "Individual" ? () => handleSubmit : () => handleSubmitOrg}
        sx={{ mx: 3, my: 8 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              required
              fullWidth
              id="email"
              type="email"
              label="Email"
              name="email"
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
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(evt) => evt.preventDefault()}
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

        <Grid item xs sx={{ mt: 2 }}>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>

        {error && (
          <Alert severity="error">ERROR : This is a filled error.</Alert>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, color: "white" }}
        >
          Sign In
        </Button>
      </Box>
    </>
  );
}

export default Login;
