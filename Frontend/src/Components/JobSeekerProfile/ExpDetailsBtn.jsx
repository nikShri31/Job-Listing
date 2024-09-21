import React, { useEffect, useReducer, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

// Initial state for the form
const initialState = {
  employment: "",
  employmentType: "",
  experience: "",
  employmentRecord: {
    organisation: "",
    role: "",
  },
};

// Reducer function to manage state transitions
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE":
      return {
        ...state,
        ...action.payload,
      };
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "UPDATE_NESTED_FIELD":
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          [action.subField]: action.value,
        },
      };
    default:
      return state;
  }
};

const style = {
  color: "#032340",
  width: "80%",
  p: 2,
};

export default function ExpEditBtn({ formData, changeData }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Update the state when formData changes
  useEffect(() => {
    if (formData) {
      dispatch({ type: "SET_STATE", payload: { ...initialState, ...formData } });
    }
    // Only run this effect when formData changes
  }, [formData]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      if (name === "organisation" || name === "role") {
        dispatch({
          type: "UPDATE_NESTED_FIELD",
          field: "employmentRecord",
          subField: name,
          value,
        });
        changeData({
          ...state,
          employmentRecord: {
            ...state.employmentRecord,
            [name]: value,
          },
        });
      } else {
        dispatch({ type: "UPDATE_FIELD", field: name, value });
        changeData({ ...state, [name]: value });
      }
    },
    [state, changeData]
  );

  return (
    <Box sx={style}>
      <Typography
        id="transition-modal-title"
        variant="h5"
        sx={{ fontWeight: "bold", my: 1 }}
      >
        Add Experience
      </Typography>

      {/* Employment */}
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        Employment
      </Typography>
      <FormControl required sx={{ m: 1, minWidth: "70%" }}>
        <InputLabel id="employment-label">Employment</InputLabel>
        <Select
          labelId="employment-label"
          id="employment-select"
          value={state.employment}
          label="Employment"
          name="employment"
          onChange={handleChange}
        >
          <MenuItem value={"Working"}>Working</MenuItem>
          <MenuItem value={"Unemployed"}>Unemployed</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>

      {/* Employment Type */}
      <FormControl sx={{ m: 1 }}>
        <FormLabel id="employment-type-label">Type</FormLabel>
        <RadioGroup
          row
          aria-labelledby="employment-type-label"
          name="employmentType"
          value={state.employmentType}
          onChange={handleChange}
        >
          <FormControlLabel
            value="FullTime"
            control={<Radio />}
            label="Full Time"
          />
          <FormControlLabel
            value="Internship"
            control={<Radio />}
            label="Internship"
          />
        </RadioGroup>
      </FormControl>

      {/* Experience */}
      <Typography id="experience-label" sx={{ mt: 2 }}>
        Experience
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <TextField
          id="experience-input"
          label="Experience in Years"
          type="number"
          value={state.experience}
          name="experience"
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>

      {/* Previous Employment Record */}
      <Typography id="employment-record-label" sx={{ mt: 2 }}>
        Previous Employment Record
      </Typography>
      <Box
        component="div"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="organisation-input"
          label="Organisation"
          value={state.employmentRecord.organisation}
          name="organisation"
          onChange={handleChange}
        />
        <TextField
          id="role-input"
          label="Job Profile"
          value={state.employmentRecord.role}
          name="role"
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
