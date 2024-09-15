import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import JobCard from "./Card";
import Sidebar from "./Sidebar/Sidebar";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RightDrawer from "./RightDrawer";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserSelectedJobView } from "../store/appliedJobsSlice";
import axios from "axios";
import { fetchAllJobs } from "../store/allJobsSlice";

const logoStyle = {
  width: "50px",
  height: "50px",
  margin: "0 15px",
  opacity: 0.8,
};

const Home = () => {
  // Initialize selectedCategory as null
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [query, setQuery] = useState("");

 

  // useEffect(() => {
  //   const getJobs = async () => {
  //     try {
  //       const jobs = await axios.get("http://localhost:5000/api/job/getAll", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       setJobs(jobs.data.jobs);
  //       setIsLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setIsLoading(false);
  //     }
  //   };
    
  //   getJobs();
  // }, []);


// fetching jobs from store
  const dispatch = useDispatch();
  const { jobs, isLoading, error } = useSelector((state) => state.allJobs);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

 

  // useEffect(() => {
  //   fetch("jobs.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Sample Job:", data[0]); // Debugging
  //       setJobs(data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching jobs:", error);
  //       setIsLoading(false);
  //     });
  // }, []);

  // ----------- Input Filter -----------
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // ------------ Filter items in search bar  -----
  const filteredItems = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase()) ||
      job.organisation.toLowerCase().includes(query.toLowerCase())
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
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
      const selectedDate = new Date(selected);

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
        }) => {
          // Convert job posting date to a Date object
          const jobPostingDate = new Date(postingDate);

          // Check if the jobPostingDate is greater than or equal to the selectedDate
          const isDateValid = jobPostingDate >= selectedDate;
          return (
            jobLocation.toLowerCase() === lowerCaseSelected ||
            isDateValid ||
            (!isNaN(parseInt(maxPrice)) &&
              parseInt(maxPrice) <= parseInt(selected)) ||
            salaryType.toLowerCase() === lowerCaseSelected ||
            experienceLevel.toLowerCase() === lowerCaseSelected ||
            employmentType.toLowerCase() === lowerCaseSelected
          );
        }
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
  const selectedJobId = useSelector(
    (state) => state.appliedJobs.userSelectedJobId
  );
 

  useEffect(() => {
    if (selectedJobId) {
      const pageNumber = findPageForJob(selectedJobId, jobs);
      if (pageNumber !== -1 && pageNumber !== currentPage) {
        setCurrentPage(pageNumber);
      } else {
        const job = jobs.find((job) => job._id === selectedJobId);
        if (job) {
          setSelectedJob(job);
          setIsDrawerOpen(true);
          dispatch(clearUserSelectedJobId());
        }
      }
    }
  }, [selectedJobId, jobs, currentPage, dispatch]);

  const findPageForJob = (jobId, jobs) => {
    const index = jobs.findIndex((job) => job._id === jobId);
    if (index === -1) return -1; // Job not found
    return Math.floor(index / itemsPerPage) + 1;
  };
  // const [appliedJobs, setAppliedJobs] = useState({});
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [isButtonReset, setButtonReset] = useState(false);

  //  const location = useLocation();

  //  useEffect(() => {
  //    const params = new URLSearchParams(location.search);
  //    const jobId = params.get('jobId');
  //    if (jobId) {
  //      const job = jobs.find(j => j.id === jobId);
  //      if (job) {
  //        setSelectedJob(job);
  //        setIsDrawerOpen(true);
  //      }
  //    }
  //  }, [location, jobs]);

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    //setButtonReset(false);
  };

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
              placeholder="Search.... job Location / job Profile..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={query}
              onChange={handleInputChange}
              sx={{ mr: 1, backgroundColor: "white", borderRadius:'40px' }}
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
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
            ) 
            : error ? (
              <Typography color="error">
                  {typeof error === "object" && error.error && error.error.message 
                    ? error.error.message 
                    : JSON.stringify(error)}
                  </Typography>
            ) 
            : paginatedJobs.length > 0 ? (
              paginatedJobs.map((job) => (
                <JobCard
                  key={job._id}
                  data={job}
                  onClick={() => handleCardClick(job)}
                />
              ))
            ) : (
              <Typography variant="h6">No jobs found</Typography>
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
      <Box>
        <RightDrawer
          isDrawerOpen={isDrawerOpen}
          //appliedJobs={appliedJobs}
          selectedJob={selectedJob}
          //  snackbarOpen={snackbarOpen}
          //isButtonReset={isButtonReset}
          handleDrawerClose={handleDrawerClose}
          // handleApply ={handleApply }
        />
      </Box>
    </Box>
  );
};

export default Home;
