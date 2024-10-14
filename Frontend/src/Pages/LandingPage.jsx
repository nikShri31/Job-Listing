import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Heading from "../Components/Landing Page/Heading";
//import Header from "../Header/Header";
import LogoCollection from "../Components/Landing Page/LogoCollection";
import Highlights from "../Components/Landing Page/Highlights";
import { Grid, Typography } from "@mui/material";
import { useResponsive } from "../hooks/use-responsive";
import { Helmet } from "react-helmet-async";

// ----------------------------------------------------------------------

export default function LandingPage() {

  const isSmallScreen = useResponsive("down", "sm");
  const isMediumScreen = useResponsive("between", "sm", "md");
  const isLargeScreen = useResponsive("up", "md");

  return (
    <>
    <Helmet>
    <title>  JOBBER  </title>
  </Helmet>
 
       {/* Heading section with responsive adjustments */}
       <Box
       sx={{
         width: "100%",
         overflowX: "hidden",
    
       }}
     >
       <Heading />
     </Box>

     {/* Wrapper for other sections */}
     <Box
       sx={{
         bgcolor: "background.default",
         width: "100%",
         overflowX: "hidden",
        
       }}
     >
       {/* LogoCollection with responsive adjustments */}
       <Box
      
       >
         <LogoCollection />
       </Box>

       {/* Highlights section with responsive adjustments */}
       <Box
         sx={{
        padding:isSmallScreen && 2
         
         }}
       >
         <Highlights />
       </Box>
     </Box>
    </>
  );
}
