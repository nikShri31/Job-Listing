import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function CustomLoading() {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        borderRadius: '50%',
        backgroundColor: '#E3F0FE',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
     
      <CircularProgress
        size={150}
        thickness={2}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          color: '#10BCDB',
        }}
      />
      {/* Loading text in the center with a pulsing effect */}
      <Typography
        variant="h6"
        sx={{
          zIndex: 2,
          color: '#778899',
          animation: 'pulse 1.5s infinite',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
            },
            '50%': {
              transform: 'scale(1.1)',
            },
            '100%': {
              transform: 'scale(1)',
            },
          },
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
}

export default CustomLoading;
