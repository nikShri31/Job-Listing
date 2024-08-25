import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Button,
} from "@mui/material";

const style = {
  color: "#032340",
  width: "80%",
  height: "80%",
  p: 2,
};

export default function PersonalDetailsBtn({ formData, changeData }) {
  const [localFormData, setLocalFormData] = useState(formData || {});
  const [languages, setLanguages] = useState(localFormData?.languages || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setLocalFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleChipClick = (e, fieldName, chipValue) => {
    setLocalFormData((prev) => ({
      ...prev,
      [fieldName]: chipValue,
    }));
    changeData(localFormData);
  };

  const handleAddLanguage = () => {
    const { language, proficiency, canRead, canWrite, canSpeak } =
      localFormData;

    if (language && proficiency) {
      const newLanguage = {
        language,
        proficiency,
        canRead: canRead || false,
        canWrite: canWrite || false,
        canSpeak: canSpeak || false,
      };

      const updatedLanguages = [...languages, newLanguage];
      setLanguages(updatedLanguages);
      setLocalFormData((prevData) => ({
        ...prevData,
        languages: updatedLanguages,
        language: "",
        proficiency: "",
        canRead: false,
        canWrite: false,
        canSpeak: false,
      }));

      changeData((formData) => ({
        ...formData,
        languages: updatedLanguages,
      }));
    }
  };

  useEffect(() => {
    if (formData) setLocalFormData(formData);
  }, [formData]);

  return (
    <Box sx={style}>
      <Typography
        id="transition-modal-title"
        variant="h5"
        sx={{ fontWeight: "bold" }}
      >
        Personal Details
      </Typography>

      {/**Gender */}
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        Gender
      </Typography>
      <Stack direction="row" spacing={1} mt={1}>
        <Chip
          name="gender"
          label="Male"
          onClick={(e) => handleChipClick(e, "gender", "Male")}
          variant={localFormData?.gender === "Male" ? "filled" : "outlined"}
        />
        <Chip
          name="gender"
          label="Female"
          onClick={(e) => handleChipClick(e, "gender", "Female")}
          variant={localFormData?.gender === "Female" ? "filled" : "outlined"}
        />
        <Chip
          name="gender"
          label="Other"
          onClick={(e) => handleChipClick(e, "gender", "Other")}
          variant={localFormData?.gender === "Other" ? "filled" : "outlined"}
        />
      </Stack>

      {/**Marital Status */}
      <Typography id="transition-modal-description" sx={{ mt: 3 }}>
        Marital status
      </Typography>
      <Stack direction="row" spacing={1} mt={1}>
        <Chip
          label="Single"
          onClick={(e) => handleChipClick(e, "maritalStatus", "Single")}
          variant={
            localFormData?.maritalStatus === "Single" ? "filled" : "outlined"
          }
        />
        <Chip
          name="maritalStatus"
          label="Married"
          onClick={(e) => handleChipClick(e, "maritalStatus", "Married")}
          variant={
            localFormData?.maritalStatus === "Married" ? "filled" : "outlined"
          }
        />
        <Chip
          name="maritalStatus"
          label="Widowed"
          onClick={(e) => handleChipClick(e, "maritalStatus", "Widowed")}
          variant={
            localFormData?.maritalStatus === "Widowed" ? "filled" : "outlined"
          }
        />
        <Chip
          name="maritalStatus"
          label="Divorced"
          onClick={(e) => handleChipClick(e, "maritalStatus", "Divorced")}
          variant={
            localFormData?.maritalStatus === "Divorced" ? "filled" : "outlined"
          }
        />
        <Chip
          name="maritalStatus"
          label="Other"
          onClick={(e) => handleChipClick(e, "maritalStatus", "Other")}
          variant={
            localFormData?.maritalStatus === "Other" ? "filled" : "outlined"
          }
        />
      </Stack>

      {/**Category */}
      <Typography id="transition-modal-description" sx={{ mt: 3 }}>
        Category
      </Typography>
      <Stack direction="row" spacing={2} mt={1}>
        <Chip
        name="category"
          label="General"
          onClick={(e) => handleChipClick(e, "category", "General")}
          variant={
            localFormData?.category === "General" ? "filled" : "outlined"
          }
        />
        <Chip
        name="category"
          label="OBC"
          onClick={(e) => handleChipClick(e, "category", "OBC")}
          variant={localFormData?.category === "OBC" ? "filled" : "outlined"}
        />
        <Chip
        name="category"
          label="SC"
          onClick={(e) => handleChipClick(e, "category", "SC")}
          variant={localFormData?.category === "SC" ? "filled" : "outlined"}
        />
        <Chip
        name="category"
          label="ST"
          onClick={(e) => handleChipClick(e, "category", "ST")}
          variant={localFormData?.category === "ST" ? "filled" : "outlined"}
        />
        <Chip
        name="category"
          label="Other"
          onClick={(e) => handleChipClick(e, "category", "Other")}
          variant={localFormData?.category === "Other" ? "filled" : "outlined"}
        />
      </Stack>

      {/**Language */}
      <Typography id="transition-modal-description" sx={{ mt: 3 }}>
        Language
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "25ch" },
          mt: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <Stack direction="row" spacing={2}>
          <TextField
            required
            id="outlined-required"
            label="Language"
            name="language"
            value={localFormData?.language || ""}
            onChange={handleChange}
          />
          <FormControl sx={{ width: "25ch" }}>
            <InputLabel id="demo-simple-select-label">Proficiency</InputLabel>
            <Select
              label="Proficiency"
              id="demo-simple-select"
              name="proficiency"
              value={localFormData?.proficiency || ""}
              onChange={handleChange}
            >
              <MenuItem value={"Beginner"}>Beginner</MenuItem>
              <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
              <MenuItem value={"Professional"}>Professional</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction="row" spacing={1}>
            <FormControlLabel
              control={
                <Checkbox
                  name="canRead"
                  checked={localFormData?.canRead || false}
                  onChange={handleCheckboxChange}
                />
              }
              label="Read"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="canWrite"
                  checked={localFormData?.canWrite || false}
                  onChange={handleCheckboxChange}
                />
              }
              label="Write"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="canSpeak"
                  checked={localFormData?.canSpeak || false}
                  onChange={handleCheckboxChange}
                />
              }
              label="Speak"
            />
          </Stack>
          <Button onClick={handleAddLanguage} sx={{ cursor: "pointer" }}>
            Add +
          </Button>
        </Stack>
      </Box>

      {/** Display Added Languages */}
      {languages.length > 0 && (
        <Box mt={3}>
          <Typography variant="h6">Added Languages:</Typography>
          {languages.map((lang, index) => (
            <Typography key={index}>
              {lang.language} - {lang.proficiency}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
