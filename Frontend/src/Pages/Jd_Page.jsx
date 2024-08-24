import React from "react";

import Footer from "../Footer/Foooter";
import JobDesc from "../Components/JobDesc";
import { Box } from "@mui/material";
import ResponsiveAppBar from "../Header/Header_2";

const JD = () => {
  const [mode, setMode] = React.useState("light");
  return (
    <>
      <Box sx={{ bgcolor: "white" }}>
        <JobDesc />
      </Box>
    
    </>
  );
};

export default JD;
