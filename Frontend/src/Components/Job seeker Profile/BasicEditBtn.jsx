import React, { useState, useEffect } from "react";
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
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import countries from "../../assets/countryList";
import jobProfiles from "../../assets/jobProfiles";
import axios from "axios";

const style = {
  color: "#032340",
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
  scrollbarWidth: "none",
  overflowY: "auto",
};

export default function EditBtn({ formData, changeData }) {
  const [localFormData, setLocalFormData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");

  const handleCountryChange = (event, newValue) => {
    setSelectedCountry(newValue ? newValue.label : "");
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async () => {
    const location =
      city && selectedCountry ? `${city}, ${selectedCountry}` : "";

    const updatedData = {
      ...localFormData,
      location: location,
      phoneNo: localFormData.phoneNo,
      workRole: localFormData.workRole,
    };

    try {
      // Send PATCH request to update data on the server
      await axios.patch(
        "http://localhost:5000/api/users/profile",
        {
          location,
          phoneNo: localFormData.phoneNo,
          workRole: localFormData.workRole,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      changeData(updatedData); // Update local state
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    if (formData) {
      setLocalFormData(formData);
      const locationParts = formData.location
        ? formData.location.split(", ")
        : [];
      setCity(locationParts[0] || "");
      setSelectedCountry(locationParts[1] || "");
    }
  }, [formData]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
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
            <Typography
              id="transition-modal-title"
              variant="h5"
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              Basic Details
            </Typography>

            {/* Profile */}
            <Typography id="transition-modal-description" sx={{ m: 1 }}>
              Work Role
            </Typography>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl sx={{ m: 1, minWidth: 250 }}>
                <Select
                  labelId="year"
                  id="demo-simple-select-filled"
                  value={localFormData?.workRole || ""}
                  onChange={(e) =>
                    setLocalFormData({
                      ...localFormData,
                      workRole: e.target.value,
                    })
                  }
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  {jobProfiles.map((option) => (
                    <MenuItem key={option.title} value={option.title}>
                      {option.title}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Please select your profile</FormHelperText>
              </FormControl>
            </Box>

            {/* Personal Details */}
            <Box sx={{ color: "#032340", width: "80%", height: "80%", p: 2 }}>
              <Typography
                id="transition-modal-title"
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                Personal Details
              </Typography>
              {/* Place (Country and City) */}
              <Typography id="transition-modal-description" sx={{ m: 1 }}>
                Location
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Autocomplete
                  id="country-select-demo"
                  sx={{ width: 300 }}
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  value={
                    selectedCountry
                      ? countries.find((c) => c.label === selectedCountry)
                      : null
                  }
                  onChange={handleCountryChange}
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
                        {option.label}
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
                <TextField
                  size="small"
                  id="city-input"
                  label="Enter city"
                  type="text"
                  variant="outlined"
                  sx={{ width: 200 }}
                  value={city}
                  onChange={handleCityChange}
                />
              </Stack>

              <Typography id="transition-modal-description" sx={{ m: 1 }}>
                Phone Number
              </Typography>
              <Typography id="transition-modal-description" sx={{ m: 1 }}>
                Phone Number
              </Typography>
              <TextField
                size="small"
                id="phone-number"
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                variant="outlined"
                fullWidth
                value={localFormData?.phoneNo || ""}
                onChange={(e) =>
                  setLocalFormData({
                    ...localFormData,
                    phoneNo: e.target.value,
                  })
                }
              />

              {/* Submit */}
              <Box sx={{ mt: 2 }}>
                <ButtonGroup aria-label="Loading button group">
                  <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{ m: 1 }}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
