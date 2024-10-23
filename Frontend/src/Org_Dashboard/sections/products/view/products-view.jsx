import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ApplicationsCard from '../product-card';

import Iconify from '../../../components/iconify';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplications, setSelectedJob } from '../../../../store/createJobSlice';

// ----------------------------------------------------------------------

export default function ProductsView() {


  const [openFilter, setOpenFilter] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const { applications, isLoading, error } = useSelector((state) => state.applications);

 useEffect(() => {
  if (isUserAuthenticated && role === 'Organisation' && applications.length === 0) {
    dispatch(fetchApplications());
  }
}, [isUserAuthenticated,isLoading, applications.length, dispatch]);


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
    <Container sx={{ minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        JOBS
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAddNewJob}
        >
          Add New Job
        </Button>
      </Stack>

      {isLoading && (
        <Typography variant="body1" align="center">
          Loading applications...
        </Typography>
      )}

      {!isLoading && applications.length === 0 && (
        <Typography variant="body1" align="center">
          No applications available.
        </Typography>
      )}

      {error && (
        <Typography variant="body1" color="error" align="center">
          {error.message}
        </Typography>
      )}

      {!isLoading && applications.length > 0 && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            flexWrap="wrap-reverse"
            sx={{ mb: 5 }}
          >
            <Stack direction="row" spacing={1}>
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
              <Grid item key={application.job?._id} xs={12} sm={6} md={4}>
                <ApplicationsCard application={application} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
