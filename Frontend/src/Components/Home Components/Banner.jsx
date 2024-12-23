import {
  alpha,
  Box,
  Button,
  FormControl,
  InputBase,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";


// ----------------------------------------------------------------------

const Banner = () => {
 

  return (
    <Box sx={{ textAlign: "center", py: 4, px: { xs: 2, sm: 4 },}}>
      <Typography
        variant="h1"
        sx={{
          fontSize: "clamp(2.5rem, 5vw, 3rem)",
          color: "lightslategrey",
          mb: 2,
          width:'100%'
        }}
      >
        Find Your&nbsp;
        <Typography
          component="span"
          variant="h1"
          sx={{
            fontWeight: "bold",
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            color: "#032B53",
          }}
        >
          New Job Today
        </Typography>
      </Typography>
      <Typography sx={{ color: "black", mb: 3 }}>
        Thousands of jobs in the computer, engineering, and technology sectors
        are waiting for you.
      </Typography>
     
    </Box>
  );
};

export default Banner;
