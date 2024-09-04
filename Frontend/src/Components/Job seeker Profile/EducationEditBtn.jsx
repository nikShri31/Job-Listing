import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";

const style = {
  color: "#032340",
  width: "80%",
  height: "80%",
  p: 2,
};

export default function EducationEditBtn({ formData, changeData }) {
  const [localFormData, setLocalFormData] = useState({...formData});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formDetails = { ...localFormData, [name]: value };

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
          Add Education
        </Typography>

        {/**Education */}
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Education
        </Typography>

        <FormControl required sx={{ m: 1, minWidth: "80%" }}>
          <InputLabel id="demo-simple-select-required-label">
            Education
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={localFormData?.education || "Diploma"}
            name="education"
            label="Education*"
            onChange={handleChange}
          >
            <MenuItem value={"PhD"}>Doctarate/Phd</MenuItem>
            <MenuItem value={"Post Graduation"}>
              Masters/PostGraduation
            </MenuItem>
            <MenuItem value={"Diploma"}>Graduation/Diploma</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        {/*University/College*/}
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          University/College
        </Typography>
        <Box
          sx={{
            mt: 1,
            width: 500,
            minWidth: "80%",
          }}
        >
          <TextField
            fullWidth
            label="College"
            id="fullWidth"
            value={localFormData?.college || ""}
            name="college"
            onChange={handleChange}
          />
          <FormHelperText>Required*</FormHelperText>
        </Box>

        {/* Nimanshu ye theek kr dio */}

        {/*Course*/}
        {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Course
        </Typography>
        <FormControl required sx={{ m: 1, minWidth: "80%" }}>
          <InputLabel id="demo-simple-select-required-label">Course</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"

            value={formData.course}
            label="Course"
            name="course"
            onChange={(evt) => setFormData( (formData) => ({...formData, course : evt.target.value}))}


          >
            <MenuItem value={"B.Tech"}>B.Tech</MenuItem>
            <MenuItem value={""}>M.Tech/MCA</MenuItem>
            <MenuItem value={30}>BCA</MenuItem>
            <MenuItem value={40}>Diploma</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl> */}

        {/* iske bhi options theek kr dio */}

        {/**Specialization */}
        {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Specialization
        </Typography>
        <FormControl required sx={{ m: 1, minWidth: "80%" }}>
          <InputLabel id="demo-simple-select-required-label">
            Specialization
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"

            name="specialization"
            value={age}
            label="Spacialization*"
            onChange={(evt) => setFormData( (formData) => ({...formData, specialization : evt.target.value}))} 
            required

          >
            <MenuItem value={'CS'}>CS</MenuItem>
            <MenuItem value={'IT'}>IT</MenuItem>
            <MenuItem value={'ECE'}>ECE</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl> */}

        {/* isme name and formData ka state change dekh lio */}

        {/*Start */}
        {/* <FormControl required sx={{ m: 2, minWidth: 180 }}>
          <InputLabel id="year">start</InputLabel>
          <Select labelId="year" id="demo-simple-select-filled">
            {dateSelect.year.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        <FormControl required sx={{ m: 2, minWidth: 180 }}>
          <InputLabel id="year">End</InputLabel>
          <Select labelId="year" id="demo-simple-select-filled">
            {dateSelect.year.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl> */}

        {/*Grade */}
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Grade
        </Typography>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            minWidth: "80%",
          }}
        >
          <FormControl required sx={{ mx: 2, maxWidth: "50%" }}>
            <InputLabel id="demo-simple-select-required-label">
              Grade
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={localFormData?.marks || "%"}
              label="Marks"
              name="marks"
              onChange={handleChange}
            >
              <MenuItem value={"%"}>Percentage %</MenuItem>
              <MenuItem value={"GPA"}>GPA</MenuItem>
            </Select>
            <FormHelperText>Required*</FormHelperText>
          </FormControl>
          <Box>
            <TextField
              fullWidth
              id="fullWidth"
              name="grade"
              value={localFormData?.grade || ""}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
