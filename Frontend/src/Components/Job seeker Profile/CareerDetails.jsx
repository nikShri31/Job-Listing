import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SkillsEditBtn from "./SkillsEditBtn";
import EducationEditBtn from "./EducationEditBtn";
import ExpEditBtn from "./ExpDetailsBtn";
import AddProjectsBtn from "./ProjectsEditBtn";
import PersonalDeatailsBtn from "./PersonalEditBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const details = [
  "Education",
  "Skills",
  "Experience",
  "Projects",
  "Personal Details",
];

const styleDetails = {
  width: { xs: "100%", md: "70%" },
  bgcolor: "background.paper",
  my: 2,
  px: 3,
  ml: { lg: "25%" }, // Offset to avoid overlap with the fixed stack
  height: "100vh",
  overflowY: "auto",
  scrollbarWidth: "none",
};

const CareerDetails = ({ userDetails }) => {
  const [formData, setFormData] = useState();
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
  const changExperienceData = (data) => {
    setFormData((oldData) => ({ ...oldData, experienceData: data }));
  };
  const changeProjectsData = (data) => {
    setFormData((oldData) => ({ ...oldData, projectData: data }));
  };
  const changePeronalDetials = (data) => {
    setFormData((oldData) => ({ ...oldData, personalDetails: data }));
  };

  const handleEditProfile = async () => {
    // Scroll to top before making the API call
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Delay the API call to ensure scroll effect
    setTimeout(async () => {
      try {
        const response = await axios.patch(
          "http://localhost:5000/api/users/profile",
          {
            profile: {
              ...formData,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        navigate("/profile");
      } catch (err) {
        console.log(err);
      }
    }, 500); // Adjust the delay if necessary
  };

  const educationRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const personalDetailsRef = useRef(null);

  const handleScroll = (ref) => {
    window.scrollTo({ top: window.scrollY - 1 });

    setTimeout(() => {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <Box
      sx={{
        display: "flex",
        color: "#084C91",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "left",
        gap: { xs: 4, sm: 4 },
        height: "100%",
       
        p: { xs: 8 },
        textAlign: { sm: "center", md: "left" },
        
        backgroundImage: "linear-gradient(180deg, #E3F0FE,#CEE5FD)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Adding Details */}
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#032340", ml: 4 }}
      >
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
            top: 0, // To align it with the top of the screen
            left: 0, // Align it with the left side
            height: "100vh",
            m: 2,
            overflowY: "auto",
          }}
        >
          {details.map((detail, index) => {
            let ref;
            switch (detail) {
              case "Education":
                ref = educationRef;
                break;
              case "Skills":
                ref = skillsRef;
                break;
              case "Experience":
                ref = experienceRef;
                break;
              case "Projects":
                ref = projectsRef;
                break;
              case "Personal Details":
                ref = personalDetailsRef;
                break;
              default:
                ref = null;
            }

            return (
              <Box
                key={index}
                sx={{
                  p: 3,
                  backgroundImage: "linear-gradient(90deg,#084C91, #FFF)",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  color: "whitesmoke",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  cursor: "pointer",
                }}
                onClick={() => handleScroll(ref)}
              >
                {detail}
              </Box>
            );
          })}
        </Stack>
  {/** Form details */}
        <Stack spacing={2} sx={styleDetails} maxWidth={'60%'}>
          <Box ref={educationRef}>
            <EducationEditBtn
              formData={formData?.educationData}
              changeData={changeEducationData}
            />
          </Box>
          <Box ref={skillsRef}>
            <SkillsEditBtn formData={formData?.skillData} changeData={changeSkillsData} />
          </Box>
          <Box ref={experienceRef}>
            <ExpEditBtn formData={formData?.experienceData} changeData={changExperienceData} />
          </Box>
          <Box ref={projectsRef}>
            <AddProjectsBtn
              formData={formData?.projectData}
              changeData={changeProjectsData}
            />
          </Box>
          <Box ref={personalDetailsRef}>
            <PersonalDeatailsBtn
              formData={formData?.personalDetails}
              changeData={changePeronalDetials}
            />
          </Box>

          {/* Submit */}
          <Box sx={{ m: 1, display: "flex", justifyContent: "flex-end" }}>
            <ButtonGroup aria-label="Loading button group">
              <Button variant="outlined" sx={{ m: 2 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ m: 2 }}
                onClick={handleEditProfile}
              >
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
