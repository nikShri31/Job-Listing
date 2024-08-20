import {
  Box,
  Chip,
  Container,
  Link,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import itJobs from "../../assets/jobList";
import PlaceIcon from "@mui/icons-material/Place";
import BusinessIcon from "@mui/icons-material/Business";
import JobStatus from "./JobStatus";
import { useState } from "react";

const AppliedJobs = () => {
  const [alignment, setAlignment] = useState("Today");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box
      sx={{
        color: "#032340",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex_start",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
        backgroundImage: "linear-gradient(130deg,lightgrey, #FFF)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
    <Box >
    <Stack direction={'row'} ml={2} alignItems="flex-start" >
    <Box minWidth={'30vh'} sx={{border:'2px solid white',p:2}}>
    <Typography variant="h6"> Jobs Applied</Typography>
    <Typography>2000</Typography>
    </Box>
    <Box minWidth={'30vh'} sx={{border:'2px solid white',p:2}}>
    <Typography variant="h6"> Recruiter's Action</Typography>
    <Typography>700</Typography>
    </Box>
  
    </Stack>
    </Box>
      <ToggleButtonGroup
        color='info'
        
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        
      >
        <ToggleButton value="Today" varient='filled'sx={{borderRadius:'50%',}}>Today</ToggleButton>
        <ToggleButton value=" Week">This Week</ToggleButton>
        <ToggleButton value=" Month">This Month</ToggleButton>
        <ToggleButton value=" Year"sx={{borderRadius:'50%',}}>This Year</ToggleButton>
      </ToggleButtonGroup>

      {itJobs.map((job) => (
        <Container
          key={job.title}
          sx={{
            backgroundImage: "linear-gradient(130deg,#CEE5FD, #FFF)",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            color: "#032340",
          
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent:'space-between',
            alignItems: "flex-start",
            border: "2px solid white",
          }}
        >
          <Stack direction={'row'}  justifyContent="space-between">
            <Box>
              <Link
                variant="h6"
                sx={{
                  py: 3,
                  cursor: "pointer",
                  color: "grey",
                  fontWeight: "bold",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#032340",
                    textDecoration: "underline",
                  },
                }}
              >
                {job.title}
              </Link>
              <Stack direction={"row"} spacing={1}>
                <BusinessIcon />
                <Typography>{job.company}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <PlaceIcon />
                <Typography>{job.location}</Typography>
              </Stack>
              <Typography>Applied 10 days ago</Typography>
            </Box>

            <Box m={4}>
              <JobStatus/>
            </Box>
          </Stack>
        </Container>
      ))}
    </Box>
  );
};

export default AppliedJobs;
