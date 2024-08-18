import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import SkillsEditBtn from "./SkillsEditBtn";
import EducationEditBtn from "./EducationEditBtn";
import ExpEditBtn from "./ExpDetailsBtn";
import AddProjectsBtn from "./ProjectsEditBtn";
import PersonalDeatailsBtn from "./PersonalEditBtn";

const CareerDetails = () => {
  return (
    <Box
      sx={{
        display: "flex",
        color: "#084C91",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "left",
        gap: { xs: 4, sm: 8 },
        width: { xs: "100%", md: "100%" },
        p: { xs: 8, sm: 6 },
        textAlign: { sm: "center", md: "left" },
        backgroundImage: "linear-gradient(130deg, #CEE5FD, #FFF)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Resume */}
      <Box
      sx={{
        p:4,
       
        color: "#032340",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
       
      }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Add Resume
        </Typography>
        <Box
          sx={{
            display: "flex",
            mt: 4,
            p: 3,
            flexDirection: "column",
            alignItems: "center",
            border: "2px dotted black",
          }}
        >
          <Button variant="contained">Upload Resume</Button>
          <Typography>Supported Formats: doc, docx, pdf upto 2 MB</Typography>
        </Box>
      </Box>

      {/* Key skills*/}
      <Box
        sx={{
          p:4,
          backgroundImage: "linear-gradient(90deg,#084C91, #FFF)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          color: "whitesmoke",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
         
        }}
      >
        <Stack direction={"row"}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#fff",
             
            }}
          >
            {" "}
            Add Skills
          </Typography>
          <SkillsEditBtn />
        </Stack>
      </Box>

      {/* Education */}
      <Box
       
           sx={{
          p:4,
          backgroundImage: "linear-gradient(90deg,#084C91, #FFF)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          color: "whitesmoke",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
         
        }}
      
      >
        <Stack direction={"row"}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {" "}
            Education
          </Typography>
          <EducationEditBtn />
        </Stack>
      </Box>

      {/* Experience */}

      <Box
        sx={{
          p:4,
          backgroundImage: "linear-gradient(90deg,#084C91, #FFF)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          color: "whitesmoke",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
         
        }}
      >
        <Stack direction={"row"}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {" "}
            Experience
          </Typography>
          <ExpEditBtn />
        </Stack>
      </Box>

      {/* Projects */}
      <Box
        sx={{
          p:4,
          backgroundImage: "linear-gradient(90deg,#084C91, #FFF)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          color: "whitesmoke",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
         
        }}
      >
        <Stack direction={"row"}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {" "}
            Add Projects
          </Typography>
          <AddProjectsBtn />
        </Stack>
      </Box>

      {/* Accomplishment*/}

      {/* Personal Details*/}
      <Box
         sx={{
          p:4,
          backgroundImage: "linear-gradient(90deg,#084C91, #FFF)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          color: "whitesmoke",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
         
        }}
      >
        <Stack direction={"row"}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {" "}
            Personal Details
          </Typography>
          <PersonalDeatailsBtn />
        </Stack>
      </Box>
    </Box>
  );
};

export default CareerDetails;
