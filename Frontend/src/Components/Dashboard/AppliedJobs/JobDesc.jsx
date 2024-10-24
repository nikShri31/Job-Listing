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
} from '@mui/material';
import React from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import { useNavigate } from 'react-router-dom';
import { setUserSelectedJobId } from '../../../store/appliedJobsSlice';
import JobStatus from './JobStatus';
import { useSelector } from 'react-redux';

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

const JobDesc = ({ applications }) => {
  const { userSelectedJobId } = useSelector((state) => state.appliedJobs);

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #e0f7fa 30%, #fce4ec 90%)',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        color: '#333',
      }}
    >
      {applications?.map((application) => {
        if (application._id === userSelectedJobId) {
          return (
            <Box key={application._id}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#004d40',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                {application.job?.title || 'No Job Title'}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ py: 2 }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#00796b' }}>
                  {application.organisation?.name || 'No Organization'}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#00796b' }}>
                  {application.job?.location || 'No Location'}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ py: 2 }}>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#00796b' }}>
                  {application.job?.employmentType || 'No Employment Type'}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#00796b' }}>
                  {application.job?.jobType || 'No Job Type'}
                </Typography>
              </Stack>

              <Typography
                variant="body1"
                sx={{
                  my: 2,
                  fontSize: '1.05rem',
                  lineHeight: 1.5,
                  color: '#004d40',
                }}
              >
               <b>Description : </b>  {application.job?.description || 'No Description'}
              </Typography>

              <Box sx={{ my: 3}}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                  Skills Required:
                </Typography>
                {application.job.requirements?.skills.map((skill, index) => (
                  <Chip key={index} label={skill} sx={chipStyle} />
                )) || <Typography>No Skills</Typography>}
              </Box>

              <Divider sx={{ my: 3, borderColor: '#b0bec5' }} />

              {/* Status */}
              <Stack m={2}>
                <Typography
                  variant="h5"
                  sx={{
                    pb: 2,
                    fontWeight: 'bold',
                    color: '#1565c0',
                  }}
                >
                  Application Status:
                </Typography>
                <JobStatus />
              </Stack>
            </Box>
          );
        }
        return null;
      })}
    </Box>
  );
};

export default JobDesc;

// posted
//openings
//applicants
