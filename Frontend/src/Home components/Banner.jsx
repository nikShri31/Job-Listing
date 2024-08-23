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
import React, { useState } from "react";


const Banner = ({ handleInputChange, query }) => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
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
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <Box >
      <Stack
        spacing={2}
        useFlexGap
        sx={{
          width: { xs: "100%", sm: "100%" },
       
        }}
      >
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            textAlign: "center",
            fontSize: "clamp(3.5rem, 10vw, 4rem)",
            color: "lightslategrey",
          }}
        >
          Find Your&nbsp;
          <Typography
            component="span"
            variant="h1"
            sx={{
              fontWeight: "bold",
              fontSize: "clamp(3rem, 10vw, 4rem)",
              color: "#032B53",
            }}
          >
            New Job Today
          </Typography>
        </Typography>
      </Stack>

      <Typography sx={{ ml: 3,color:'black' }}>
        Thousands of jobs in the computer, engineering and technology sectors
        are waiting for you.
      </Typography>

      <Stack direction={"row"}>
        <FormControl>
          {
            //<div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
            // <div className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full">
            //  <input
            //   type="text"
            //   name="username"
            //   id="username"
            //   className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            //   placeholder="What position are you looking for ?"
            //   onChange={handleInputChange}
            //   value={query}
            // />
          }
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
         

          {
            // {< className="flex md:rounded-none rounded ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3">
            //   <input
            //     type="text"
            //     name="username"
            //     id="username"
            //     className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            //     placeholder="Location"
            //     onChange={handleInputChange}
            //     value={""}
            //   />
            //   <FiMapPin className="absolute mt-2.5 ml-2 text-gray-400" />
            // </>
          }

          </FormControl>
          <Button type="submit">Search</Button>
      </Stack>
    </Box>
  );
};

export default Banner;
