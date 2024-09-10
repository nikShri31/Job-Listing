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
          <Grid item xs={12}>
            <TextField
              size="small"
              name="role"
              required
              fullWidth
              id="role"
              label="Role (e.g., Developer)"
              value={formData?.role || ''}
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

// function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error, isAuthenticated } = useSelector((state) => state.auth); // Get state from Redux
//   console.log('isauthenticated :',isAuthenticated);

//   // Handle password visibility
//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);

//     // Dispatch signup action with role 'individual' 
//     dispatch(signup({
//       name: data.get("name"),
//       username: data.get("username"),
//       email: data.get("email"),
//       password: data.get("password"),
//       phoneNo: data.get("phone"),
//       profile: {
//         role: data.get("role"),
//       },
//       location: data.get("location"),
//       role: "individual", // Specify role for the user
//     }));
//   };

//   // Navigate after successful signup
//   if (isAuthenticated) {
//     navigate("/jobs");
//   }

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
//               label="Full Name"
//               autoFocus
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               size="small"
//               name="username"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               autoFocus
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               size="small"
//               name="role"
//               required
//               fullWidth
//               id="role"
//               label="Role"
//               autoFocus
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField 
//               size="small"
//               required
//               fullWidth
//               id="phone"
//               type="text"
//               label="Phone Number"
//               name="phone"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField 
//               size="small"
//               required
//               fullWidth
//               id="location"
//               type="text"
//               label="Location"
//               name="location"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               size="small"
//               required
//               fullWidth
//               id="email"
//               type="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <FormControl variant="outlined" fullWidth size="small">
//               <InputLabel htmlFor="outlined-adornment-password">
//                 Password
//               </InputLabel>
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
        
//         {loading ? (
//           <Typography>Loading...</Typography>
//         ) : (
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2, color: "white" }}
//           >
//             Sign Up
//           </Button>
//         )}

//         {error && <Typography color="error">{error}</Typography>}
//       </Box>
//     </React.Fragment>
//   );
// }

/*
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await axios.post("http://localhost:5000/api/signup", {
      name: data.get("name"),
      username: data.get("username"),
      role : "employee",
      email: data.get("email"),
      password: data.get("password"),
      phoneNo: data.get("phone"),
      profile: {
        role: data.get("role"),
      },
      location : data.get("location")
    });
    localStorage.setItem("token", response.data.token);
    navigate('/profile')
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
              label="Full Name"
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
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              name="role"
              required
              fullWidth
              id="role"
              label="Role"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              size="small"
              required
              fullWidth
              id="phone"
              type="text"
              label="Phone Number"
              name="phone"
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