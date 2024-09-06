import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  color: "#032340",
  width: "80%",
  p: 2,
};

export default function AddProjectsBtn({ formData, changeData }) {
  const [projects, setProjects] = useState(
    formData?.projects || [
      { title: "", progress: "", description: "", role: "" },
    ]
  );

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [name]: value };

    setProjects(updatedProjects);
    changeData({ projects: updatedProjects });
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", progress: "", description: "", role: "" },
    ]);
  };

  const removeProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    changeData({ projects: updatedProjects });
  };

  useEffect(() => {
    setProjects(
      formData?.projects || [
        { title: "", progress: "", description: "", role: "" },
      ]
    );
  }, [formData]);

  return (
    <Box sx={style}>
      <Typography
        id="transition-modal-title"
        variant="h5"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Add Projects
      </Typography>

      {projects.map((project, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          {/* Divider between projects */}
          {index > 0 && <Divider sx={{ my: 3 }} />}

          {/* Project Title Heading */}
          <Typography
            id={`project-heading-${index}`}
            variant="h6"
            sx={{ fontWeight: "bold", mt: 2, mb: 1 }}
          >
            Project {index + 1}
          </Typography>

          {/* Flex container for Title input and Remove button */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <TextField
              required
              id={`title-${index}`}
              label="Title"
              name="title"
              value={project?.title || ""}
              onChange={(e) => handleChange(index, e)}
              sx={{ flex: 1, mt: 1, mr: 2 }}
            />
            {/* Button to remove this project */}
            {projects.length > 1 && (
              <IconButton
                aria-label="delete"
                onClick={() => removeProject(index)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>

          {/* Role Input */}
          <Typography id={`role-label-${index}`} sx={{ mt: 2 }}>
            Role
          </Typography>
          <TextField
            required
            id={`role-${index}`}
            label="Role"
            name="role"
            value={project?.role || ""}
            onChange={(e) => handleChange(index, e)}
            sx={{ mt: 1, width: "100%" }}
          />

          {/* Progress/Status */}
          <FormControl sx={{ mt: 2 }}>
            <FormLabel id={`status-label-${index}`}>Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby={`status-label-${index}`}
              name="progress"
              value={project?.progress || ""}
              onChange={(e) => handleChange(index, e)}
            >
              <FormControlLabel
                value="process"
                control={<Radio />}
                label="In Process"
              />
              <FormControlLabel
                value="Finished"
                control={<Radio />}
                label="Finished"
              />
            </RadioGroup>
          </FormControl>

          {/* Description Input */}
          <Typography id={`description-label-${index}`} sx={{ mt: 2 }}>
            Description
          </Typography>
          <TextField
            id={`description-${index}`}
            label="Description*"
            name="description"
            value={project?.description || ""}
            onChange={(e) => handleChange(index, e)}
            multiline
            sx={{ mt: 1, width: "100%" }}
          />
        </Box>
      ))}

      {/* Button to add a new project */}
      <Button
        variant="contained"
        color="primary"
        onClick={addProject}
        sx={{ mt: 2 }}
      >
        Add Project
      </Button>
    </Box>
  );
}
