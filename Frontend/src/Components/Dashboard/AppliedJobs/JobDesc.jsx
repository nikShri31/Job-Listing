import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
import {useNavigate} from "react-router-dom"
import { setUserSelectedJobId } from "../../../store/appliedJobsSlice";
import JobStatus from "./JobStatus";
import { useSelector } from "react-redux";

const chipStyle = {
  mt: 2,
  mx: 1,
  py: 0.5,
  bgcolor: 'lightgrey',
  fontSize: '1rem',
  height: 'auto',
  color: '#032B53',
  '& .MuiChip-label': {
    fontSize: '1.1rem',
  },
};



const JobDesc = ({applications}) => {

  const navigate = useNavigate();
  const {userSelectedJobId} = useSelector( (state) => state.appliedJobs)
  return (
    <Grid
            item
            xs={12}
            md={6}
            sx={{ display: 'flex', justifyContent: 'space-between', border: '1px solid blue' ,position:'sticky', height:'100vh'}}
          >
            {applications?.map((application) => {
              if (application._id === userSelectedJobId) {
                return (
                  <Box key={application._id}>
                    <Typography variant="h3" sx={{pt:3, px:3}}> {application.job?.title || 'No Job title'}</Typography>
                    
                    <Stack  direction={'row'}>
                    <Typography variant="body1"  p={1}> {application.organisation?.name || 'No Org..!!!'}</Typography>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Typography variant="body1"  p={1} > {application.job?.location || 'No Org..!!!'}</Typography>
                     </Stack>
                     
                     <Stack direction={'row'}>
                     <Typography variant="body1" p={1}> {application.job?.employmentType || 'No employement!!!'}</Typography>
                    <Divider orientation="vertical" variant="middle" flexItem />
                     <Typography variant="body1" p={1} > {application.job?.jobType || 'No Job Type..!!!'}</Typography>
                    </Stack>
                    
                    <Typography variant="body1" p={1}> Description :  {application.job?.description || 'No description !!'}</Typography>
                   
                    <Box sx={{my:2}} p={1}>
                    <Typography variant="h6">Skills required :</Typography>
                    {application.job.requirements?.skills.map((skill, index) => (
                        <Chip key={index} label={skill} sx={chipStyle} />
                      )) || 'No Skills!!!'}
                    </Box>
                    
                    <Divider />
                    {/** Status */}
                    <Stack m={2}>
                    <Typography variant="h5" sx={{pb:2}}>Application Status :</Typography>
                    <JobStatus />
                    </Stack>
                    <Divider />
                  </Box>
                );
              }
              return null;
            })}

          </Grid>
  );
};

export default JobDesc;
// posted
//openings
//applicants