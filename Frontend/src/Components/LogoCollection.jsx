import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { styled, keyframes } from "@mui/material";

const logos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg",
];

const logoStyle = {
  width: "100px",
  height: "80px",
  margin: "0 32px",
  opacity: 0.7,
};

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// Styled component for the logo container
const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "max-content", // Ensures the container is only as wide as its content
  overflow: "hidden", // Prevents overflow issues within the container
  animation: `${scroll} 20s linear infinite`,
}));

export default function LogoCollection() {
  return (
    <Box
      id="logoCollection"
      sx={{
        py: 4,
        backgroundImage: "linear-gradient(100deg, #94DCFB, #FFF)",
        overflowX: "hidden",
        display: { xs: "none" , md:'block' },
      }}
    >
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        color="text.secondary"
      >
        Trusted by the best companies
      </Typography>
      <Grid container justifyContent="center" sx={{ mt: 5, opacity: 0.8 }}>
        <Box
          sx={{
            display: "flex",
            width: "100%", // Makes sure it takes up the full width of the container
            overflowX: "hidden", // Prevents horizontal scroll within the container
          }}
        >
          <LogoContainer>
            {logos.map((logo, index) => (
              <Grid item key={index}>
                <img
                  src={logo}
                  alt={`Fake company number ${index + 1}`}
                  style={logoStyle}
                />
              </Grid>
            ))}
            {logos.map((logo, index) => (
              <Grid item key={`${index}-duplicate`}>
                <img
                  src={logo}
                  alt={`Logo ${index + 1} duplicate`}
                  style={logoStyle}
                />
              </Grid>
            ))}
          </LogoContainer>
        </Box>
      </Grid>
    </Box>
  );
}
