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
import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice"; // Import login action
import { useNavigate } from "react-router-dom";


const Login = ({ formData, setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <React.Fragment>
   
      <Box sx={{ mx: 3, my: 8 }}>
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
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
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
      </Box>
    </React.Fragment>
  );
};


// const Login = ({ role }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Get auth state from Redux
//   const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const { email, password } = formData;

//     // Dispatch login action with the role and form data
//     dispatch(
//       login({
//         loginData: { email, password },
//         role,
//       })
//     );
//   };

//   // If user is authenticated, navigate to profile
//   if (isAuthenticated) {
//     navigate("/");
//   }

//   return (
//     <React.Fragment>
//       <Typography component="h1" variant="h5">
//         Sign in
//       </Typography>
//       <Box
//         component="form"
//         noValidate
//         sx={{ mx: 3, my: 8 }}
//         onSubmit={handleSubmit}
//       >
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               size="small"
//               required
//               fullWidth
//               id="email"
//               type="email"
//               label="Email"
//               name="email"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <FormControl variant="outlined" fullWidth size="small">
//               <InputLabel htmlFor="outlined-adornment-password">
//                 Password
//               </InputLabel>
//               <OutlinedInput
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={() => setShowPassword(!showPassword)}
//                       onMouseDown={(evt) => evt.preventDefault()}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 label="Password"
//               />
//             </FormControl>
//           </Grid>
//         </Grid>

//         <Grid item xs sx={{ mt: 2 }}>
//           <Link href="#" variant="body2">
//             Forgot password?
//           </Link>
//         </Grid>

//         {error && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}

//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{ mt: 2, color: "white" }}
//           disabled={loading} 
//         >
//           {loading ? "Logiing In..." : "Sign In"}
//         </Button>
//       </Box>
//     </React.Fragment>
//   );
// };



export default Login;



// function Login({ role }) {


//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmitOrg = async (event) => {
//     try {
//       event.preventDefault();
//       const data = new FormData(event.currentTarget);
//       const adminEmail = data.get("email");
//       const password = data.get("password");
//       const response = await axios.post(
//         "http://localhost:5000/api/organisation/login",
//         {
//           adminEmail,
//           password,
//         }
//       );
//       localStorage.setItem("token", response.data.token);
//       //save org data
//       navigate("/profile");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const email = data.get("email");
//     const password = data.get("password");
//     const response = await axios.post("http://localhost:5000/api/login", {
//       email,
//       password,
//     });
//     localStorage.setItem("token", response.data.token);
//     //save user Data
//     navigate("/profile");
//   };

//   return (
//     <>
//       <Typography component="h1" variant="h5">
//         Sign in
//       </Typography>
//       <Box component="form" noValidate sx={{ mx: 3, my: 8 }} onSubmit={role === 'Organisation' ? handleSubmitOrg : handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               size="small"
//               required
//               fullWidth
//               id="email"
//               type="email"
//               label="Email"
//               name="email"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <FormControl variant="outlined" fullWidth size="small">
//               <InputLabel htmlFor="outlined-adornment-password">
//                 Password
//               </InputLabel>
//               <OutlinedInput
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={() => setShowPassword(!showPassword)}
//                       onMouseDown={(evt) => evt.preventDefault()}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 label="Password"
//               />
//             </FormControl>
//           </Grid>
//         </Grid>

//         <Grid item xs sx={{ mt: 2 }}>
//           <Link href="#" variant="body2">
//             Forgot password?
//           </Link>
//         </Grid>

//         {error && (
//           <Alert severity="error">ERROR : This is a filled error.</Alert>
//         )}
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
          
//           sx={{ mt: 2, color: "white" }}
//         >
//           Sign In
//         </Button>
//       </Box>
//     </>
//   );
// }
