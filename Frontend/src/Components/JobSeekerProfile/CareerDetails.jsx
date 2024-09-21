import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SkillsEditBtn from "./SkillsEditBtn";
import EducationEditBtn from "./EducationEditBtn";
import ExpEditBtn from "./ExpDetailsBtn";
import AddProjectsBtn from "./ProjectsEditBtn";
import PersonalDeatailsBtn from "./PersonalEditBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const details = ["Education", "Skills", "Experience", "Projects", "Personal Details"];

const styleDetails = {
  width: { xs: "100%", md: "70%" },
  bgcolor: "background.paper",
  my: 2,
  px: 3,
  ml: { lg: "25%" },
  height: "100vh",
  overflowY: "auto",
  scrollbarWidth: "none",
};

const CareerDetails = ({ userDetails }) => {
  const [formData, setFormData] = useState();
  const [activeSection, setActiveSection] = useState("Education"); // Track the visible section
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails) setFormData(userDetails);
  }, [userDetails]);

  const changeEducationData = (data) => {
    setFormData((oldData) => ({ ...oldData, educationData: data }));
  };
  const changeSkillsData = (data) => {
    setFormData((oldData) => ({ ...oldData, skillData: data }));
  };
  const changeExperienceData = (data) => {
    setFormData((oldData) => ({ ...oldData, experienceData: data }));
  };
  const changeProjectsData = (data) => {
    setFormData((oldData) => ({ ...oldData, projectData: data }));
  };
  const changePersonalDetails = (data) => {
    setFormData((oldData) => ({ ...oldData, personalDetails: data }));
  };

  const handleEditProfile = async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(async () => {
      try {
        const response = await axios.patch(
          "http://localhost:5000/api/users/profile",
          { profile: { ...formData } },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        navigate("/profile");
      } catch (err) {
        console.log(err);
      }
    }, 500);
  };

  return (
    <Box
      sx={{
        display: "flex",
        color: "#084C91",
        flexDirection: "column",
        gap: { xs: 4, sm: 4 },
        height: "100%",
        p: { xs: 8 },
        textAlign: { sm: "center", md: "left" },
        backgroundImage: "linear-gradient(180deg, #E3F0FE,#CEE5FD)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#032340", ml: 4 }}>
        Add Details
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "#084C91",
          position: "relative",
        }}
      >
        <Stack
          spacing={3}
          sx={{
            width: { xs: "", sm: "", lg: "20%" },
            position: "absolute",
            top: 0,
            left: 0,
            height: "100vh",
            m: 2,
            overflowY: "auto",
          }}
        >
          {details.map((detail, index) => (
            <Box
              key={index}
              sx={{
                p: 3,
                backgroundImage: "linear-gradient(90deg,#084C91, #FFF)",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                color: "whitesmoke",
                cursor: "pointer",
              }}
              onClick={() => setActiveSection(detail)}
            >
              {detail}
            </Box>
          ))}
        </Stack>

        <Stack spacing={2} sx={styleDetails} maxWidth={"60%"}>
          {activeSection === "Education" && (
            <EducationEditBtn
              formData={formData?.educationData}
              changeData={changeEducationData}
            />
          )}
          {activeSection === "Skills" && (
            <SkillsEditBtn
              formData={formData?.skillData}
              changeData={changeSkillsData}
            />
          )}
          {activeSection === "Experience" && (
            <ExpEditBtn
              formData={formData?.experienceData}
              changeData={changeExperienceData}
            />
          )}
          {activeSection === "Projects" && (
            <AddProjectsBtn
              formData={formData?.projectData}
              changeData={changeProjectsData}
            />
          )}
          {activeSection === "Personal Details" && (
            <PersonalDeatailsBtn
              formData={formData?.personalDetails}
              changeData={changePersonalDetails}
            />
          )}

          {/* Submit */}
          <Box sx={{ m: 1, display: "flex", justifyContent: "flex-end" }}>
            <ButtonGroup aria-label="Loading button group">
              <Button variant="outlined" sx={{ m: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" sx={{ m: 2 }} onClick={handleEditProfile}>
                Submit
              </Button>
            </ButtonGroup>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default CareerDetails;
