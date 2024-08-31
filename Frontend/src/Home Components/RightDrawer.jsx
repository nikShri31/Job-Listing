import React, { useState } from "react";
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
import BusinessIcon from "@mui/icons-material/Business";

import { useDispatch } from 'react-redux';
import { applyJob } from "../store/appliedJobsSlice";

const logoStyle = {
    width: "50px",
    height: "50px",
    margin: "0 15px",
    opacity: 0.8,
  };
  

const RightDrawer = ({
  isDrawerOpen,
  selectedJob,
  isButtonReset,
  handleDrawerClose,
  getRandomSkills
}) => {

    const [appliedJobs, setAppliedJobs] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);   

    const dispatch = useDispatch();

    const handleApply = (jobId) => {
        setAppliedJobs((prev) => ({ ...prev, [jobId]: true }));
        setSnackbarOpen(true);
        dispatch(applyJob(selectedJob));
      };
    

  
  return (
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
              <Typography sx={{ ml: 1 }}>{selectedJob.description}</Typography>
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
                {getRandomSkills(selectedJob.skills, 8).map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    sx={{ mt: 1, mx: 0.5, p: 1, color: "grey" }}
                  />
                ))}
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
  );
};

export default RightDrawer;
