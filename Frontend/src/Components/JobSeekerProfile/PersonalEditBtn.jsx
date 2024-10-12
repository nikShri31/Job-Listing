import React, { useEffect, useReducer, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Initial state for the form
const initialState = {
  gender: '',
  maritalStatus: '',
  category: '',
  languages: [{ language: '', proficiency: '', canRead: false, canWrite: false, canSpeak: false }],
};

// Reducer function to manage state transitions
const reducer = (state, action) => {
  const current = action.type;
  if (current == 'SET_STATE') return { ...state, ...action.payload };
  else if (current == 'UPDATE_FIELD') return { ...state, [action.field]: action.value };
  else if (current == 'UPDATE_LANGUAGE_FIELD') {
    return {
      ...state,
      languages: state.languages.map((lang, index) =>
        index === action.index ? { ...lang, [action.field]: action.value } : lang
      ),
    };
  } else if (current == 'ADD_LANGUAGE') {
    return {
      ...state,
      languages: [
        ...state.languages,
        { language: '', proficiency: '', canRead: false, canWrite: false, canSpeak: false },
      ],
    };
  } else if (current == 'REMOVE_LANGUAGE') {
    return {
      ...state,
      languages: state.languages.filter((_, index) => index !== action.index),
    };
  } else if (current == 'SET_INITIAL_STATE') return { ...state, ...action.data };
  else return state;
};

const style = {
  color: '#032340',
  width: '80%',
  p: 2,
};

export default function PersonalDetailsBtn({ formData, changeData }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Update the state when formData changes
  useEffect(() => {
    if (formData) {
      dispatch({ type: 'SET_INITIAL_STATE', data: formData });
    }
  }, [formData]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch({ type: 'UPDATE_FIELD', field: name, value });
      changeData({ ...state, [name]: value });
    },
    [state, changeData]
  );

  const handleLanguageChange = useCallback(
    (index, e) => {
      const { name, value } = e.target;
      const updatedLanguages = state.languages.map((lang, idx) => {
        return idx === index ? { ...lang, [name]: value } : lang;
      });
      dispatch({ type: 'UPDATE_LANGUAGE_FIELD', index, field: name, value });
      changeData({ ...state, languages: updatedLanguages });
    },
    [state, changeData]
  );

  const addLanguage = useCallback(() => {
    const newLanguages = [
      ...state.languages,
      { language: '', proficiency: '', canRead: false, canWrite: false, canSpeak: false },
    ];
    dispatch({ type: 'ADD_LANGUAGE' });
    changeData({ ...state, languages: newLanguages });
  }, [state, changeData]);

  const removeLanguage = useCallback(
    (index) => {
      const filteredLanguages = state.languages.filter((_, idx) => idx !== index);
      dispatch({ type: 'REMOVE_LANGUAGE', index });
      changeData({ ...state, languages: filteredLanguages });
    },
    [state, changeData]
  );

  return (
    <Box sx={style}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Personal Details
      </Typography>

      {/* Gender Field */}
      <FormControl required sx={{ m: 1, minWidth: '70%' }}>
        <InputLabel >Gender</InputLabel>
        <Select
          label="Gender"
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
      <FormControl required sx={{ m: 1, minWidth: '70%' }}>
        <InputLabel >Marital Status</InputLabel>
        <Select
          label="Marital Status"
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
      <FormControl required sx={{ m: 1, minWidth: '70%'}}>
        <InputLabel >Category</InputLabel>
        <Select
          label="Category"
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
      <Typography variant="h6" sx={{ marginBlock: 2 }}>
        Languages
      </Typography>
      {state.languages.map((language, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            {index > 0 && <Divider sx={{ my: 2 }} />}
            <TextField
              label="Language"
              value={language?.language}
              name="language"
              onChange={(e) => handleLanguageChange(index, e)}
              sx={{ width: '30%', mr: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl sx={{ width: '30%', mr: 2 }}>
              <InputLabel>Proficiency</InputLabel>
              <Select
                label="Proficiency"
                value={language?.proficiency}
                name="proficiency"
                onChange={(e) => handleLanguageChange(index, e)}
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', mt: 2 }}>
              <FormControlLabel
                sx={{ marginRight: 2 }}
                control={
                  <Checkbox
                    checked={language?.canRead}
                    name="canRead"
                    onChange={(e) => handleLanguageChange(index, e)}
                  />
                }
                label="Can Read"
              />
              <FormControlLabel
                sx={{ marginInline: 2 }}
                control={
                  <Checkbox
                    checked={language?.canWrite}
                    name="canWrite"
                    onChange={(e) => handleLanguageChange(index, e)}
                  />
                }
                label="Can Write"
              />
              <FormControlLabel
                sx={{ marginInline: 2 }}
                control={
                  <Checkbox
                    checked={language?.canSpeak}
                    name="canSpeak"
                    onChange={(e) => handleLanguageChange(index, e)}
                  />
                }
                label="Can Speak"
              />
            </Box>
          </Box>
          {/* Delete button aligned to the right */}
          <IconButton
            onClick={() => removeLanguage(index)}
            color="error"
            sx={{ marginLeft: 'auto' }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button variant="contained" onClick={addLanguage} sx={{ mt: 2 }}>
        Add Language
      </Button>
    </Box>
  );
}
