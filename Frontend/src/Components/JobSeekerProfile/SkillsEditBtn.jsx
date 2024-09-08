import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Autocomplete, Stack, TextField } from "@mui/material";
import itSkills from "../../assets/itSkills";

const style = {
  color: "#032340",
  width: "80%",
  p: 2,
};

export default function SkillsEditBtn({ formData, changeData }) {
  const [localFormData, setLocalFormData] = useState({
    ...formData,
    skills: formData?.skills || [], // Ensure skills is always an array
  });

  const handleAutocompleteChange = (event, newValue) => {
    const skillTitles = newValue.map((skill) => skill.title);
    const formDetails = { ...localFormData, skills: skillTitles };
    setLocalFormData(formDetails);
    changeData(formDetails);
  };

  useEffect(() => {
    if (formData) setLocalFormData(formData);
  }, [formData]); 

  return (
    <>
      <Box sx={style}>
        <Typography
          id="transition-modal-title"
          variant="h5"
          sx={{ fontWeight: "bold" }}
        >
          Add Skills
        </Typography>
        <Stack spacing={3} sx={{ m: 2 }}>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Skills
          </Typography>
          <Autocomplete
            multiple
            id="tags-standard"
            options={itSkills}
            getOptionLabel={(option) => option.title}
            value={localFormData?.skills.map((title) => ({ title }))}
            onChange={handleAutocompleteChange}
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select your skills"
              />
            )}
          />
        </Stack>
      </Box>
    </>
  );
}
