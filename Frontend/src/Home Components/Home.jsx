import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import JobCard from "./Card";
import Sidebar from "./Sidebar/Sidebar";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  InputAdornment,
  Skeleton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

import JobDrawer from "./JobDrawer";
//import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserSelectedJobId } from "../store/appliedJobsSlice";
import { fetchAllJobs } from "../store/allJobsSlice";



// ----------------------------------------------------------------------


// for textfield and buttons
const useNoOutlineStyles = () => ({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", // Removes TextField outline
  },
  "&:focus": {
    outline: "none", // Removes outline on focus for buttons
  },
});

const Home = () => {
  // Initialize selectedCategory as null
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [query, setQuery] = useState("");
  
 
  const dispatch = useDispatch();
 

// fetching jobs from store
  const { jobs, isLoading, error } = useSelector((state) => state.allJobs);
  
  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);


  // ----------- Input Filter -----------
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // ------------ Filter items in search bar  -----
  const filteredItems = jobs.filter(
    (job) =>{
      return job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase()) ||
      job.organisation.name.toLowerCase().includes(query.toLowerCase());
    }
      
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
 const [snackbarOpen, setSnackbarOpen] = useState(false);                 // sanckbar
  const selectedJobId = useSelector((state) => state.appliedJobs?.userSelectedJobId);

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setIsDrawerOpen(true);
    dispatch(setUserSelectedJobId(job._id));
  };

  useEffect(() => {
    return () => {
      dispatch(setUserSelectedJobId(null)); // Clear the selected job ID when leaving the page
    };
  }, [dispatch]);
  
 

  useEffect(() => {
    if (selectedJobId && jobs.length > 0) { // Ensure there are jobs and a valid selectedJobId
      const pageNumber = findPageForJob(selectedJobId, jobs);
      
      if (pageNumber !== -1 && pageNumber !== currentPage) {
        setCurrentPage(pageNumber); // Set the current page if it's not correct
      } else {
        const job = jobs.find((job) => job._id === selectedJobId);
        if (job) {
          setSelectedJob(job);
          setIsDrawerOpen(true);  // Open the drawer only if the job is found
        } else {
          setIsDrawerOpen(false); // Close the drawer if no job is found
          console.error(`Job with id ${selectedJobId} not found`);
        }
      }
    } else {
      setIsDrawerOpen(false); // Close the drawer if there's no selectedJobId or jobs
    }
  }, [selectedJobId, jobs, currentPage]);
  

  const findPageForJob = (jobId, jobs) => {
    const index = jobs.findIndex((job) => job._id === jobId);
    if (index === -1) return -1; // Job not found
    return Math.floor(index / itemsPerPage) + 1;
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
 
  };

  const handleApplySuccess = () => {
    setSnackbarOpen(true);
    handleDrawerClose();
  };

  const handleSearch = () => {
    //console.log("Search initiated");
    setCurrentPage(1); // Reset to first page on search
  };

  const userAppliedJob = useSelector((state) => state.appliedJobs.userAppliedJobs || []);

  // Check if the current job has already been applied
 // const isJobApplied = userAppliedJob.length > 0 && userAppliedJob.includes(selectedJob?._id);

// Resume State
// const [resumeFile, setResumeFile] = useState(null);

// const handleResumeFileChange = (event) => {
//   setResumeFile(event.target.files[0]);
// };



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
        <Grid item  md={3} sx={{ bgcolor: "#FFF", p: 2, display:{xs:'none', md:'flex'} }}>
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </Grid>

        {/* Search and Job Listings */}
        <Grid item xs={12} md={9} mt={-4}>
          {/* Search Bar */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1,}}>
            <TextField
              fullWidth
              size={"medium"}
              variant="outlined"
              placeholder="Search.... job Location / job Profile..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              value={query}
              onChange={handleInputChange}
              sx={[
                useNoOutlineStyles(),
               { mr: 1,
                backgroundColor: "white",
                borderRadius: '40px',
                fontSize: {xs:'1rem', md:'2rem'},
                '&:hover':{border:'1px solid #aaa',borderRadius:'40px'},
                "&:focus": {
                  outline: "blue", 
                },
              }]}
            />
            <Button
              variant="contained"
              color='inherit'
              size="medium"
              onClick={handleSearch}
              sx={[ 
              useNoOutlineStyles(),
              { py:{xs:0, md:1},
              border:'none',
            '&:hover': {
              transform: "scale(1.05) translateZ(30px)",
                        
                        fontWeight: 'bold',
                      },
            }
              ]}
            >
              Search
            </Button>
          </Box>

          {/* Job Cards */}
          <Box sx={{ bgcolor: "white", p: 2 ,}}>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Skeleton animation='wave' variant="rectangular" width='100vw' height={100} />
            </Box>
            ) 
            : error ? (
              <Card sx={{ p: 2, backgroundColor: '#fff5f5', borderRadius: 2, boxShadow: 3 }}>
                  <Alert
                    severity="error"
                    variant="filled"
                    sx={{ mb: 2, alignItems: 'center', justifyContent: 'center' }}
                    icon={<ErrorOutlinedIcon fontSize="large" />}
                  >
                    <Typography variant='h6'>
                  {typeof error === "object" && error.error && error.error.message 
                    ? error.error.message 
                    : JSON.stringify(error)}
                  </Typography>
                  </Alert>
                </Card>
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
              <Typography color={"primary"} variant="h4" textAlign={'center'}>No Jobs Found !!!</Typography>
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
        <JobDrawer
          isDrawerOpen={isDrawerOpen}
          handleApplySuccess={handleApplySuccess}
          selectedJob={selectedJob}
          handleDrawerClose={handleDrawerClose}
          // handleApply ={handleApply }
        />
      </Box>

     {/* Snackbar */}
     <Snackbar
     open={snackbarOpen}
     autoHideDuration={3000}
     onClose={() => setSnackbarOpen(false)}
     anchorOrigin={{ vertical: "top", horizontal: "center" }}
   >
     <Alert onClose={() => setSnackbarOpen(false)} severity="success">
       Successfully Applied!
     </Alert>
   </Snackbar>
           
    </Box>
  );
};

export default Home;


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
