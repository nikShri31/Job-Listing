import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, keyframes } from "@mui/material";
import { useResponsive } from "../../hooks/use-responsive";

const logos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",


];



const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "max-content",
  animation: `${scroll} 20s linear infinite`,
}));

export default function LogoCollection() {

  const isSmallScreen = useResponsive("down", "sm");
  const isMediumScreen = useResponsive("between", "sm", "md");
  const isLargeScreen = useResponsive("up", "md");

  const logoStyle = {
    width: isSmallScreen ? "50px" : isMediumScreen ? "80px" : "100px",
    height: isSmallScreen ? "40px" : isMediumScreen ? "60px" : "80px",
    margin: isSmallScreen ? "0 8px" : isMediumScreen ? "0 12px" : "0 16px",
    opacity: 0.7,
  };

  const animationDuration = isSmallScreen ? "15s" : isMediumScreen ? "20s" : "25s";

  return (
    <Box
      id="logoCollection"
      sx={{
        py: 4,
        backgroundImage: "linear-gradient(0deg, #E4F0FE, #FFF)",
        overflowX: "hidden",
        visibility: isSmallScreen && 'hidden',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box sx={{ maxWidth: "100%", overflowX: "hidden" }}>
        <Typography
          component="p"
          variant="subtitle2"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Trusted by the best companies
        </Typography>
        <LogoContainer sx={{animationDuration: animationDuration,}}>
          {logos.map((logo, index) => (
            <Box key={index} sx={{ flexShrink: 0 }}>
              <img
                src={logo}
                alt={`Fake company number ${index + 1}`}
                style={logoStyle}
              />
            </Box>
          ))}
          {logos.map((logo, index) => (
            <Box key={`${index}-duplicate`} sx={{ flexShrink: 0 }}>
              <img
                src={logo}
                alt={`Logo ${index + 1} duplicate`}
                style={logoStyle}
              />
            </Box>
          ))}
        </LogoContainer>
      </Box>
    </Box>
  );
}
