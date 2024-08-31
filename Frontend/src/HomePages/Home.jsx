import React, { useEffect, useState } from "react";
import Banner from "../HomeComponents/Banner";
import JobCard from "../HomeComponents/Card";
import Sidebar from "../Sidebar/Sidebar";
import {
  Alert,
  Box,
  Button,
  Chip,
  Drawer,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";

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
  const [appliedJobs, setAppliedJobs] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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

  const handleApply = (jobId) => {
    setAppliedJobs((prev) => ({ ...prev, [jobId]: true }));
    setSnackbarOpen(true);
  };

  // Random skills
  function getRandomSkills(skillsArray, numOfSkills) {
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
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ width: 500, py: 4, px: 3 }}>
          {selectedJob && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                gap: { xs: 4, sm: 3 },
                textAlign: { sm: "left", md: "left" },
              }}
            >
              {/* Heading */}
              <Grid
                container
                spacing={1}
                sx={{
                  maxWidth: { xs: "270px", sm: "none" },

                  backgroundImage: "linear-gradient(90deg,#E3F0FE, white)",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: `10px 10px 10px #00000041, inset 5px 5px 6px rgba(0, 0, 0, 0.2)`,
                  },
                }}
              >
                <Grid item xs={12} sm={2}>
                  <img
                    src={selectedJob.companyLogo}
                    alt={`${selectedJob.companyName} Logo`}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "4px",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack direction={"column"}>
                    <Typography
                      variant="h5"
                      sx={{
                        px: 1,
                        color: "matteblue",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {selectedJob.jobTitle}
                    </Typography>
                    <Stack direction="row" spacing={5} sx={{ ml: 2 }}>
                      <Stack
                        spacing={1}
                        direction={"row"}
                        color="grey"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        <BusinessIcon />
                        <Typography variant="h6">
                          {selectedJob.companyName}
                        </Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        color="grey"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        <PlaceIcon />
                        <Typography variant="h6">
                          {selectedJob.jobLocation}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>

              {/* Salary and Job Type */}
              <Stack direction={"row"} spacing={6} sx={{ mt: 0 }}>
                <Box sx={{ p: 2, bgcolor: "#EBEBEB", borderRadius: "10px" }}>
                  <Typography sx={{ fontWeight: "bold", color: "grey" }}>
                    Avg Salary - {selectedJob.avgSalary || "34,331 per year"}
                  </Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: "#EBEBEB", borderRadius: "10px" }}>
                  <Typography sx={{ fontWeight: "bold", color: "grey" }}>
                    Job Type - {selectedJob.jobType || "Remote"}
                  </Typography>
                </Box>
              </Stack>

              {/* About */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  color="primary.main"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  About the Job
                </Typography>
                <Typography sx={{ ml: 1 }}>
                  {selectedJob.description}
                </Typography>
              </Box>

              {/* Skills */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  color="primary.main"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Required Skills
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {getRandomSkills(selectedJob.skills, 8).map(
                    (skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        sx={{ mt: 1, mx: 0.5, p: 1, color: "grey" }}
                      />
                    )
                  )}
                </Box>
              </Box>

              {/* Education and Experience */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  color="primary.main"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Education and Experience
                </Typography>
                <List>
                  {[
                    "2 or more years of professional design experience",
                    "Ecommerce website design experience",
                    "Familiarity with mobile and web apps preferred",
                    "Website design experience",
                  ].map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                        <DoubleArrowRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Apply Button */}

              <Box
                sx={{
                  mt: "auto",
                  position: "fixed",
                  bottom: 0,
                  right: 10,
                  width: 500,
                  px: 4,
                  py: 2,
              
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  color={
                    appliedJobs[selectedJob._id] && !isButtonReset
                      ? "success"
                      : "primary"
                  }
                  onClick={() => handleApply(selectedJob.id)}
                  disabled={appliedJobs[selectedJob.id]}
                  sx={{}}
                >
                  {appliedJobs[selectedJob.id] ? "Applied" : "Apply Now"}
                </Button>
              </Box>

              {/* Snackbar */}
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={() => setSnackbarOpen(false)}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Successfully Applied!
                </Alert>
              </Snackbar>

              {/* Company Details */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  color="primary.main"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Company Details
                </Typography>
                <List>
                  <ListItem
                    sx={{ flexDirection: "column", alignItems: "flex-start" }}
                  >
                    <ListItemText>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "black",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          {selectedJob.companyName}
                        </Typography>
                        <Rating
                          name="company-rating"
                          sx={{ ml: 3, color: "black" }}
                          defaultValue={4.5}
                          precision={0.5}
                          readOnly
                        />
                      </Box>
                    </ListItemText>
                    <ListItemText sx={{ color: "black" }}>
                      <Typography variant="body2" color="text.secondary">
                        {selectedJob.companyDescription ||
                          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
                      </Typography>
                    </ListItemText>
                    <ListItemText sx={{ color: "black" }}>
                      Main Office: {selectedJob.jobLocation}
                    </ListItemText>
                    <ListItemText sx={{ color: "black" }}>
                      Web:{" "}
                      {selectedJob.companyWebsite ||
                        `${selectedJob.companyName.trim()}.com`}
                    </ListItemText>
                    <ListItemText sx={{ color: "black" }}>
                      Email:{" "}
                      {selectedJob.contactEmail || "carrier.bern@gmail.com"}
                    </ListItemText>
                  </ListItem>
                </List>
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Home;
