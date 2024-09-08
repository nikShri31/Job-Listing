
import { Box, Button, Stack, Typography } from '@mui/material'
import AppliedJobs from '../Components/Dashboard/AppliedJobs/AppliedJobs'
import Header_2 from '../Header/Header_2'
import {useState} from 'react'

const Dashboard = () => {
  return (
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
    <Typography>
    Dashboard
    </Typography>

    <Stack alignItems={'left'} spacing={2} px={4}>
      
      <AppliedJobs/>
      
      </Stack>
   
    </Box>
  )
}

export default Dashboard