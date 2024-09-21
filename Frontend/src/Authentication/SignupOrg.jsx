import React, { useState } from "react";
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



const SignupOrg = ({ formData, setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);

  // if (name === "phoneNo" && !/^\d*$/.test(value)) return;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
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
            <Stack direction={"row"} spacing={2} sx={{ mt: 1 }}>
              <TextField
                name="email"
                required
                label="Contact Email"
                size="small"
                value={formData?.email || ''}
                onChange={handleChange}
              />
              <TextField
                name="phone"
                required
                label="Contact Phone Number"
                size="small"
                value={formData.phone || ''}
                onChange={handleChange}
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
                type={showPassword ? "text" : "password"}
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

// function SignupOrg() {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   // Selectors for loading state and error handling
//   const { loading, error } = useSelector((state) => state.auth);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);

//     // Construct the signup data for the organization
//     const signupData = {
//       name: data.get("name"),
//       adminEmail: data.get("adminEmail"),
//       password: data.get("password"),
//       role: "organization", // Use lowercase role as per your auth slice convention
//       contactEmail: data.get("contactEmail"),
//       phone: data.get("phone"),
//       address: data.get("address"),
//       website: data.get("website"),
//       industry: data.get("industry"),
//     };

//     // Dispatch the signup action for the organization
//     dispatch(signup({ signupData, role: "organization" }))
//       .unwrap()
//       .then(() => {
//         // On successful signup, navigate to the home page
//         navigate("/");
//       })
//       .catch((error) => {
//         // Handle signup error (can show a Snackbar or other error handling UI)
//         console.error("Signup failed", error);
//       });
//   };

//   return (
//     <React.Fragment>
//       <Typography component="h1" variant="h5">
//         Sign up
//       </Typography>
//       <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               size="small"
//               name="name"
//               required
//               fullWidth
//               id="name"
//               label="Organisation Name"
//               autoFocus
//             />
//           </Grid>
//           <Grid item xs={12} sx={{ px: 2, py: 1 }}>
//             <Typography variant="h6">Contact Info</Typography>
//             <Stack direction={"row"} spacing={2} sx={{ mt: 1 }}>
//               <TextField
//                 name="contactEmail"
//                 required
//                 label="Contact Email"
//                 size="small"
//                 autoComplete="email"
//               />
//               <TextField name="phone" required label="Contact Phone Number" size="small" />
//             </Stack>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               size="small"
//               name="address"
//               fullWidth
//               label="Address"
//               autoFocus
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               size="small"
//               required
//               fullWidth
//               type="text"
//               label="Website"
//               name="website"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               size="small"
//               required
//               fullWidth
//               type="text"
//               label="Industry"
//               name="industry"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               size="small"
//               required
//               fullWidth
//               id="adminEmail"
//               type="email"
//               label="Login Email Address"
//               name="adminEmail"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <FormControl variant="outlined" fullWidth size="small">
//               <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//               <OutlinedInput
//                 id="outlined-adornment-password"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
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
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{ mt: 3, mb: 2, color: "white" }}
//           disabled={loading} // Disable the button while loading
//         >
//           {loading ? "Signing Up..." : "Sign Up"}
//         </Button>
//         {error && <Typography color="error">{error}</Typography>} {/* Display error message if signup fails */}
//       </Box>
//     </React.Fragment>
//   );
// }

/*
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
            /> }
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
*/