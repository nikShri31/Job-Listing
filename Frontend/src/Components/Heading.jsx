import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Heading() {
  const [displayedText, setDisplayedText] = React.useState('');
  const fullText = 'Get Your Dream Job'

  React.useEffect(()=>{
    let index =0;
    const typingInterval = setInterval(()=>{
      if(index < fullText.length){
        setDisplayedText((prev)=>prev + fullText[index]);
        index++;
      }
      else {
        clearInterval(typingInterval);
      }
    },100);
    return () => clearInterval(typingInterval);
  },[])

  const firstPart = displayedText.slice(0, 7); 
  const secondPart = displayedText.length > 7 ? displayedText.slice(7) : '';
  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        backgroundImage:'url(https://img.freepik.com/free-vector/light-blue-curve-frame-template_53876-114602.jpg?ga=GA1.2.155362234.1722838665&semt=ais_hybrid)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
              color:'lightslategrey'
            }}
          >
           Get Your&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: 'primary.main',
              }}
            >
          Dream Job
           
            </Typography>
          </Typography>
          <Typography
           component="div"
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
          We have 100000+ great Job Offers for every Domain....
         
          </Typography>
          <Typography
           component="div"
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
        
          Join Us to get Hired and achive your Career Goals!!!
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
           
            <Button href ="#" variant="contained" color="primary">
              Login to Get Started
            </Button>
          </Stack>
         
        </Stack>
      
      </Container>
    </Box>
  );
}



/**
   <Box
          id="image"
          sx={{
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '100%',
             backgroundImage:'linear-gradient(180deg, #CEE5FD, #FFF)',
            backgroundImage:'url("/static/images/templates/templates-images/hero-light.png")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor: alpha('#BFCCD9', 0.5),
            boxShadow: `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`,
          }}
        />
 */