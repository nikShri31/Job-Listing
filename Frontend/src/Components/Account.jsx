import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import countries from "../assets/countryList";
import PhoneIcon from "@mui/icons-material/Phone";

const Account = () => {
  const [value, setValue] = React.useState("jobSeeker");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [countryCode, setCountryCode] = React.useState(countries[0].phone);
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",

        alignItems: "flex-start",
        gap: { xs: 4, sm: 6, md: 6 },
        py: { xs: 6, sm: 6 },
        textAlign: { sm: "center", md: "left" },
        backgroundColor: "#E3F0FE",
        backgroundSize: "100% 100%",
      }}
    >
      <Grid
        item
        xs={12}
        minWidth={300}
        md={3}
        sx={{ mx:3 }}
      >
        <Typography variant="h3" sx={{ color: "#032B53", fontWeight: "bold", mt:-2}}>
          Account
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} sx={{ backgroundColor: "#FFF", my: 3, px: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ my: 3 }}>
            Account Setting
          </Typography>
          <Stack>
            <Accordion>
              <AccordionSummary
                expandIcon={<Button> Change Account Type</Button>}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                Account Type : {value}
              </AccordionSummary>
              <AccordionDetails>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="accountType"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                     name='jobSeeker'
                      value="jobSeeker"
                      control={<Radio />}
                      label="Job Seeker"
                    />
                    <FormControlLabel
                    name='organization'
                      value="organization"
                      control={<Radio />}
                      label="Organization"
                    />
                  </RadioGroup>
                </FormControl>
              </AccordionDetails>
              <AccordionActions>
                <Button>Cancel</Button>
                <Button>Submit</Button>
              </AccordionActions>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<Button> Change Email</Button>}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                Email :
              </AccordionSummary>
              <AccordionDetails>
                <Typography> Changing Your Email Address</Typography>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                    py: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Enter new email address"
                    id="changeEmail"
                  />
                </Box>
              </AccordionDetails>
              <AccordionActions>
                <Button>Cancel</Button>
                <Button>Submit</Button>
              </AccordionActions>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<Button> Change Phone Number</Button>}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                Mobile Number :
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ mb: 2 }}> Enter New Phone No. : </Typography>
                {
                  //value={phoneNumber}
                }
                <TextField
                  label="Mobile Number"
                  size="small"
                  variant="outlined"
                  fullWidth
                  onChange={handlePhoneNumberChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                        <TextField
                          select
                          value={countries.phone}
                          onChange={handleCountryCodeChange}
                          variant="standard"
                          sx={{ width: "80px", marginLeft: "8px", py: 3 }}
                        >
                          {countries.map((option) => (
                            <MenuItem key={option.phone} value={option.phone}>
                              {option.code} {option.phone}
                            </MenuItem>
                          ))}
                        </TextField>
                      </InputAdornment>
                    ),
                  }}
                />
              </AccordionDetails>
              <AccordionActions>
                <Button>Cancel</Button>
                <Button>Submit</Button>
              </AccordionActions>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<Button> Change Password</Button>}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                Change Password
              </AccordionSummary>
              <AccordionDetails>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
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
              </AccordionDetails>
              <AccordionActions>
                <Button>Cancel</Button>
                <Button>Submit</Button>
              </AccordionActions>
            </Accordion>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
};

export default Account;
