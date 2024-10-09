import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Job applied',
 
  'Awaiting Recruiter Action',
];

export default function JobStatus() {
  return (
    <Box sx={{ width: '200%' }}>
      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label,index) => (
          <Step key={label}>
            <StepLabel 
            sx={{
              '& .MuiStepLabel-label': {
                color: index === 0 ? 'green' : 'inherit', // Apply green color to the active step label
              },
              '& .MuiStepIcon-root': {
                color: index === 0 ? 'green' : 'inherit', // Apply green color to the active step icon
              },
            }}
            >{label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
