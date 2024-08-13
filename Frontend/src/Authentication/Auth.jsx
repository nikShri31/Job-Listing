import React, { useState } from "react";

import {
  Avatar,
  CssBaseline,
  Link,
  Paper,
  Grid,
  Box,
  Typography,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Login from "./Login";
import Signup from "./Signup";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(3 65 183 / 97%)",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        maxWidth="xs"
        minWidth='md'
        sx={{ backgroundPosition: "center", }}
      >
        <CssBaseline />

        <Grid
          item
          xs={12}
          sm={8}
          md={12}
          component={Paper}
          elevation={6}
          
          sx={{ backgroundColor:'', borderRadius:'9px'}}
        >
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            {isLogin ? <Login /> : <Signup />}
          </Box>

          <Grid container>
            <Grid item sx={{mx:4}}>
              <span  >
                {isLogin
                  ? " Don't have an account ?..."
                  : " Already Have an account?..."}
                <Link
                  onClick={() => setIsLogin(!isLogin)}
                  href="#"
                  variant="body1"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </Link>
              </span>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 3 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Auth;
