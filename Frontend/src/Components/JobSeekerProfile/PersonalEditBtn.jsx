import React, { useEffect, useReducer, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Initial state for the form
const initialState = {
  gender: "",
  maritalStatus: "",
  category: "",
  languages: [
    { language: "", proficiency: "", canRead: false, canWrite: false, canSpeak: false }
  ],
};

// Reducer function to manage state transitions
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "UPDATE_LANGUAGE_FIELD":
      return {
        ...state,
        languages: state.languages.map((lang, index) =>
          index === action.index
            ? { ...lang, [action.field]: action.value }
            : lang
        ),
      };
    case "ADD_LANGUAGE":
      return {
        ...state,
        languages: [
          ...state.languages,
          { language: "", proficiency: "", canRead: false, canWrite: false, canSpeak: false },
        ],
      };
    case "REMOVE_LANGUAGE":
      return {
        ...state,
        languages: state.languages.filter((_, index) => index !== action.index),
      };
    case "SET_INITIAL_STATE":
      return { ...state, ...action.data };
    default:
      return state;
  }
};

const style = {
  color: "#032340",
  width: "80%",
  p: 2,
};

export default function PersonalDetailsBtn({ formData, changeData }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Update the state when formData changes
  useEffect(() => {
    if (formData) {
      dispatch({ type: "SET_INITIAL_STATE", data: formData });
    }
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value });
    changeData({ ...state, [name]: value });
  }, [state, changeData]);

  const handleLanguageChange = useCallback((index, e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_LANGUAGE_FIELD", index, field: name, value });
  }, []);

  const addLanguage = () => {
    dispatch({ type: "ADD_LANGUAGE" });
  };

  const removeLanguage = (index) => {
    dispatch({ type: "REMOVE_LANGUAGE", index });
  };

  return (
    <Box sx={style}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Personal Details
      </Typography>

      {/* Gender Field */}
      <FormControl required sx={{ m: 1, minWidth: "70%" }}>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender-select"
          value={state.gender}
          name="gender"
          onChange={handleChange}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      {/* Marital Status Field */}
      <FormControl required sx={{ m: 1, minWidth: "70%" }}>
        <InputLabel id="marital-status-label">Marital Status</InputLabel>
        <Select
          labelId="marital-status-label"
          id="marital-status-select"
          value={state.maritalStatus}
          name="maritalStatus"
          onChange={handleChange}
        >
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Divorced">Divorced</MenuItem>
        </Select>
      </FormControl>

      {/* Category Field */}
      <FormControl required sx={{ m: 1, minWidth: "70%" }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category-select"
          value={state.category}
          name="category"
          onChange={handleChange}
        >
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Professional">Professional</MenuItem>
          <MenuItem value="Retired">Retired</MenuItem>
        </Select>
      </FormControl>

      {/* Languages Section */}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Languages
      </Typography>
      {state.languages.map((language, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          {index > 0 && <Divider sx={{ my: 2 }} />}
          <TextField
            label="Language"
            value={language.language}
            name="language"
            onChange={(e) => handleLanguageChange(index, e)}
            sx={{ width: "30%", mr: 2 }}
          />
          <TextField
            label="Proficiency"
            value={language.proficiency}
            name="proficiency"
            onChange={(e) => handleLanguageChange(index, e)}
            sx={{ width: "30%", mr: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={language.canRead}
                name="canRead"
                onChange={(e) => handleLanguageChange(index, e)}
              />
            }
            label="Can Read"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={language.canWrite}
                name="canWrite"
                onChange={(e) => handleLanguageChange(index, e)}
              />
            }
            label="Can Write"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={language.canSpeak}
                name="canSpeak"
                onChange={(e) => handleLanguageChange(index, e)}
              />
            }
            label="Can Speak"
          />
          {state.languages.length > 1 && (
            <IconButton onClick={() => removeLanguage(index)} color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
      <Button variant="contained" onClick={addLanguage} sx={{ mt: 2 }}>
        Add Language
      </Button>
    </Box>
  );
}
