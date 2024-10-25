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
  const [sortOption, setSortOption] = useState('newest');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { applications = [], isLoading, error } = useSelector((state) => state.applications);

  useEffect(() => {
    if (isUserAuthenticated && Array.isArray(applications) && applications.length === 0) {
      dispatch(fetchApplications());
    }
  }, [dispatch, isUserAuthenticated]);

 // console.log('FetchedApplications in ProductsView', applications);
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

  // Handle sorting

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const sortedApplications = [...applications].sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.postedDate) - new Date(a.postedDate);
    } else if (sortOption === 'oldest') {
      return new Date(a.postedDate) - new Date(b.postedDate);
    }
    return 0; 
  });

  return (
    <Container sx={{ minHeight: '100vh',
      backgroundImage: "linear-gradient(175deg, #E3F0FE 40%, #EDEFF1 )",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat", }}>
      <Typography variant="h3" sx={{ mb: 5 }}>
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
          {/* {console.log("Inside Loading")} */}
          Loading applications...
        </Typography>
      )}

      {!isLoading && Array.isArray(applications) && applications?.length === 0 && (
        <Typography variant="body1" align="center">
          {/* {console.log("L + A = 0")} */}
          No applications available.
        </Typography>
      )}

      {error && (
        <Typography variant="body1" color="error" align="center">
          {/* {console.log("Error")} */}
          {error.message}
        </Typography>
      )}
      {/* {console.log(applicationArray)} */}
      {!isLoading && Array.isArray(applications) && applications?.length > 0 && (
        <>
          {/* {console.log("inside div")} */}
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
              <ProductSort onSortChange={handleSortChange} selectedSort={sortOption} />
            </Stack>
          </Stack>

          <Grid container spacing={3}>
            {sortedApplications.map((application) => (
              <Grid item key={application?._id} xs={12} sm={6} md={4}>
                <ApplicationsCard application={application} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
