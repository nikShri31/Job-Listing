import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, CssBaseline, Paper, Box, Avatar, Link, Button, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login, signup, loginWithToken} from '../store/authSlice.js'; // Update the import path as needed
import Login from './Login';
import Signup from './Signup';
import SignupOrg from './SignupOrg';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Job Finder
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


const Auth = ({ role }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loginWithToken(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'employer'?"/jobs":'/jobs');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login({ loginData: formData, role }));
    } else {
      dispatch(signup({ signupData: formData, role }));
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "" }); // Reset form data when switching modes
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" maxWidth="xs" minWidth="md" sx={{ backgroundPosition: "center" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={12} component={Paper} elevation={6} sx={{ backgroundColor: "", borderRadius: "9px" }}>
          <Box sx={{ mx: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? "Log In" : "Sign Up"}
            </Typography>

            <form onSubmit={handleSubmit}>
              {isLogin ? (
                <Login formData={formData} setFormData={setFormData} />
              ) : role === "employee" ? (
                <Signup formData={formData} setFormData={setFormData} />
              ) : (
                <SignupOrg formData={formData} setFormData={setFormData} />
              )}

              {error && <Typography color="error">{error}</Typography>}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                disabled={loading}
              >
                {loading ? "Processing..." : (isLogin ? "Log In" : "Sign Up")}
              </Button>
            </form>

            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link href="#" variant="body2" onClick={toggleAuthMode}>
                  {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Copyright sx={{ mt: 5 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

 export default Auth;



// import React, { useState } from "react";

// import {
//   Avatar,
//   CssBaseline,
//   Link,
//   Paper,
//   Grid,
//   Box,
//   Typography,
// } from "@mui/material";

// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// import Login from "./Login";
// import Signup from "./Signup";
// import SignupOrg from "./SignupOrg";

// import { useDispatch, useSelector } from 'react-redux';
// import { login, signup } from "../store/authSlice";
// import { useNavigate } from 'react-router-dom'; 

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Job Finder
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const defaultTheme = createTheme({
//   palette: {
//     primary: {
//       main: "rgb(3 65 183 / 97%)",
//     },
//     secondary: {
//       main: "#dc004e",
//     },
//   },
// });

// const Auth = ({ role }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error, isAuthenticated,user } = useSelector((state) => state.auth); // Get auth state from Redux

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isLogin) {
//       // Login action, pass role to determine API endpoint
//       dispatch(login({ loginData: formData, role }));
//     } else {
//       // Signup action, pass role to determine API endpoint
//       dispatch(signup({ signupData: formData, role }));
//     }
//   };

//   // If login/signup is successful, navigate or update UI
//   if (isAuthenticated) {
//     // After successful login/signup, you can update the UI here (e.g., header buttons)
//     // and navigate or refresh, as needed.
//     navigate("/jobs"); // Or whatever your desired page is
//   }

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid
//         container
//         component="main"
//         maxWidth="xs"
//         minWidth="md"
//         sx={{ backgroundPosition: "center" }}
//       >
//         <CssBaseline />
//         <Grid
//           item
//           xs={12}
//           sm={8}
//           md={12}
//           component={Paper}
//           elevation={6}
//           sx={{ backgroundColor: "", borderRadius: "9px" }}
//         >
//           <Box
//             sx={{
//               mx: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>

//             {/* Form Submission */}
//             <form onSubmit={handleSubmit}>
//               {/* Conditional rendering of Login or Signup form based on isLogin state */}
//               {isLogin ? (
//                 <Login formData={formData} setFormData={setFormData} role={role} />
//               ) : role === "individual" ? (
//                 <Signup formData={formData} setFormData={setFormData} />
//               ) : (
//                 <SignupOrg formData={formData} setFormData={setFormData} />
//               )}

//               {/* Show loading or error state */}
//               {loading && <p>Loading...</p>}
//               {error && <p style={{ color: "red" }}>{error}</p>}

//               {/* Submit button */}
//              { // <button type="submit">
//               //   {isLogin ? "Log In" : "Sign Up"}
//               // </button>
//               }
//             </form>
//           </Box>

//           <Grid container>
//             <Grid item sx={{ mx: 4 }}>
//               <span>
//                 {isLogin
//                   ? "Don't have an account? "
//                   : "Already have an account? "}
//                 <Link
//                   onClick={() => setIsLogin(!isLogin)}
//                   href="#"
//                   variant="body1"
//                 >
//                   {isLogin ? "Sign up" : "Log in"}
//                 </Link>
//               </span>
//             </Grid>
//           </Grid>

//           <Copyright sx={{ mt: 3 }} />
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// };



// export default Auth;


// /* const Auth = ({role}) => {
//   const [isLogin, setIsLogin] = useState(true);

//   const navigate = useNavigate(); 

//   const dispatch = useDispatch();

//   const handleLogin = (userData) => {
//     // Assuming userData contains userRole and userInfo
//     dispatch(loginSuccess({ userRole: userData.role, userInfo: userData.info }));
//   };
//   return (
//     <ThemeProvider theme={defaultTheme}>
    
//       <Grid
//         container
//         component="main"
//         maxWidth="xs"
//         minWidth='md'
//         sx={{ backgroundPosition: "center", }}
//       >
//         <CssBaseline />

//         <Grid
//           item
//           xs={12}
//           sm={8}
//           md={12}
//           component={Paper}
//           elevation={6}
          
//           sx={{ backgroundColor:'', borderRadius:'9px'}}
//         >
//           <Box
//             sx={{
//               mx: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>

//             {isLogin ? <Login role={role}/> : role === "Individual" ?  <Signup/> : <SignupOrg/>}
//           </Box>

//           <Grid container>
//             <Grid item sx={{mx:4}}>
//               <span  >
//                 {isLogin
//                   ? " Don't have an account ?..."
//                   : " Already Have an account?..."}
//                 <Link
//                   onClick={() => setIsLogin(!isLogin)}
//                   href="#"
//                   variant="body1"
//                 >
//                   {isLogin ? "Sign up" : "Log in"}
//                 </Link>
//               </span>
//             </Grid>
//           </Grid>
//           <Copyright sx={{ mt: 3 }} />
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// };
// */