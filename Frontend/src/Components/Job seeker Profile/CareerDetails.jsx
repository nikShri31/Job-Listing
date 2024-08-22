import { Box, Button, ButtonGroup, Container, Stack, Typography } from "@mui/material";
import React from "react";
import SkillsEditBtn from "./SkillsEditBtn";
import EducationEditBtn from "./EducationEditBtn";
import ExpEditBtn from "./ExpDetailsBtn";
import AddProjectsBtn from "./ProjectsEditBtn";
import PersonalDeatailsBtn from "./PersonalEditBtn";

const details = [
  "Education",
  "Skills",
  "Experience",
  "Projects",
  "Personal Details",
];

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
        height: "100%",
        width: { xs: "100%", md: "100%" },
        p: { xs: 8, sm: 4 },
        textAlign: { sm: "center", md: "left" },
        backgroundImage: "linear-gradient(130deg, #CEE5FD, #FFF)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Resume */}
      <Box
        sx={{
          p: 4,

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

      {/**Adding Details */}
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#032340",ml:4 }}>
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
            width: { xs: "100%", lg: "20%" },
            position: "absolute", // Fixes the left stack
            top: 0, // To align it with the top of the screen
            left: 0, // Align it with the left side
            height: "100vh", // Full viewport height
            p: 2,
            mx: 2,
            overflowY: "auto",
          }}
        >
          {details.map((detail, index) => (
            <Box
              key={index}
              sx={{
                p: 4,
                backgroundImage: "linear-gradient(90deg,#084C91, #FFF)",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                color: "whitesmoke",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              {detail}
            </Box>
          ))}
        </Stack>

        <Stack
          spacing={2}
          sx={{
            width: { xs: "100%", md: "70%" },
            bgcolor: "background.paper",
            ml: 5,
            my: 2,
            px: 3,
            ml: { lg: "25%" }, // Offset to avoid overlap with the fixed stack
            height: "100vh", // Full height to allow scrolling
            overflowY: "auto",
          }}
        >
          <EducationEditBtn />
          <SkillsEditBtn />
          <ExpEditBtn />
          <AddProjectsBtn />
          <PersonalDeatailsBtn />
          <Box sx={{ minHeight: "10%", flexGrow: 1 }}></Box>

          // {/**Submit */}
          <Box sx={{ m: 1,display:'flex',justifyContent:'flex-end'}}>
            <ButtonGroup aria-label="Loading button group">
            <Button variant="outlined"  sx={{ m: 1 }}>
            cancel
            </Button>
            <Button variant="contained" sx={{ m: 1 }}>
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

//   <Box
//         sx={{
//           p: 4,
//           backgroundImage: "linear-gradient(90deg,#084C91, #FFF)",
//           backgroundSize: "100% 100%",
//           backgroundRepeat: "no-repeat",
//           color: "whitesmoke",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "left",
//         }}
//       >
//         <Stack direction={"row"}>
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: "bold",
//               color: "#fff",
//             }}
//           >
//             {" "}
//             Add Skills
//           </Typography>
//           <SkillsEditBtn />
//         </Stack>
//       </Box>

//       {/* Education */}
//       <Box
//         sx={{
//           p: 4,
//           backgroundImage: "linear-gradient(90deg,#084C91, #FFF)",
//           backgroundSize: "100% 100%",
//           backgroundRepeat: "no-repeat",
//           color: "whitesmoke",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "left",
//         }}
//       >
//         <Stack direction={"row"}>
//           <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//             {" "}
//             Education
//           </Typography>
//           <EducationEditBtn />
//         </Stack>
//       </Box>

//       {/* Experience */}

//       <Box
//         sx={{
//           p: 4,
//           backgroundImage: "linear-gradient(90deg,#084C91, #FFF)",
//           backgroundSize: "100% 100%",
//           backgroundRepeat: "no-repeat",
//           color: "whitesmoke",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "left",
//         }}
//       >
//         <Stack direction={"row"}>
//           <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//             {" "}
//             Experience
//           </Typography>
//           <ExpEditBtn />
//         </Stack>
//       </Box>

//       {/* Projects */}
//       <Box
//         sx={{
//           p: 4,
//           backgroundImage: "linear-gradient(90deg,#084C91, #FFF)",
//           backgroundSize: "100% 100%",
//           backgroundRepeat: "no-repeat",
//           color: "whitesmoke",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "left",
//         }}
//       >
//         <Stack direction={"row"}>
//           <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//             {" "}
//             Add Projects
//           </Typography>
//           <AddProjectsBtn />
//         </Stack>
//       </Box>

//       {/* Accomplishment*/}

//       {/* Personal Details*/}
//       <Box
//         sx={{
//           p: 4,
//           backgroundImage: "linear-gradient(90deg,#084C91, #FFF)",
//           backgroundSize: "100% 100%",
//           backgroundRepeat: "no-repeat",
//           color: "whitesmoke",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "left",
//         }}
//       >
//         <Stack direction={"row"}>
//           <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//             {" "}
//             Personal Details
//           </Typography>
//           <PersonalDeatailsBtn />
//         </Stack>
//      </Box>
