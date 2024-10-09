import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import {
  Card,
  Container,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material';
import { useTheme } from '@emotion/react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createApplication } from '../../../store/createJobSlice';

// import AppTheme from '../shared-theme/AppTheme';
//import ColorModeSelect from '../shared-theme/ColorModeSelect';

const FormContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function CreateNewJob() {
  const theme = useTheme();
  const navigate = useNavigate();
  const selectedJob = useSelector((state) => state.applications.selectedJob); // Assuming selectedJob contains job data

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    experience: '',
    education: '',
    employmentType: '',
    jobType: '',
  });
  const [isEditable, setIsEditable] = useState(false);
  const [fieldError, setFieldError] = useState({});

  //organisation :not from selectedJob but from userData - id

  useEffect(() => {
    if (selectedJob) {
      setFormData({
        title: selectedJob.title || '',
        description: selectedJob.description || '',
        organisation: selectedJob.organisation || '',
        location: selectedJob.location || '',
        salary: selectedJob.salary || '',
        experience: selectedJob.experience || '',
        education: selectedJob.education || '',
        employmentType: selectedJob.employmentType || '',
        jobType: selectedJob.jobType || '',
      });
      setIsEditable(false); // Disable fields initially when loading a job
    } else {
      setIsEditable(true); // Enable fields for new job creation
    }
  }, [selectedJob]);

  // Handle input change dynamically
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear errors as user types
    if (fieldError[name]) {
      setFieldError((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  // Validation function
  const validateInputs = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${key} is required`;
      }
    });

    setFieldError(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const dispatch = useDispatch();

  // Handle form submit
  const handleSubmit = async (event) => {
    console.log("Inside handle Submit")
    // event.preventDefault();
    console.log("kuch hua kya?")
    if (!validateInputs()) {
      console.log("error h bkl")
      return;
    }
    console.log("kuch hua kya k bd")
    if (validateInputs()) {
      try {
        console.log("Validated Inputs")
        const result = await dispatch(createApplication(formData));

        if (createApplication.fulfilled.match(result)) {
          console.log('Application created successfully:', result.payload);
          // Redirect to applications page and fetch applications
          navigate('/org/applications');
        } else if (createApplication.rejected.match(result)) {
          setFieldError({ general: result.payload });
        }
      } catch (error) {
        setFieldError({ general: 'An error occurred while creating the job.' });
      }
    }
  };

  return (
    <Grid sx={{ backgroundColor: '#F9FAFB' }}>
      <CssBaseline enableColorScheme />
      <FormContainer>
        <Container sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              px: 3,
              pt: 3,
              border: '2px solid red',
            }}
          >
            <Button onClick={() => setIsEditable((prev) => !prev)}>
              {isEditable ? '' : 'Edit'}
            </Button>
          </Box>
          <Typography
            component="h1"
            variant="h3"
            sx={{
              width: '100%',
              fontSize: 'clamp(2rem, 10vw, 2.15rem)',
              my: 1,
              textDecoration: 'underline',
            }}
          >
            {selectedJob ? 'Edit Job' : 'Create Job'}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              minWidth: '100%',
              gap: 2,
              border: '2px solid black',
            }}
          >
            {/* Job title */}
            <FormControl sx={{ border: '2px solid blue' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                <FormLabel htmlFor="title"> Job Title : </FormLabel>
                <TextField
                  id="title"
                  name="title"
                  label="Job Title"
                  value={formData.title}
                  onChange={handleChange}
                  error={!!fieldError.title}
                  helperText={fieldError.title}
                  required
                  placeholder="job title"
                  autoFocus
                  disabled={!isEditable}
                  sx={{ ml: 1 }}
                />
              </Box>
            </FormControl>

            {/* Description */}
            <FormControl>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                <FormLabel htmlFor="description">Job Description :</FormLabel>
                <TextField
                  id="description"
                  name="description"
                  label="Job Description"
                  multiline
                  value={formData.description}
                  onChange={handleChange}
                  error={!!fieldError.description}
                  helperText={fieldError.description}
                  required
                  placeholder="description"
                  autoFocus
                  disabled={!isEditable}
                  sx={{ ml: 1 }}
                />
              </Box>
            </FormControl>

            {/* Company 

            <FormControl>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                <FormLabel htmlFor="organisation"> Organisation :</FormLabel>
                <TextField
                  name="organisation"
                  label="Organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  error={!!fieldError.organisation}
                  helperText={fieldError.organisation}
                  required
                  id="organisation"
                  type="text"
                  placeholder="job title"
                  autoFocus
                  disabled={!isEditable} 
                  
                  sx={{
                    ml: 1,
                    width: '100%', // Default for mobile
                    [theme.breakpoints.up('sm')]: { width: '80%' },
                    [theme.breakpoints.up('md')]: { width: '70%' },
                    [theme.breakpoints.up('lg')]: { width: '60%' },
                  }}
                />
              </Box>
            </FormControl>
            */}

            {/* location */}
            <FormControl>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                <FormLabel htmlFor="location"> Location :</FormLabel>
                <TextField
                  id="location"
                  name="location"
                  label="location"
                  value={formData.location}
                  onChange={handleChange}
                  error={!!fieldError.location}
                  helperText={fieldError.location}
                  required
                  type="text"
                  placeholder="location"
                  autoFocus
                  disabled={!isEditable}
                  variant="outlined"
                  sx={{ ml: 1 }}
                />
              </Box>
            </FormControl>

            {/**Salary */}
            <FormControl sx={{ m: 1 }} error={!!fieldError.experience}>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                <FormLabel htmlFor="salary"> Salary :</FormLabel>
                <OutlinedInput
                  id="salary"
                  name="salary"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  placeholder="salary"
                  autoFocus
                  disabled={!isEditable}
                  sx={{ ml: 1 }}
                />
              </Box>
              {fieldError.salary && <FormHelperText>{fieldError.salary}</FormHelperText>}
            </FormControl>

            {/**Skills */}

            {/*Experience */}
            <FormControl sx={{ m: 1 }} error={!!fieldError.experience}>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                <FormLabel id="experience" sx={{ mb: 1 }}>
                  Experience:
                </FormLabel>

                <Select
                  labelId="experience"
                  id="experience"
                  name="experience"
                  value={formData?.experience}
                  onChange={handleChange}
                  required
                  disabled={!isEditable}
                  sx={{ ml: 1 }}
                >
                  <MenuItem minWidth="100%" value="">
                    {' '}
                    <em> None </em>{' '}
                  </MenuItem>
                  <MenuItem value={'Fresher'}>Fresher</MenuItem>
                  <MenuItem value={'0-5'}>0 to 5 years</MenuItem>
                  <MenuItem value={'5+'}> 5+ years</MenuItem>
                </Select>
              </Box>
              <FormHelperText>{fieldError.experience}</FormHelperText>
            </FormControl>

            {/*Education */}
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" error={!!fieldError.experience}>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                <FormLabel id="education">Education:</FormLabel>

                <Select
                  labelId="education"
                  id="education"
                  name="education"
                  value={formData?.education}
                  onChange={handleChange}
                  required
                  disabled={!isEditable}
                  sx={{ ml: 1 }}
                >
                  <MenuItem minWidth="100%" value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'PhD'}>Doctarate/Phd</MenuItem>
                  <MenuItem value={'PostGraduation'}> Masters/PostGraduation</MenuItem>
                  <MenuItem value={'Diploma'}>Graduation/Diploma</MenuItem>
                </Select>
              </Box>
              <FormHelperText>{fieldError.education}</FormHelperText>
            </FormControl>

            {/*Employment type */}
            <FormControl error={!!fieldError.employmentType}>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                <FormLabel id="employmentType">Employment Type :</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="employmentType"
                  name="employmentType"
                  disabled={!isEditable}
                  onChange={handleChange}
                  sx={{ ml: 1 }}
                >
                  <FormControlLabel value="Full-Time" control={<Radio />} label="Full-Time" />
                  <FormControlLabel value="Part-Time" control={<Radio />} label="Part-time" />
                </RadioGroup>
              </Box>
              <FormHelperText>{fieldError.employmentType}</FormHelperText>
            </FormControl>

            {/*Job type */}
            <FormControl error={!!fieldError.jobType}>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                <FormLabel id="jobType">Job type :</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="jobType"
                  name="jobType"
                  disabled={!isEditable}
                  onChange={handleChange}
                  sx={{ ml: 1 }}
                >
                  <FormControlLabel value="On-site" control={<Radio />} label="On-site" />
                  <FormControlLabel value="Remote" control={<Radio />} label="Remote" />
                  <FormControlLabel value="Hybrid" control={<Radio />} label="Hybrid" />
                </RadioGroup>
              </Box>
              <FormHelperText>{fieldError.jobType}</FormHelperText>
            </FormControl>
          </Box>

          {/* Submit Button */}
          <Stack direction={'row'} spacing={3} justifyContent={'flex-end'} my={3} mx={2}>
            <Button variant="outlined" onClick={() => navigate('/org/applications')}>
              cancel
            </Button>
            <Button type="submit" variant="contained" onClick={() => {
                handleSubmit()
                navigate('/org/applications')
              }}>
              {selectedJob ? 'Update Job' : 'Create Job'}
            </Button>
          </Stack>
        </Card>
      </FormContainer>
    </Grid>
  );
}
