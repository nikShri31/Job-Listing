import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'

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
        // backgroundImage: "linear-gradient(130deg,lightgrey,#CEE5FD)",
        // backgroundSize: "100% 100%",
        // backgroundRepeat: "no-repeat",
      }}
    >
    <Typography>
    Dashboard
    </Typography>

    <Stack direction={'row'} spacing={2} px={4}>
      <Button>
      <Typography variant="h5" sx={{fontWeight:'bold'}}> My Jobs</Typography>
      </Button>
      <Button>
      <Typography variant="h5" sx={{fontWeight:'bold'}}> Notification</Typography>
      </Button>
      </Stack>
    
    </Box>
  )
}

export default Dashboard;