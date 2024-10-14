import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';


import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';


import Iconify from '../../../components/iconify';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ApplicationsCard from '../product-card';
import { fetchApplications, setSelectedJob } from '../../../../store/createJobSlice';



// ----------------------------------------------------------------------

export default function ProductsView() {


  const [openFilter, setOpenFilter] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);
 const { applications, isLoading, error } = useSelector((state) => state.applications);

 useEffect(() => {
  if(isUserAuthenticated && !isLoading){
dispatch(fetchApplications()); // Fetch applications when the component mounts
  }
}, [isUserAuthenticated, dispatch,applications.lenght,dispatch]);


  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
 
    // Handle adding a new job
    const handleAddNewJob = () => {
      dispatch(setSelectedJob(null));
      navigate('/org/create-job-form');
    };
  

  return (
    <Container sx={{minHeight:'100vh'}}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        JOBS
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}  onClick={handleAddNewJob}>
     Add New Job
      </Button>
   </Stack>

 {applications.length===0 && <Typography textAlign={'center'} >No applications... </Typography>}

     {  applications.length>0 && (
      <>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {applications.map((application) => (
          <Grid key={application.id} xs={12} sm={6} md={4}>
            <ApplicationsCard application={application} />
          </Grid>
        ))}
      </Grid>
    </>
    )}

      
    </Container>
  );
}
