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
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
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
  maxWidth: 550,
  bgcolor: "background.paper",
  
  borderRadius: 5,
  boxShadow: 24,
  p: 2,
  scrollbarWidth: 'none', 
  overflowY: "auto",
};



export default function EditBtn() {
  const [firstName, setFirstName] = React.useState("Nik");
  const [lastName, setLastName] = React.useState(" Shri");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



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
              backdropFilter: "blur(6px)",
            },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5"  sx={{ fontWeight:'bold',mb:3}}>
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
                placeholder="First name*"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
              <TextField
                size="small"
                id="outlined-controlled"
                placeholder="Last name*"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
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
            <FormControl sx={{ m: 1, minWidth: 250 , }}>
           
            <Select
            labelId="year"
            id="demo-simple-select-filled"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
            >
           {
            jobProfiles.map((option)=>(
              <MenuItem key={option.value} value={option.value}>{option.value}</MenuItem>
            ))
           }
          </Select>
            <FormHelperText>Please select your profile</FormHelperText>
          </FormControl>
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
                sx={{ width: 300 }}
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
                  "& .MuiTextField-root": {  width: "20ch" },
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

           
            }

           


            {/*availability to join */}

            <FormControl sx={{ color: "#02294E", m: 2 }}>
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
