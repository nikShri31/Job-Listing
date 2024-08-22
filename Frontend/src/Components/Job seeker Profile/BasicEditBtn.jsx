import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import {
  Autocomplete,
  ButtonGroup,
  colors,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import countries from "../../assets/countryList";
import PhoneIcon from "@mui/icons-material/Phone";
import InputAdornment from "@mui/material/InputAdornment";
import jobProfiles from "../../assets/jobProfiles";

const style = {
  color:'#032340',
  position: "absolute",
  transform: "translate(-50%, -50%)",
  width: "200%",
  height: "80%",
  top: "50%",
  left: "50%",
  maxWidth: 400,
  bgcolor: "background.paper",
  backdropFilter: "blur(40px)",
  borderRadius: 5,
  boxShadow: 24,
  p: 2,
  overflowY: "auto",
};



export default function EditBtn() {
  const [name, setName] = React.useState("Nik Shri");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [countryCode, setCountryCode] = React.useState(countries[0].phone);
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        {" "}
        <EditIcon />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backdropFilter: "blur(5px)",
            },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5"  sx={{ fontWeight:'bold',}}>
              Basic Details
            </Typography>

            {/* Full Name */}
            <Typography id="transition-modal-description" sx={{ m: 1 }}>
              Full Name
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                size="small"
                id="outlined-controlled"
                placeholder="full name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Box>

            {/* Profile */}
            <Typography id="transition-modal-description" sx={{ m: 1 }}>
              Profile
            </Typography>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                size="small"
                id="outlined-select-profile"
                select
                defaultValue="Web Developer"
                helperText="Please select your profile"
                
              >
                {jobProfiles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/** Work Status */}

            <FormControl sx={{ color: "#02294E", m: 1 }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Work Status
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="fresher"
                  control={<Radio />}
                  label="Fresher"
                />
                <FormControlLabel
                  value="experience"
                  control={<Radio />}
                  label="Experience"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            {/* place */}

            <Typography id="transition-modal-description" sx={{ m: 1 }}>
              Place
            </Typography>
            <Stack direction="row" spacing={1}>
              <Autocomplete
                id="country-select-demo"
                sx={{ width: 400 }}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;
                  return (
                    <Box
                      key={key}
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...optionProps}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              {/**city */}
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "20ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  size="small"
                  id="filled-search"
                  label="enter city"
                  type="name"
                  variant="filled"
                />
              </Box>
            </Stack>

            {/*phone */}
             {
            //   <Typography id="transition-modal-description" sx={{ m: 1 }}>
            // //   Phone
            // // </Typography>

            // <TextField
            //   label="Mobile Number"
            //   size="small"
            //   variant="outlined"
            //   fullWidth
            //   value={phoneNumber}
            //   onChange={handlePhoneNumberChange}
            //   InputProps={{
            //     startAdornment: (
            //       <InputAdornment position="start">
            //         <PhoneIcon />
            //         <TextField
            //           select
            //           value={countries.phone}
            //           onChange={handleCountryCodeChange}
            //           variant="standard"
            //           sx={{ width: "80px", marginLeft: "8px" }}
            //         >
            //           {countries.map((option) => (
            //             <MenuItem key={option.phone} value={option.phone}>
            //               {option.code} {option.phone}
            //             </MenuItem>
            //           ))}
            //         </TextField>
            //       </InputAdornment>
            //     ),
            //   }}
            // />
            }

           


            {/*availability to join */}

            <FormControl sx={{ color: "#02294E", m: 1 }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Availability
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="15 days"
                  control={<Radio />}
                  label="15 days or Less"
                />
                <FormControlLabel
                  value="11 month"
                  control={<Radio />}
                  label="1 month"
                />
                <FormControlLabel
                  value="2 months"
                  control={<Radio />}
                  label="2 month"
                />
                <FormControlLabel
                  value="3 months"
                  control={<Radio />}
                  label="3 months"
                />
                <FormControlLabel
                  value="more than 3"
                  control={<Radio />}
                  label="More than 3"
                />
              </RadioGroup>
            </FormControl>

              {/**Submit */}
              <Box sx={{ m: 1 }}>
              <ButtonGroup aria-label="Loading button group">
                <Button variant="contained" sx={{ m: 1 }} >
                  Submit
                </Button>
                <Button variant="outlined" onClick={handleClose} sx={{ m: 1 }}>cancel</Button>
              </ButtonGroup>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
