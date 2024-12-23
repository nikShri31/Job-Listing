import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
//import LoginBtn from '../../Authentication/LoginBtn';
import { useResponsive, useWidth } from '../../hooks/use-responsive';
import { useSelector } from 'react-redux';

export default function Heading() {
  const [displayedText, setDisplayedText] = useState('');
  const {role, isAuthenticated} = useSelector((state) => state.auth);

  const isSmallScreen = useResponsive('down', 'sm');
  const isMediumScreen = useResponsive('between', 'sm', 'md');
  const isLargeScreen = useResponsive('up', 'md');
  const width = useWidth();

  const getRoleBasedText = () => {
    if (isAuthenticated && role === 'employee') {
      return {
        title: '  Get Your DREAM JOB !!',
        description1: 'We have 100000+ great Job Offers for every Domain....',
        description2: 'Join Us to get Hired and achieve your Career Goals!!',
      };
    }
    else if (isAuthenticated && role === 'Organisation') {
      return {
        title: '  Hire The BEST TALENT',
        description1: 'Find the top talent to boost your organization....',
        description2: 'Join Us to find the perfect candidates for your company!',
      };
    }
    return {
      title: '  Welcome on JOBBER !! ',
      description1: 'Explore a world of opportunities and find your dream job!',
      description2: 'Sign up to get started and take your career to the next level!',
    };
  };

  const { title, description1, description2 } = getRoleBasedText();

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < title.length - 1) {
        setDisplayedText((prev) => prev + title[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [title.length]);

  return (
    <Box sx={{ bgcolor: 'white', height: '100vh' }}>
      <Box
        id="hero"
        sx={{
          backgroundImage:
            'url(https://www.zimyo.com/wp-content/uploads/2023/08/NA_October_10-1-768x439.jpg)',
          backgroundSize: isSmallScreen ? '100% 100%' : '50% 100%',
          backgroundRepeat: 'no-repeat',
          backdropFilter: 'blur(20px)',
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
            px: width === 'xs' || width === 'sm' ? 2 : 4,
            overflowX: isSmallScreen && 'hidden',
          }}
        >
          <Stack
            spacing={2}
            useFlexGap
            sx={{
              width: isSmallScreen ? '100%' : '70%',
              alignItems: 'center',
              px: width === 'xs' || width === 'sm' ? 1 : 2,
            }}
          >
            <Typography
              variant={isSmallScreen ? 'h3' : 'h1'}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: isSmallScreen ? '2.5rem' : 'clamp(3.5rem, 10vw, 4rem)',
                color: 'lightslategrey',
              }}
            >
              {displayedText}
            </Typography>
            <Typography
              component="div"
              variant={isMediumScreen || (isLargeScreen && 'h5')}
              textAlign="center"
              color="text.secondary"
              sx={{
                alignSelf: 'center',
                width: { sm: '100%', md: '90%' },
                px: width === 'xs' || width === 'sm' ? 1 : 4,
              }}
            >
              {description1}
            </Typography>
            <Typography
              component="div"
              variant={isMediumScreen || (isLargeScreen && 'h5')}
              textAlign="center"
              color="text.secondary"
              sx={{
                alignSelf: 'center',
                width: { sm: '100%', md: '80%' },
                px: width === 'xs' || width === 'sm' ? 1 : 2,
              }}
            >
              {description2}
            </Typography>
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
