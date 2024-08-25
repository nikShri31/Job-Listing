import React, { useEffect, useState } from "react";
import Banner from "../HomeComponents/Banner";
import JobCard from "../HomeComponents/Card";
import Sidebar from "../Sidebar/Sidebar";
import { Box, Button, Grid, Typography } from "@mui/material";

const Home = () => {
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
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredItems = jobs.filter(
    (job) =>
      job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
      job.companyName.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleClick = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

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

  const filteredData = () => {
    let filteredJobs = filteredItems;

    if (selectedCategory) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          salaryType,
          experienceLevel,
          maxPrice,
          postingDate,
          employmentType,
        }) =>
          jobLocation.toLowerCase() === selectedCategory.toLowerCase() ||
          postingDate === selectedCategory ||
          parseInt(maxPrice) <= parseInt(selectedCategory) ||
          salaryType.toLowerCase() === selectedCategory.toLowerCase() ||
          experienceLevel.toLowerCase() === selectedCategory.toLowerCase() ||
          employmentType.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    const { startIndex, endIndex } = calculatePageRange();
    return filteredJobs.slice(startIndex, endIndex);
  };

  const result = filteredData();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 6, md: 6 },
        py: { xs: 6, sm: 8 },
        backgroundColor: "#E3F0FE",
        minHeight: "100vh",
      }}
    >
      <Banner query={query} handleInputChange={handleInputChange} />

      <Grid
        container
        spacing={3}
        sx={{ width: "100%", maxWidth: 1200, px: { xs: 2, sm: 4 } }}
      >
        <Grid item xs={12} md={3} sx={{ bgcolor: "#FFF", p: 2 }}>
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ bgcolor: "white", p: 2 }}>
            {isLoading ? (
              <Typography variant="body1">Loading...</Typography>
            ) : result.length > 0 ? (
              result.map((job) => <JobCard key={job._id} data={job} />)
            ) : (
              <Typography variant="h6">No data found</Typography>
            )}
            {result.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  sx={{ mx: 1 }}
                >
                  Previous
                </Button>
                <Typography component="span" sx={{ mx: 2 }}>
                  Page {currentPage} of{" "}
                  {Math.ceil(filteredItems.length / itemsPerPage)}
                </Typography>
                <Button
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredItems.length / itemsPerPage)
                  }
                  sx={{ mx: 1 }}
                >
                  Next
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
