import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";

const Newsletter = () => {
  return (
    <Box 
    sx={{
      minWidth:'100%'
    }}>
      <Box>
        <Typography variant='h5' sx={{ minWidth: "80%",}}>
          {" "}
          <FaEnvelopeOpenText /> Email me for jobs
        </Typography>
        <Typography component={'p'}>
          Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo
          ea foes.
        </Typography>
        <Box
          sx={{
           mt:1,
            
            minWidth: "80%",
            display:'flex',
            flexDirection:'column',
            alignItems:'flex-start'
          }}
        >
          <TextField label="name@email.com" sx={{maxWidth:250}} />
          <Button> subscribe</Button>
        </Box>
      </Box>

      {/* 2nd section */}
      <Box mt={5}>
        <Typography variant='h5'>
          <FaRocket /> Get noticed faster
        </Typography>
        <Typography component={'p'}>
          Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo
          ea foes.
        </Typography>
        <Box>
          <Button
            type="submit"
            value="Upload your resume"
            className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
           > Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Newsletter;

