import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

const style = {
  color: "#032340",
  width: "80%",
  height: "80%",
  p: 2,
};

export default function PersonalDetailsBtn({ formData, changeData }) {
  const [localFormData, setLocalFormData] = useState({
    gender: "",
    maritalStatus: "",
    category: "",
    language: "",
    proficiency: "",
    canRead: false,
    canWrite: false,
    canSpeak: false,
    languages: [],
    ...(formData || {}),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      changeData(updatedData);
      return updatedData;
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setLocalFormData((prev) => {
      const updatedData = { ...prev, [name]: checked };
      changeData(updatedData);
      return updatedData;
    });
  };

  const handleAddLanguage = () => {
    const { language, proficiency, canRead, canWrite, canSpeak } = localFormData;
    if (language && proficiency) {
      const newLanguage = {
        language,
        proficiency,
        canRead,
        canWrite,
        canSpeak,
      };

      const updatedLanguages = [...localFormData.languages, newLanguage];
      setLocalFormData((prevData) => {
        const updatedData = {
          ...prevData,
          languages: updatedLanguages,
          language: "",
          proficiency: "",
          canRead: false,
          canWrite: false,
          canSpeak: false,
        };
        changeData(updatedData);
        return updatedData;
      });
    }
  };

  useEffect(() => {
    if (formData && JSON.stringify(formData) !== JSON.stringify(localFormData)) setLocalFormData(formData);
  }, [formData, localFormData]);

  return (
    <Box sx={style}>
      <Typography
        id="transition-modal-title"
        variant="h5"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Personal Details
      </Typography>

      {/* Gender */}
      <Typography id="transition-modal-description" sx={{ mb: 1 }}>
        Gender
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Gender*</InputLabel>
        <Select
        label="Gender*"
          name="gender"
          value={localFormData.gender || ""}
          onChange={handleChange}
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>

      {/* Marital Status */}
      <Typography id="transition-modal-description" sx={{ mb: 1 }}>
        Marital Status
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Marital Status*</InputLabel>
        <Select
        label="Marital Status*"
          name="maritalStatus"
          value={localFormData.maritalStatus || ""}
          onChange={handleChange}
        >
          <MenuItem value={"Single"}>Single</MenuItem>
          <MenuItem value={"Married"}>Married</MenuItem>
          <MenuItem value={"Widowed"}>Widowed</MenuItem>
          <MenuItem value={"Divorced"}>Divorced</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>

      {/* Category */}
      <Typography id="transition-modal-description" sx={{ mb: 1 }}>
        Category
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Category*</InputLabel>
        <Select
          label="Category*"
          name="category"
          value={localFormData.category || ""}
          onChange={handleChange}
        >
          <MenuItem value={"General"}>General</MenuItem>
          <MenuItem value={"OBC"}>OBC</MenuItem>
          <MenuItem value={"SC"}>SC</MenuItem>
          <MenuItem value={"ST"}>ST</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>

      {/* Language */}
      <Typography    sx={{ mb: 1 }}>
        Language
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "25ch" },
          mb: 3,
        }}
        noValidate
        autoComplete="off"
      >
        <Stack direction="row" spacing={2}>
          <TextField
            required
            label="Language"
            name="language"
            value={localFormData.language || ""}
            onChange={handleChange}
          />
          <FormControl sx={{ width: "25ch" }}>
            <InputLabel>Proficiency</InputLabel>
            <Select
            label="Proficiency"
              name="proficiency"
              value={localFormData.proficiency || ""}
              onChange={handleChange}
            >
              <MenuItem value={"Beginner"}>Beginner</MenuItem>
              <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
              <MenuItem value={"Professional"}>Professional</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="canRead"
                checked={localFormData.canRead || false}
                onChange={handleCheckboxChange}
              />
            }
            label="Read"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="canWrite"
                checked={localFormData.canWrite || false}
                onChange={handleCheckboxChange}
              />
            }
            label="Write"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="canSpeak"
                checked={localFormData.canSpeak || false}
                onChange={handleCheckboxChange}
              />
            }
            label="Speak"
          />
        </Stack>
        <Button onClick={handleAddLanguage} sx={{ mt: 2 }}>
          Add Language
        </Button>
      </Box>

      {/* Display Added Languages */}
      {localFormData.languages.length > 0 && (
        <Box mt={3}>
          <Typography variant="h6">Added Languages:</Typography>
          {localFormData.languages.map((lang, index) => (
            <Typography key={index}>
              {lang.language} - {lang.proficiency} (Read:{" "}
              {lang.canRead ? "Yes" : "No"}, Write:{" "}
              {lang.canWrite ? "Yes" : "No"}, Speak:{" "}
              {lang.canSpeak ? "Yes" : "No"})
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
