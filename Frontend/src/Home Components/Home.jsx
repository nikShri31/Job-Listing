import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import JobCard from "./Card";
import Sidebar from "./Sidebar/Sidebar";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RightDrawer from "./RightDrawer";

const logoStyle = {
  width: "50px",
  height: "50px",
  margin: "0 15px",
  opacity: 0.8,
};

const Home = () => {
  // Initialize selectedCategory as null
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Sample Job:", data[0]); // Debugging
        setJobs(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      });
  }, []);

  // ----------- Input Filter -----------
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // ------------ Filter by Job Title -----
  const filteredItems = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(query.toLowerCase())
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Function to calculate the index range for the current page
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // Function to filter and paginate data
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    // Filtering based on query
    if (query) {
      filteredJobs = filteredItems;
    }

    // Applying selected category filter
    if (selected) {
      const lowerCaseSelected =
        typeof selected === "string" ? selected.toLowerCase() : "";
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          salaryType,
          experienceLevel,
          maxPrice,
          postingDate,
          employmentType,
        }) =>
          jobLocation.toLowerCase() === lowerCaseSelected ||
          postingDate === selected ||
          (!isNaN(parseInt(maxPrice)) &&
            parseInt(maxPrice) <= parseInt(selected)) ||
          salaryType.toLowerCase() === lowerCaseSelected ||
          experienceLevel.toLowerCase() === lowerCaseSelected ||
          employmentType.toLowerCase() === lowerCaseSelected
      );
    }

    // Calculate pagination
    const { startIndex, endIndex } = calculatePageRange();
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

    return { paginatedJobs, totalPages };
  };

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get the filtered and paginated data
  const { paginatedJobs, totalPages } = filteredData(
    jobs,
    selectedCategory,
    query
  );

  // Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  // const [appliedJobs, setAppliedJobs] = useState({});
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isButtonReset, setButtonReset] = useState(false);

  const handleCardClick = (job) => {
    if (selectedJob && selectedJob._id !== job._id) {
      setButtonReset(true);
    }
    setSelectedJob(job);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setButtonReset(false);
  };

  // const handleApply = (jobId) => {
  //   setAppliedJobs((prev) => ({ ...prev, [jobId]: true }));
  //   setSnackbarOpen(true);
  // };

  // Random skills
 const getRandomSkills = (skillsArray, numOfSkills)=> {
    return skillsArray
      .map((skill) => ({ skill, sort: Math.random() })) // Map to objects with random sort values
      .sort((a, b) => a.sort - b.sort) // Sort the array by random values
      .map(({ skill }) => skill) // Extract the skill names
      .slice(0, numOfSkills); // Get the first numOfSkills items
  }

  const handleSearch = () => {
    console.log("Search initiated");
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "left",
        pb: 4,
        gap: { xs: 4, sm: 6, md: 4 },
        backgroundColor: "#E3F0FE",
        minHeight: "100vh",
      }}
    >
      {/* Banner */}
      <Box
        fullWidth
        sx={{ width: "100%", maxWidth: 1200, px: { xs: 2, sm: 4 } }}
      >
        <Banner query={query} handleInputChange={handleInputChange} />
      </Box>

      {/* Main Content */}
      <Grid
        container
        spacing={4}
        sx={{ width: "100%", maxWidth: 1200, px: { xs: 2, sm: 4 } }}
      >
        {/* Sidebar */}
        <Grid item xs={12} md={3} sx={{ bgcolor: "#FFF", p: 2 }}>
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </Grid>

        {/* Search and Job Listings */}
        <Grid item xs={12} md={9} mt={-4}>
          {/* Search Bar */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={query}
              onChange={handleInputChange}
              sx={{ mr: 1, backgroundColor: "white" }}
            />
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={handleSearch}
              sx={{ py: 1 }}
            >
              Search
            </Button>
          </Box>

          {/* Job Cards */}
          <Box sx={{ bgcolor: "white", p: 2 }}>
            {isLoading ? (
              <Typography variant="body1">Loading...</Typography>
            ) : paginatedJobs.length > 0 ? (
              paginatedJobs.map((job) => (
                <JobCard
                  key={job._id}
                  data={job}
                  onClick={() => handleCardClick(job)}
                />
              ))
            ) : (
              <Typography variant="h6">No data found</Typography>
            )}

            {/* Pagination */}
            {paginatedJobs.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  sx={{ mx: 1 }}
                >
                  Previous
                </Button>
                <Typography component="span" sx={{ mx: 2 }}>
                  Page {currentPage} of {totalPages}
                </Typography>
                <Button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  sx={{ mx: 1 }}
                >
                  Next
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Drawer Component */}
      <RightDrawer
        isDrawerOpen={isDrawerOpen}
        //appliedJobs={appliedJobs}
        selectedJob={selectedJob}
      //  snackbarOpen={snackbarOpen}
        isButtonReset={isButtonReset}
        handleDrawerClose={handleDrawerClose}
       // handleApply ={handleApply }
        getRandomSkills={getRandomSkills}
      />
    </Box>
  );
};

export default Home;
