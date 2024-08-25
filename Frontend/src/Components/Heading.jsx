import {useState, useEffect} from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoginBtn from "../Authentication/LoginBtn"

export default function Heading() {
  const [login, setLogin] = useState(false)
  const [displayedText, setDisplayedText] = useState('');
  const fullText ='!!Get Your DREAM JOB!!'

  useEffect(()=>{
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

  const firstPart = displayedText.slice(1, 9); 
  const secondPart = displayedText.slice(9,19);

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
           {firstPart}&nbsp;
            <Typography
              component="span"
              variant="h1"
              
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
          We have 100000+ great Job Offers for every Domain....
         
          </Typography>
          <Typography
           component="div"
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
        
          Join Us to get Hired and achive your Career Goals !!
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
           <LoginBtn role="Login to get started" variant={"outlined"}/>
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