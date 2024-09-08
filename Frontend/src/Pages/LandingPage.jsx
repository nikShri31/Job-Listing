import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Heading from "../Components/Landing Page/Heading";
import Header from "../Header/Header";
import LogoCollection from "../Components/Landing Page/LogoCollection";
import Highlights from "../Components/Landing Page/Highlights";
import { Grid } from "@mui/material";

export default function LandingPage() {
  return (
    <Grid>
      <CssBaseline />
      {!localStorage.getItem("token") && <Header/>}
      {console.log(localStorage.getItem("token"))}
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
