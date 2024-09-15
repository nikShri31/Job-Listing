import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";
import BusinessIcon from "@mui/icons-material/Business";

import { useDispatch, useSelector } from "react-redux";

import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { applyJob } from "../store/appliedJobsSlice";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 1,
  whiteSpace: "nowrap",
  width: 1,
});

// const logoStyle = {
//     width: "50px",
//     height: "50px",
//     margin: "0 15px",
//     opacity: 0.8,
//   };
const chipStyle = {
  mt: 2,
  mx: 1,
  py: 0.5,
  // Increase padding for a larger chip
  fontSize: "1rem", // Increase the font size
  height: "auto", // Allow the height to auto-adjust based on content
  color: "grey",
  "& .MuiChip-label": {
    fontSize: "1.1rem", // Increase the font size of the label specifically
  },
};

const RightDrawer = ({ isDrawerOpen, selectedJob, handleDrawerClose }) => {
  //     const [appliedJobs, setAppliedJobs] = useState({});
  //   const [snackbarOpen, setSnackbarOpen] = useState(false);
  //      const dispatch = useDispatch();
  //     // const userSelectedJob = useSelector((state) => state.appliedJobs.userSelectedJob);

  // // useEffect(() => {
  // //   if (userSelectedJob) {
  // //     // Open the drawer with the selected job details
  // //     openJobDetailsDrawer(userSelectedJob);
  // //   }
  // // }, [userSelectedJob]);

  // Resume State
  const [resumeFile, setResumeFile] = useState(null);
  const navigate = useNavigate();

  const handleResumeFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  // const handleApply = async (jobId) => {
  //   const formData = new FormData();
  //   formData.append("resume", resumeFile);
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:5000/api/application/apply/${jobId}`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   //response.data is the applicationData
  //   //global userData.application.push(response.data.application);
  //   setSnackbarOpen(true);
  //   navigate("/jobs");
  // };

  // Snackbar state
 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
 

  const [resumeBoxOpen, setResumeBoxOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setResumeBoxOpen(true);
  };

  const handleDialogClose = () => {
    setResumeBoxOpen(false);
  };

  // Get the applied jobs from Redux store
  const appliedJobs = useSelector((state) =>
    state.appliedJobs.userAppliedJobs.map((job) => job?.id)
  );

  // Check if the current job has already been applied
  const isJobApplied = appliedJobs.includes(selectedJob?._id);

  // handle apply
   const dispatch = useDispatch();

  const handleApply = () => {
    if (!resumeFile) {
      setSnackbarOpen(true);
      return;
    }

    dispatch(applyJob({ jobId: selectedJob?._id, resumeFile }));
    setSnackbarOpen(true);
    navigate("/dashboard"); // Navigate to dashboard after applying
  };


  // const handleApply = (jobId) => {
  //   if (!isJobApplied) {
  //     dispatch(setUserAppliedJobs(selectedJob));
  //     setSnackbarOpen(true);
  //     setResumeBoxOpen(false);
  //   }
  // };

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
                  src={selectedJob.logo}
                  alt={`${selectedJob?.organisation?.name} Logo`}
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
                    {selectedJob?.title}
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
                        {selectedJob?.organisation?.name}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      color="grey"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      <PlaceIcon />
                      <Typography variant="h6">
                        {selectedJob?.location}
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
                  Avg Salary - {selectedJob?.salary || "34,331"}k per year
                </Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: "#EBEBEB", borderRadius: "10px" }}>
                <Typography sx={{ fontWeight: "bold", color: "grey" }}>
                  Job Type - {selectedJob?.jobType || "Remote"}
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
              <Typography sx={{ ml: 1 }}>{selectedJob?.description}</Typography>
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
                {selectedJob?.requirements?.skills.map((skill, index) => (
                  <Chip key={index} label={skill} sx={chipStyle} />
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
              <>
            {isJobApplied ? (
                <Button
                  variant="contained"
                  fullWidth
                  disabled={isJobApplied}
                  sx={{color:'black'}}
                > 
                  Applied  
                </Button>
                ) : (
                  <React.Fragment>
                    <Button
                      variant="outline"
                      color="white"
                      onClick={handleClickOpen}
                    >
                      Add Your Resume
                    </Button>

                    <Dialog
                      fullScreen={fullScreen}
                      open={resumeBoxOpen}
                      onClose={handleDialogClose}
                      aria-labelledby="Add Your Resume"
                    >
                      <DialogTitle id="responsive-dialog-title">
                        {"Add Resume"}
                      </DialogTitle>
                      <DialogContent>
                        <Button
                          variant="contained"
                          component="label"
                          role={undefined}
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                        
                        >
                          Select Resume
                          <input
                            type="file"
                            hidden
                            onChange={handleResumeFileChange}
                          />
                        </Button>

                        {resumeFile && (
                          <Typography variant="body1" sx={{ marginTop: 2 }}>
                            Selected file: {resumeFile.name}
                          </Typography>
                        )}

                        <DialogContentText>
                          `Resume should be in (.pdf ,.docx,) upto 2MB `
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleDialogClose}>
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            handleApply(selectedJob?._id);
                          }}
                          disabled={isJobApplied} // Disable apply if already applied
                          variant="contained"
                          autoFocus
                        >
                          Apply Now
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>
                )}
              </>
            </Box>

            {/* Snackbar */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={1000}
              onClose={() => setSnackbarOpen(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              {resumeFile ? (
                <Alert
                  onClose={() => setSnackbarOpen(false)}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Successfully Applied!
                </Alert>
              ) : (
                <Alert
                  onClose={() => setSnackbarOpen(false)}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  please select a file...
                </Alert>
              )}
            </Snackbar>

            {/* Company Details */}
            <Box sx={{ my: 2 }}>
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
                        {selectedJob?.organisation?.name}
                      </Typography>
                      {/* <Rating
                        name="company-rating"
                        sx={{ ml: 3, color: "black" }}
                        defaultValue={4.5}
                        precision={0.5}
                        readOnly
                      /> */}
                    </Box>
                  </ListItemText>
                  <ListItemText sx={{ color: "black" }}>
                    <Typography variant="body2" color="text.secondary">
                      {selectedJob?.orgnaisation?.description ||
                        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
                    </Typography>
                  </ListItemText>
                  <ListItemText sx={{ color: "black" }}>
                    Main Office: {selectedJob?.location}
                  </ListItemText>
                  <ListItemText sx={{ color: "black" }}>
                    Web: {selectedJob?.organisation?.website}
                  </ListItemText>
                  <ListItemText sx={{ color: "black" }}>
                    Email: {selectedJob?.organisation?.contactInfo?.email || ""}
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
