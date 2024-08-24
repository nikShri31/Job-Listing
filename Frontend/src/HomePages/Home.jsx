import React, { useEffect, useState } from "react";
import Banner from "../Home components/Banner";
import Card from "../Home components/Card";
import Jobs from "./Jobs";
import Sidebar from "../Sidebar/Sidebar";
import Newsletter from "../Home components/Newsletter";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import JobCard from "../Home components/Card";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {

        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    // console.log(event.target.value);
  };

  //------------filter by job title-----
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );
  // console.log(filteredItems);

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log(event.target.value);
  };

  // // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Function to calculate the index range for the current page
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

 
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    // Filtering Input Items

    console.log(filteredItems);
    if (query) {
      filteredJobs = filteredItems;
    }

   
    if (selected) {
      console.log(selected);

      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          salaryType,
          experienceLevel,
          maxPrice,
          postingDate,
          employmentType,
        }) =>
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          postingDate === selected ||
          parseInt(maxPrice) <= parseInt(selected) ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      );
      console.log(filteredJobs);
    }

    // Slice the data based on the current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => <JobCard key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <>
    <Box 
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: { xs: 4,sm:6,md:6 },
      py: { xs: 6, sm: 6 },
      textAlign: { sm: "center", md: "left" },
      backgroundColor:'#E3F0FE',
    backgroundSize: "100% 100%",
     
    }}
    >
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* main content */}
      <Box > {/*className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12" */}
      <Grid  container spacing={3} justifyContent={'flex-start'}>
        {/* left side */}
        <Grid item xs={12} minWidth={300}  md={2}   sx={{ backgroundColor:'#FFF',ml:5}}> {/**className="bg-white p-4 rounded" */}
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </Grid>

        {/* job cards */}
        <Grid  item xs={12}  md={5} sx={{bgColor:'white'}}> {/*className="col-span-2 bg-white p-4 rounded" */}
          {isLoading ? ( // Loading indicator
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
                {result.length} Jobs
              </Typography>
              <p>No data found</p>
            </>
          )}
          {/* pagination block here */}

          {result.length > 0 ? (
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 4, mx: 4 }}
            >
              {" "}
              {/*className="flex justify-center mt-4 space-x-8">*/}
              <Button
                onClick={prevPage}
                disabled={currentPage === 1}
                sx={{
                  "&:hover": {
                    textDecoration: "undrline",
                  },
                }}
              >
                Previous
              </Button>
              <Typography component={"span"} mx={2}>
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </Typography>
              <Button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
                sx={{
                  "&:hover": {
                    textDecoration: "undrline",
                  },
                }}
              >
                Next
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Grid>

       
        </Grid>
      </Box>
    </Box>
    </>
  );
};

export default Home;
