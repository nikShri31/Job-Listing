import {useState, useEffect} from "react"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoginBtn from "../../Authentication/LoginBtn"
import { useResponsive, useWidth } from "../../hooks/use-responsive";

export default function Heading() {
  const [login, setLogin] = useState(false)
  const [displayedText, setDisplayedText] = useState('');
  const fullText ='!!Get Your DREAM JOB!!'

  const isSmallScreen = useResponsive('down', 'sm');
  const isMediumScreen = useResponsive('between', 'sm', 'md');
  const isLargeScreen = useResponsive('up', 'md');
  const width = useWidth();

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
    <Box sx={{bgcolor:'white', height: '100vh',}}>
    <Box
      id="hero"
      sx={{
       
        backgroundImage:'url(https://www.zimyo.com/wp-content/uploads/2023/08/NA_October_10-1-768x439.jpg)',
        backgroundSize: isSmallScreen ? '100% 100%' : '50% 100%',
        backgroundRepeat: 'no-repeat',
        backdropFilter:'blur(20px)',
        opacity: isSmallScreen && '0.8',
        zIndex: 0,
       
        overflowX: 'hidden',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
         
          zIndex: 1,
          alignItems: isSmallScreen ? 'center' : 'flex-end',
          pt: isSmallScreen ? 14 : isMediumScreen ? 18 : 25,
          pb: isSmallScreen ? 8 : 12,
          px: width === 'xs' || width === 'sm' ? 2 : 4, // Padding control to prevent x-overflow
          // overflowX: 'hidden', 
          // Ensure no x-overflow inside the container
          overflowX: isSmallScreen && 'hidden', // Ensure no x-overflow inside the container
        }}
      >
        <Stack
         spacing={2} 
         useFlexGap 
         sx={{
          width: isSmallScreen ? '100%' : '70%',
          alignItems: 'center',
          px: width === 'xs' || width === 'sm' ? 1 : 2, // Additional padding control for content
        
        
        }}
        >
          <Typography
            variant= {isSmallScreen ? 'h3' : 'h1'}
            sx={{
              display: 'flex',
              flexDirection:  'row',
             
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: isSmallScreen ? '2.5rem' : 'clamp(3.5rem, 10vw, 4rem)',
              color: 'lightslategrey',
            }}
          >
           {firstPart}&nbsp;
            <Typography
              component="span"
              variant="h1"
              
              sx={{
                fontWeight: 'bold',
                fontSize: isSmallScreen ? '2.5rem' : 'clamp(3rem, 10vw, 4rem)',
                color: '#032B53',
              }}
            >
         {secondPart}
           
            </Typography>
          </Typography>
          <Typography
           component="div"
           variant= {isMediumScreen || isLargeScreen && 'h5'}
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '90%' }, px: width === 'xs' || width === 'sm' ? 1 : 4 }}
          >
          We have 100000+ great Job Offers for every Domain....
         
          </Typography>
          <Typography
           component="div"
           variant= {isMediumScreen || isLargeScreen && 'h5'}
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' }, px: width === 'xs' || width === 'sm' ? 1 : 2 }}
          >
        
          Join Us to get Hired and achive your Career Goals !!
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2,
               width: isSmallScreen ? '100%' : 'auto',
               px: width === 'xs' || width === 'sm' ? 1 : 2, // Ensure responsive padding for buttons
                }}
          >
          {// <LoginBtn role="Login to get started" variant={"outlined"}/>
            }
            login here
          </Stack>
         
        </Stack>
      </Container>
    </Box>
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