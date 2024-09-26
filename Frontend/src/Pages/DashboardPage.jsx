
import { Box, Button, Stack, Typography } from '@mui/material'
import AppliedJobs from '../Components/Dashboard/AppliedJobs/AppliedJobs'
import { Helmet } from 'react-helmet-async'

// ----------------------------------------------------------------------

const Dashboard = () => {
  return (
    <>  
    <Helmet>
    <title> My Jobs | Jobber </title>
  </Helmet>
   <Box
    sx={{
      color: "#032340",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex_start",
      gap: { xs: 2, sm: 4 },
      py: { xs: 4, sm: 6 },
      textAlign: { sm: "center", md: "left" },
      bgcolor: "#E3F0FE",
    }}
    >
    

    <Stack alignItems={'left'} spacing={2} px={4}>
      
      <AppliedJobs/>
      
      </Stack>
   
    </Box>
  </>
   
  )
}

export default Dashboard;