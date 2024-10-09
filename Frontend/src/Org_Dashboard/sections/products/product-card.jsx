

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from '../../../utils/format-number';

import Label from '../../components/label/label';
import { ColorPreview } from '../../components/color-utils';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { setSelectedJob } from '../../../store/createJobSlice';

// ----------------------------------------------------------------------

export default function ApplicationsCard({application}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleViewDetails = () => {
    dispatch(setSelectedJob(application)); // Save the application data in Redux
    navigate('/org/create-job-form'); // Redirect to Create Job form
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
    <Card>
    <Box sx={{ pt: '100%', position: 'relative' }}>
      <Typography> {application?.title || 'No Title'}</Typography>
      <Typography> {application?.organisation || 'No Org'}</Typography>
      <Typography> {application?.location || 'No location'}</Typography>
      <Typography> {application?.salary || 'No salary'}</Typography>
    </Box>
    <Stack direction={'row'}>
      <Button onClick={handleViewDetails}>View Details</Button>
      <DeleteIcon />
    </Stack>
  </Card>
  );
}
