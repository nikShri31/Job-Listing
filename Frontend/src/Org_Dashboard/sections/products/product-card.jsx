import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import { fCurrency } from '../../../utils/format-number';

import Label from '../../components/label/label';
import { ColorPreview } from '../../components/color-utils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteApplication, setSelectedJob } from '../../../store/createJobSlice';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import PlaceIcon from '@mui/icons-material/Place';
import BusinessIcon from '@mui/icons-material/Business';
import { fDate } from '../../../utils/format-time';
import { useState } from 'react';

// ----------------------------------------------------------------------

const cardStyle = {

  transition: 'box-shadow 0.3s ease-in-out',
  '&:focus': {
    outline: 'none',
  },
  '&:hover': {
    transform: 'translateZ(10px) scale(1.1)',
    boxShadow: ` 10px 10px 10px #00000041, inset 5px 5px 6px rgba(0, 0, 0, 0.2) `,
    fontWeight: 'bold',
  },
};

const chipStyle = {
  mt: 2,
  mx: 1,
  py: 0.5,
  bgcolor: 'lightgrey',
  fontSize: '1rem',
  height: 'auto', // Allow the height to auto-adjust based on content
  color: '#032B53',
  '& .MuiChip-label': {
    fontSize: '1.1rem', // Increase the font size of the label specifically
  },
};

function ConfirmDeleteDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle >Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this job?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

export default function ApplicationsCard({ application }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);
  // console.log('Card Application Data :', application);

  const handleViewDetails = () => {
    dispatch(setSelectedJob(application)); // Save the application data in Redux
    navigate(`/org/applicants`);
  };

  const handleDelete = async (jobId) => {
    dispatch(deleteApplication(jobId));
    setOpenConfirm(false);
  };

  // const handleDelete = async (jobId) => {
  //   // Optionally show a confirmation dialog here
  //   const confirmed = window.confirm('Are you sure you want to delete this application?');
  //   if (confirmed) {
  //    dispatch(deleteApplication(jobId));
  //
  //     // Example: await dispatch(fetchApplications());  to refetch the list
  //   }
  // };

  return (
    // <Card onClick={handleApplicants} sx={{ cursor: 'pointer' }}>
    <Card sx={cardStyle} elevation={6} >
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {' '}
          {application?.title || 'No Title'}
        </Typography>
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ mt: 1 }}>
          <Stack direction={'row'} spacing={1}>
            <PlaceIcon />{' '}
            <Typography variant="body1"> {application?.location || 'No location'}</Typography>
          </Stack>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ mt: 1 }}>
          <Stack direction={'row'} spacing={1}>
            <Chip label={application?.employmentType || 'No EmpType'} sx={chipStyle} />
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <Chip label={application?.jobType || 'No JobType'} sx={chipStyle} />
          </Stack>
        </Stack>
        <Stack sx={{ mt: 1 }}>
          <Typography textAlign={'left'}>
            {' '}
            Salary :{fCurrency(application.salary) || 'No Salary'} P.A.
          </Typography>
        </Stack>
        <Stack sx={{ mt: 1 }}>
          <Typography textAlign={'left'}>
            {' '}
            Posted on : {fDate(application?.postedDate) || 'No Posted Date'}
          </Typography>
        </Stack>
      </Box>
      <Stack direction={'row'} sx={{ p: 1 }} justifyContent={'space-between'}>
        <Button variant="outlined" onClick={handleViewDetails}>
          View Details
        </Button>
        <Button onClick={(e) => e.stopPropagation()}>
        <DeleteIcon color="error" onClick={() => setOpenConfirm(true)} />
      </Button>
    </Stack>
    <ConfirmDeleteDialog
      open={openConfirm}
      onClose={() => setOpenConfirm(false)}
      onConfirm={(e) => {
        e.stopPropagation(); // Prevent card click event
        handleDelete(application?._id); // Pass the jobId to the delete handler
      }}
    />
    </Card>
  );
}
