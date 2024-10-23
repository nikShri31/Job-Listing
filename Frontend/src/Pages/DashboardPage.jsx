import { Box, Button, Stack, Typography } from '@mui/material';
import AppliedJobs from '../Components/Dashboard/AppliedJobs/AppliedJobs';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title> My Jobs | Jobber </title>
      </Helmet>
      <>
        <AppliedJobs />
      </>
    </>
  );
};

export default Dashboard;
