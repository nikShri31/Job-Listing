import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoginBtn from '../Authentication/LoginBtn';
import EmployerLoginBtn from '../Authentication/EmployersLoginBtn';

export default function EmployerHeading() {
  const [displayedText, setDisplayedText] = React.useState('');
  const fullText ='!!Hire best Candidates!!'

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

  const firstPart = displayedText.slice(1,10); 
  const secondPart = displayedText.slice(10,21);

  return (
    <Box
      id="hero"
      sx={{
       
        backgroundImage:'url(https://www.zimyo.com/wp-content/uploads/2023/08/NA_October_10-1-768x439.jpg)',
        backgroundSize:{xs:'100% 100%', sm:'50%,100%', lg:'50% 100%'},
        backgroundRepeat: 'no-repeat',
        backdropFilter:'blur(20px)'
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
       
        }}
      >
        <Stack spacing={2} useFlexGap 
        sx={{ 
          width: { xs: '100%', sm: '70%' },
          
       }}
        >
          <Typography
            variant="h2"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row'},
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
              color:'lightslategrey'
            }}
          >
           {firstPart}&nbsp;
            <Typography
              component="span"
              variant="h2"
              
              sx={{
                fontWeight:'bold',
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color:'#032B53',
              }}
            >
         {secondPart}
           
            </Typography>
          </Typography>
          <Typography
           component="div"
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
          We have 10000+ Deserving Profiles for every Domain....
         
          </Typography>
          <Typography
           component="div"
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
        
          Join Us to Hire new Talents and achive your Goals !!
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' }, color:'#032B53' }}
          >
          <Typography variant='h4'> Posting a Job ?</Typography>
         
            <Button href ="#" variant="contained" color="primary">
           <EmployerLoginBtn/>
            </Button>
          </Stack>
         
        </Stack>
     
      </Container>
    </Box>
  );
}
