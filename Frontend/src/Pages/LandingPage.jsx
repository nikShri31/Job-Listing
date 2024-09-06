import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Heading from "../Components/Heading";
//import Header from "../Header/Header";
import LogoCollection from "../Components/LogoCollection";
import Highlights from "../Components/Highlights";
import { Grid } from "@mui/material";

export default function LandingPage() {
  return (
    <Grid>
      <CssBaseline />
   
      <Heading />
      <Box
        sx={{
          bgcolor: "background.default",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <LogoCollection />
        <Highlights />
      </Box>
    </Grid>
  );
}
