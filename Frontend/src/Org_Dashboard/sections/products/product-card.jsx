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
import { setSelectedJob } from '../../../store/createJobSlice';
import { Button, Chip } from '@mui/material';

import PlaceIcon from '@mui/icons-material/Place';
import BusinessIcon from '@mui/icons-material/Business';
import { fDate } from '../../../utils/format-time';

// ----------------------------------------------------------------------

const cardStyle={
  cursor: 'pointer',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:focus': {
    outline: 'none',
  },
  '&:hover': {
    transform: 'translateZ(10px) scale(1.1)',
    boxShadow: ` 10px 10px 10px #00000041, inset 5px 5px 6px rgba(0, 0, 0, 0.2) `,
    fontWeight: 'bold',
  },
}
const chipStyle = {
  mt: 2,
  mx: 1,
  py: 0.5,
  bgcolor:'lightgrey',
  // Increase padding for a larger chip
  fontSize: "1rem", // Increase the font size
  height: "auto", // Allow the height to auto-adjust based on content
  color: "#032B53",
  "& .MuiChip-label": {
    fontSize: "1.1rem", // Increase the font size of the label specifically
  },
};

export default function ApplicationsCard({ application }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('Card Application Data :', application);

  const handleViewDetails = () => {
    dispatch(setSelectedJob(application)); // Save the application data in Redux

    navigate(`/org/create-job-form`);
  };

  // const renderStatus = (
  //   <Label
  //     variant="filled"
  //     color={(product.status === 'sale' && 'error') || 'info'}
  //     sx={{
  //       zIndex: 9,
  //       top: 16,
  //       right: 16,
  //       position: 'absolute',
  //       textTransform: 'uppercase',
  //     }}
  //   >
  //     {product.status}
  //   </Label>
  // );

  // const renderImg = (
  //   <Box
  //     component="img"
  //     alt={product.name}
  //     src={product.cover}
  //     sx={{
  //       top: 0,
  //       width: 1,
  //       height: 1,
  //       objectFit: 'cover',
  //       position: 'absolute',
  //     }}
  //   />
  // );

  // const renderPrice = (
  //   <Typography variant="subtitle1">
  //     <Typography
  //       component="span"
  //       variant="body1"
  //       sx={{
  //         color: 'text.disabled',
  //         textDecoration: 'line-through',
  //       }}
  //     >
  //       {product.priceSale && fCurrency(product.priceSale)}
  //     </Typography>
  //     &nbsp;
  //     {fCurrency(product.price)}
  //   </Typography>
  // );

  return (
    // <Card onClick={handleApplicants} sx={{ cursor: 'pointer' }}>
    <Card sx={cardStyle} elevation={6} onClick={() => navigate('/org/applicants')}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {' '}
          {application?.job?.title || 'No Title'}
        </Typography>
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ mt: 1 }}>
          <Stack direction={'row'} spacing={1}>
            <PlaceIcon />{' '}
            <Typography variant="body1"> {application?.job?.location || 'No location'}</Typography>
          </Stack>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} sx={{ mt: 1 }}>
          <Stack direction={'row'} spacing={1}>
         <Chip label={application?.job?.employmentType || 'No EmpType'} sx={chipStyle} />
          </Stack>
          <Stack direction={'row'} spacing={1}>
             <Chip label={application?.job?.jobType || 'No JobType'} sx={chipStyle} />
           
          </Stack>
        </Stack>
        <Stack sx={{ mt: 1 }}>
          <Typography textAlign={'left'}>
            {' '}
            Salary : {fCurrency(application.job?.salary) || 'No salary'}
          </Typography>
        </Stack>
        <Stack sx={{ mt: 1 }}>
          <Typography textAlign={'left'}>
            {' '}
            Posted on : {fDate(application?.job?.postedDate) || 'No Posted Date'}
          </Typography>
        </Stack>
      </Box>
      <Stack direction={'row'} sx={{ p: 1 }} justifyContent={'space-between'}>
        <Button
          variant="outlined"
          onClick={(e) => {
            handleViewDetails();
          }}
        >
          View Details
        </Button>
        <DeleteIcon color="error" />
      </Stack>
    </Card>
  );
}
