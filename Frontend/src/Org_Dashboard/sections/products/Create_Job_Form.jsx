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
  Autocomplete,
  Card,
  Chip,
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
  position: 'relative',
  minHeight: '100%',
  overflow: 'hidden',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  borderRadius: '40px',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    backgroundImage: 'url(/assets/background/overlay_4.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.3, // Set your desired opacity here
    zIndex: 0, // Set to 0 to place it behind other elements
    inset: 0,
    //backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  },
}));

export default function CreateNewJob() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedJob = useSelector((state) => state.applications.selectedJob); 
  console.log(selectedJob);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    skills: [],
    experience: '',
    education: '',
    employmentType: '',
    jobType: '',
  });
  const [inputSkillValue, setInputSkillValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [fieldError, setFieldError] = useState({});

  //organisation :not from selectedJob but from userData - id
  useEffect(() => {
    if (selectedJob && isEditing) {
      setFormData({
        title: selectedJob?.job?.title || '',
        description: selectedJob?.job?.description || '',
        location: selectedJob?.job?.location || '',
        salary: selectedJob?.job?.salary || '',
        skills: selectedJob?.job?.requirements?.skills || [],
        experience: selectedJob?.job?.requirements?.experience || '',
        education: selectedJob?.job?.requirements?.education || '',
        employmentType: selectedJob?.job?.employmentType || '',
        jobType: selectedJob?.job?.jobType || '',
      })}
   
     
    
  }, [selectedJob, isEditing]);



  // Handle input change dynamically
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear errors as user types
    if (fieldError[name]) {
      setFieldError((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  // Handle skills input (chips)
  const handleSkillKeyDown = (event) => {
    if (event.key === 'Enter' && inputSkillValue.trim() !== '') {
      event.preventDefault();
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, inputSkillValue.trim()], // Add new skill
      }));
      setInputSkillValue(''); // Clear input field after adding a skill
    }
  };

  // Remove skill chip
  const handleDeleteSkill = (skillToDelete) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((skill) => skill !== skillToDelete), // Remove the skill
    }));
  };

  // Validation function
  const validateInputs = () => {
    const newErrors = {};
    // Add custom validations
    if (formData.salary && isNaN(formData.salary)) {
      newErrors.salary = 'Salary must be a number';
    } else if (formData.experience && isNaN(formData.experience)) {
      newErrors.salary = 'Salary must be a number';
    } else {
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'skills' && !value.toString().trim().length) {
          newErrors[key] = `${key} is required`;
        }
      });
    }

    setFieldError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    // event.preventDefault();
    const isValid = validateInputs();
    if (!isValid) {
      return;
    }

    try {
      const result = dispatch(createApplication(formData));

      if (createApplication.fulfilled) {
        console.log('Application created successfully:', result.payload);
        navigate('/org/applications')
      } else if (createApplication.rejected.match(result)) {
        setFieldError({ general: result.payload });
      }
    } catch (error) {
      setFieldError({ general: 'An error occurred while creating the job.' });
    }
  };



  return (
    <Grid sx={{ backgroundColor: '#F9FAFB' }}>
      <CssBaseline enableColorScheme />
      <FormContainer>
        <Container
          sx={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
          }}
        />
        <Box
          variant="outlined"
          sx={{
            zIndex: 1, // Set to 0 to place it behind other elements
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            sx={{
              fontSize: 'clamp(2rem, 10vw, 2.15rem)',

              textDecoration: 'underline',
              opacity: 1,
              zIndex: 'auto',
            }}
          >
        Create Job
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              py: 3,
              alignItems: 'center',
              flexDirection: 'column',
              opacity: 1,
              zIndex: 'auto',
            }}
          >
            {/* Job title */}
            <FormControl>
              <Grid container alignItems="center" spacing={2}>
                <Grid item sx={{ minWidth: '150px', textAlign: 'right' }}>
                  <FormLabel htmlFor="title" sx={{ minWidth: '150px' }}>
                    Job Title :
                  </FormLabel>
                </Grid>
                <Grid item sx={{ flexGrow: 1 }}>
                  <TextField
                    fullWidth
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
            
                    sx={{ width: { xs: '100%', sm: '100%', md: '500px' }, ml: 1 }}
                  />
                </Grid>
              </Grid>
            </FormControl>

            {/* Description */}
            <FormControl sx={{ mt: 2 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item sx={{ minWidth: '150px', textAlign: 'right' }}>
                  <FormLabel htmlFor="description" sx={{ minWidth: '150px' }}>
                    Job Description :
                  </FormLabel>
                </Grid>
                <Grid item sx={{ flexGrow: 1 }}>
                  <TextField
                    fullWidth
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
                 
                    sx={{ width: { xs: '100%', sm: '100%', md: '500px' }, ml: 1 }}
                  />
                </Grid>
              </Grid>
            </FormControl>

            {/* location */}
            <FormControl sx={{ mt: 2 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item sx={{ minWidth: '150px', textAlign: 'right' }}>
                  <FormLabel htmlFor="location" sx={{ minWidth: '150px' }}>
                    Location :
                  </FormLabel>
                </Grid>
                <Grid item sx={{ flexGrow: 1 }}>
                  <TextField
                    id="location"
                    name="location"
                    label="Location"
                    value={formData.location}
                    onChange={handleChange}
                    error={!!fieldError.location}
                    helperText={fieldError.location}
                    required
                    type="text"
                    placeholder="Location"
                   
                    variant="outlined"
                    sx={{ width: { xs: '100%', sm: '100%', md: '500px' }, ml: 1 }}
                    s
                  />
                </Grid>
              </Grid>
            </FormControl>

            {/**Salary */}
            <FormControl sx={{ mt: 2 }} error={!!fieldError.salary}>
              <Grid container alignItems="center" spacing={2}>
                {/* Label */}
                <Grid item sx={{ minWidth: '150px', textAlign: 'right' }}>
                  <FormLabel htmlFor="salary" sx={{ minWidth: '150px' }}>
                    Salary :
                  </FormLabel>
                </Grid>

                <Grid item sx={{ flexGrow: 1 }}>
                  <OutlinedInput
                    id="salary"
                    name="salary"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    placeholder="Salary"
                  
                    sx={{ width: { xs: '100%', sm: '100%', md: '500px' }, ml: 1 }}
                  />
                  {fieldError.salary && <FormHelperText>{fieldError.salary}</FormHelperText>}
                </Grid>
              </Grid>
            </FormControl>

            {/**Skills */}
            <FormControl sx={{ mt: 2 }} error={!!fieldError.skills}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item sx={{ minWidth: '150px', textAlign: 'right' }}>
                  <FormLabel htmlFor="skills" sx={{ minWidth: '150px' }}>
                    Skills :
                  </FormLabel>
                </Grid>

                {/* Input Field and Chips */}
                <Grid item sx={{ flexGrow: 1 , display:'flex', flexDirection:'column'}}>
                  <TextField
                    id="skills"
                    name="skills"
                    label="Enter skills"
                    value={inputSkillValue}
                    onChange={(e) => setInputSkillValue(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                
                    placeholder="Type skills and press Enter"
               
                    variant="outlined"
                    sx={{ width: { xs: '100%', sm: '100%', md: '500px' }, ml: 1 }}
                  />

                  
                 { !formData.skills && <FormHelperText>Skills are required</FormHelperText>}
                </Grid>
              </Grid>
              {/* Chips Container */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {formData.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleDeleteSkill(skill)}
                  sx={{ margin: '5px' }}
                />
              ))}
            </Box>
            </FormControl>

            {/*Experience */}
            <FormControl sx={{ mt: 2 }} error={!!fieldError.experience}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item sx={{ minWidth: '150px', textAlign: 'right' }}>
                  <FormLabel htmlFor="experience" sx={{ minWidth: '150px' }}>
                    Experience :
                  </FormLabel>
                </Grid>

                {/* Select Input */}
                <Grid item sx={{ flexGrow: 1 }}>
                  <FormControl sx={{ width: { xs: '100%', sm: '100%', md: '500px' }, ml: 1 }}>
                    <TextField
                      id="experience"
                      placeholder="Experience in Years"
                      // label="Experience in Years"
                      type="number"
                      value={formData?.experience}
                      name="experience"
                      onChange={handleChange}
                   
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                  {/* <Select
                    labelId="experience"
                    id="experience"
                    name="experience"
                    value={formData?.experience}
                    onChange={handleChange}
                    required
               
                    sx={{ width: { xs: '100%', sm: '100%', md: '500px' }, ml: 1 }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Fresher'}>Fresher</MenuItem>
                    <MenuItem value={'1'}>0 to 5 years</MenuItem>
                    <MenuItem value={'10'}>5+ years</MenuItem>
                  </Select> */}

                  {/* Error Message */}
                  {fieldError.experience && (
                    <FormHelperText>{fieldError.experience}</FormHelperText>
                  )}
                </Grid>
              </Grid>
            </FormControl>

            {/*Education */}
            <FormControl sx={{ mt: 2 }} error={!!fieldError.education}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item sx={{ minWidth: '150px', textAlign: 'right' }}>
                  <FormLabel htmlFor="education" sx={{ minWidth: '150px' }}>
                    Education :
                  </FormLabel>
                </Grid>

                {/* Select Input */}
                <Grid item sx={{ flexGrow: 1 }}>
                  <Select
                    labelId="education"
                    id="education"
                    name="education"
                    value={formData?.education}
                    onChange={handleChange}
                    required
                
                    sx={{ width: { xs: '100%', sm: '100%', md: '500px' }, ml: 1,  textAlign: 'left'  }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'PhD'}>Doctorate/PhD</MenuItem>
                    <MenuItem value={'PostGraduation'}>Masters/PostGraduation</MenuItem>
                    <MenuItem value={'Diploma'}>Graduation/Diploma</MenuItem>
                  </Select>

                  {/* Error Message */}
                  {fieldError.education && <FormHelperText>{fieldError.education}</FormHelperText>}
                </Grid>
              </Grid>
            </FormControl>

            {/*Employment type */}
            <FormControl sx={{ mt: 2 }} error={!!fieldError.employmentType}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item sx={{ minWidth: '150px', textAlign: 'right' }}>
                  <FormLabel htmlFor="employmentType" sx={{ minWidth: '150px' }}>
                    Employment Type :
                  </FormLabel>
                </Grid>

                {/* Radio Group */}
                <Grid item sx={{ flexGrow: 1 }}>
                  <RadioGroup
                    row
                    aria-labelledby="employmentType"
                    name="employmentType"
                    value={formData?.employmentType}
                    onChange={handleChange}
                
                    sx={{ width: { xs: '100%', sm: '100%', md: '500px' }, ml: 1 }}
                  >
                    <FormControlLabel value="Full-Time" control={<Radio />} label="Full-Time" />
                    <FormControlLabel value="Part-Time" control={<Radio />} label="Part-Time" />
                  </RadioGroup>

                  {/* Error Message */}
                  {fieldError.employmentType && (
                    <FormHelperText>{fieldError.employmentType}</FormHelperText>
                  )}
                </Grid>
              </Grid>
            </FormControl>

            {/*Job type */}
            <FormControl sx={{ mt: 2 }} error={!!fieldError.jobType}>
              <Grid container alignItems="center" spacing={2}>
                {/* Label */}
                <Grid item sx={{ minWidth: '150px', textAlign: 'right' }}>
                  <FormLabel htmlFor="jobType" sx={{ minWidth: '150px' }}>
                    Job Type :
                  </FormLabel>
                </Grid>

                {/* Radio Group */}
                <Grid item sx={{ flexGrow: 1 }}>
                  <RadioGroup
                    row
                    aria-labelledby="jobType"
                    name="jobType"
                    value={formData?.jobType}
                    onChange={handleChange}
             
                    sx={{ width: { xs: '100%', sm: '100%', md: '500px' }, ml: 1 }}
                  >
                    <FormControlLabel value="On-site" control={<Radio />} label="On-site" />
                    <FormControlLabel value="Remote" control={<Radio />} label="Remote" />
                    <FormControlLabel value="Hybrid" control={<Radio />} label="Hybrid" />
                  </RadioGroup>

                  {/* Error Message */}
                  {fieldError.jobType && <FormHelperText>{fieldError.jobType}</FormHelperText>}
                </Grid>
              </Grid>
            </FormControl>
          </Box>

          {/* Submit Button */}
          <Stack direction={'row'} spacing={3} justifyContent={'space-between'} my={3} mx={2}>
            <Button variant="outlined" onClick={() => navigate('/org/applications')}>
              cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={() => {
                handleSubmit();
              }}
             
            >
        Create Job
            </Button>
          </Stack>
        </Box>
      </FormContainer>
    </Grid>
  );
}
