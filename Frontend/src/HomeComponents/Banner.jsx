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

const Banner = ({ handleInputChange, query }) => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <Box sx={{ textAlign: "center", py: 4, px: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
          color: "lightslategrey",
          mb: 2,
        }}
      >
        Find Your&nbsp;
        <Typography
          component="span"
          variant="h1"
          sx={{
            fontWeight: "bold",
            fontSize: "clamp(2rem, 5vw, 3rem)",
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
      <Stack direction={"row"} spacing={2} justifyContent="center">
        <FormControl sx={{ flex: 1 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleInputChange}
              value={query}
            />
          </Search>
        </FormControl>
        <Button variant="contained" color="primary">
          Search
        </Button>
      </Stack>
    </Box>
  );
};

export default Banner;
