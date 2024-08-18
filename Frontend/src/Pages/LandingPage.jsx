import * as React from "react";


import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import { ThemeProvider,createTheme } from "@mui/material/styles";

import Heading from "../Components/Heading";
import Header from "../Header/Header";
import LogoCollection from "../Components/LogoCollection";
import Highlights from "../Components/Highlights";
import Footer from "../Footer/Foooter";



export default function LandingPage() {
  const [mode, setMode] = React.useState("light");

  //const defaultTheme = createTheme({ palette: { mode } });

  return (
    <>
      <CssBaseline />

      <Header  />
      <Heading />
      <Box sx={{ bgcolor: "background.default", }}>
        <LogoCollection />
        <Highlights />
        <Footer />
      </Box>
    </>
  );
}

