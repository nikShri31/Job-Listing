import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";

const branches = [
  "Computer Science",
  "Information Technology",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Biotechnology",
  "Aerospace Engineering",
  "Electronics and Communication Engineering",
  "Automobile Engineering",
  "Agricultural Engineering",
  "Biomedical Engineering",
  "Environmental Engineering",
  "Mining Engineering",
  "Petroleum Engineering",
  "Marine Engineering",
  "Software Engineering",
  "Data Science",
  "Artificial Intelligence",
  "Robotics",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Statistics",
  "Economics",
  "Business Administration",
  "Finance",
  "Marketing",
  "Human Resource Management",
  "Entrepreneurship",
  "Accounting",
  "Psychology",
  "Sociology",
  "Political Science",
  "Philosophy",
  "English Literature",
  "History",
  "Geography",
  "Journalism and Mass Communication",
  "Law",
  "Fine Arts",
  "Architecture",
  "Fashion Design",
  "Interior Design",
  "Hotel Management",
  "Culinary Arts",
  "Nursing",
  "Pharmacy",
  "Dentistry",
  "Veterinary Science",
  "Medicine",
  "Physiotherapy",
  "Occupational Therapy",
  "Public Health",
  "Forestry",
  "Zoology",
  "Botany",
  "Microbiology",
  "Genetics",
  "Anthropology",
  "Social Work",
  "Education",
];

export default function EducationEditBtn({ formData, changeData }) {
  const [localFormData, setLocalFormData] = useState({ ...formData });

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
      <Box sx={{ color: "#032340", width: "80%", height: "80%", p: 2 }}>
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

        <FormControl required sx={{ mt: 2, minWidth: "80%", display: "flex" }}>
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
        </FormControl>

        {/*University/College*/}
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          University/College
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            minWidth: "80%",
          }}
        >
          <TextField
            fullWidth
            label="College*"
            id="fullWidth"
            value={localFormData?.college || ""}
            name="college"
            onChange={handleChange}
          />
        </Box>

        {/* Nimanshu ye theek kr dio */}

        {/*Course*/}
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Course
        </Typography>
        <FormControl required sx={{ mt: 1, minWidth: "80%", display:"flex"}}>
          <InputLabel id="demo-simple-select-required-label">Course</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={formData?.course || ""}
            label="Course"
            name="course"
            onChange={handleChange}
          >
            {branches.map((branch, index) => (
              <MenuItem key={index} value={branch}>
                {branch}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

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
          <FormControl required sx={{ mr: 2, maxWidth: "50%" }}>
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
