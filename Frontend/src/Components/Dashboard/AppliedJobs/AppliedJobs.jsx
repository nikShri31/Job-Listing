import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import PlaceIcon from '@mui/icons-material/Place';
import BusinessIcon from '@mui/icons-material/Business';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { applyJob, fetchAppliedJobs, setUserSelectedJobId } from '../../../store/appliedJobsSlice';

import JobDesc from './JobDesc';
import CustomLoading from '../../../utils/CustomLoading';
import customScrollbarStyles from '../../../utils/customScroll';

// -----------------------------------------------------------------------------------------------

export default function AppliedJobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, userAppliedJobs } = useSelector((state) => state.appliedJobs);
  const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { applications } = userAppliedJobs;

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [alignment, setAlignment] = useState('Today');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (isUserAuthenticated && !isLoading) {
      // Fetch applied jobs after page reload or login
      dispatch(fetchAppliedJobs());
    }
  }, [isUserAuthenticated, dispatch, userAppliedJobs.length, isLoading]);

  

  const handleJobClick = (jobId) => {
    setSelectedJobId(jobId);
    dispatch(setUserSelectedJobId(jobId));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setPage(0);
  };

  // Function to filter applications based on the selected time period
  const filterApplications = (applications, filter) => {
    const now = new Date();
    switch (filter) {
      case 'Today':
        return applications?.filter(
          (app) => new Date(app.applicationDate).toDateString() === now.toDateString()
        );
      case 'Week':
        const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
        return applications.filter((app) => new Date(app.applicationDate) >= oneWeekAgo);
      case 'Month':
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return applications.filter((app) => new Date(app.applicationDate) >= oneMonthAgo);
      case 'Year':
        const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
        return applications.filter((app) => new Date(app.applicationDate) >= oneYearAgo);
      default:
        return applications;
    }
  };

  // Filter and sort applications based on the selected time period and date
  const filteredApplications = filterApplications(applications, alignment);
  const sortedApplications = filteredApplications
    ?.slice()
    .sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate));

  // Slice the applications array to show only the current page's items
  const paginatedApplications = sortedApplications?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
 
  // default job desc
  // useEffect(() => {
  //   if (paginatedApplications && paginatedApplications.length > 0) {
  //     // Set the latest job's ID as selected by default
  //     setSelectedJobId(paginatedApplications[0]._id);
  //     dispatch(setUserSelectedJobId(paginatedApplications[0]._id));
  //   } else {
  //     // Clear the selection when no jobs are available
  //     setSelectedJobId(null);
  //   }
  // }, [paginatedApplications, dispatch]);


  return (
    <Grid
      container
      sx={{
        color: '#032340',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',

        textAlign: { sm: 'center', md: 'left' },
        bgcolor: '#E3F0FE',
        // backgroundImage: "linear-gradient(130deg,lightgrey,#CEE5FD)",
        // backgroundSize: "100% 100%",
        // backgroundRepeat: "no-repeat",
      }}
    >
      {/**My Jobs side navbar */}
      <Grid
        item
        md={3}
        sx={{
          pt: 2,

          backgroundColor: '#FFE7FF',
          height: 'calc(100vh - 80px)',
          position: 'sticky',
          top: 80,
          left: 0,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'flex-start',
          borderRight: (theme) => `solid 2px ${theme.palette.divider}`,
        }}
      >
        <Stack>
          <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            {' '}
            My Jobs
          </Typography>

          {/**Image */}
          <Box>
            <img
              src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20enable-background%3D%22new%200%200%20625%20625%22%20viewBox%3D%220%200%20625%20625%22%3E%3Cpath%20fill%3D%22%23ffe7ff%22%20d%3D%22M600.58%20476.247H38.378L24.42%2096.19l576.158-38.553z%22%2F%3E%3Cpath%20fill%3D%22%236a60a6%22%20d%3D%22m411.302%20339.009%2038.624-85.927%206.986%204.2-36.873%2081.727z%22%2F%3E%3Cpath%20fill%3D%22%236a60a6%22%20d%3D%22M277.283%20330.271h142.756v8.737H277.283z%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22m349.36%20330.271%2033.807-77.19h66.759l-34.902%2077.19z%22%2F%3E%3Cpath%20fill%3D%22%231c183e%22%20d%3D%22M349.36%20331.272a1%201%200%200%201-.915-1.402l33.806-77.19a1%201%200%200%201%20.916-.598h66.759a1%201%200%200%201%200%202h-66.105l-33.544%2076.59a1%201%200%200%201-.917.6z%22%2F%3E%3Cpath%20fill%3D%22%23010101%22%20d%3D%22M286.804%20339.009h128.867v3.808H286.804z%22%2F%3E%3Cpath%20fill%3D%22%23d3d3d3%22%20d%3D%22M315.307%20530.297c.285-.089.533-.293.67-.585.315-.674%203.024-6.685%201.064-10.013-.507-.862-1.558-1.92-3.683-2.066-1.896-.13-3.377.415-4.407%201.623-2.31%202.71-1.247%207.656-1.118%208.211a1.102%201.102%200%200%200%202.15-.497c-.279-1.211-.704-4.702.65-6.286.557-.653%201.399-.931%202.573-.85%201.265.087%201.71.603%201.934.983%201.163%201.97-.491%206.522-1.162%207.961a1.104%201.104%200%200%200%201.329%201.52z%22%2F%3E%3Cpath%20fill%3D%22%2348236a%22%20d%3D%22m351.993%20541.604-77.661%2024.297-.536-3.446-4.582-29.227%2029.78-9.317%2047.41%2015.828z%22%2F%3E%3Cpath%20fill%3D%22%23010101%22%20d%3D%22m351.993%20541.604-77.661%2024.297-.536-3.446%2072.609-22.716z%22%20opacity%3D%22.3%22%2F%3E%3Cpath%20fill%3D%22%23010101%22%20d%3D%22M271.022%20552.027h84.282v3.449h-84.282z%22%20transform%3D%22rotate(-17.373%20313.163%20553.752)%22%2F%3E%3Cpath%20fill%3D%22%23ffadbf%22%20d%3D%22m298.992%20523.907-6.048-23.685-24.72%2015.38%204.63%2016.483z%22%2F%3E%3Cpath%20fill%3D%22%23d3d3d3%22%20d%3D%22M316.494%20536.726c.26-.081.49-.257.633-.513%201.92-3.42%206.608-3.845%206.655-3.85a1.102%201.102%200%200%200-.174-2.199c-.24.02-5.903.51-8.405%204.97a1.103%201.103%200%200%200%201.291%201.592zM311.975%20534.713c.41-.129.724-.493.768-.947.035-.301.447-2.858%204.445-3.1a1.104%201.104%200%200%200-.134-2.2c-4.818.29-6.365%203.462-6.507%205.098a1.103%201.103%200%200%200%201.428%201.149z%22%2F%3E%3Cpath%20fill%3D%22%23d3d3d3%22%20d%3D%22M305.56%20545.612c.491-.153.823-.636.767-1.167-1.254-12.055%205.72-15.438%205.791-15.47a1.103%201.103%200%200%200-.928-2.002c-.347.161-8.472%204.096-7.057%2017.7a1.103%201.103%200%200%200%201.428.94z%22%2F%3E%3Cpath%20fill%3D%22%23010101%22%20d%3D%22M120.026%20569.248a1.5%201.5%200%200%201-1.5-1.5V401.125a1.5%201.5%200%201%201%203%200v166.623a1.5%201.5%200%200%201-1.5%201.5z%22%2F%3E%3Cpath%20fill%3D%22%23ffadbf%22%20d%3D%22m147.7%20173.44-4.61%2017.911-1.936%207.526-32.316-4.282%2015.304-35.287%2014.544%208.73z%22%2F%3E%3Cpath%20fill%3D%22%23ff89a6%22%20d%3D%22m147.7%20173.44-4.61%2017.911-16.73-20.789s6.331-1.293%2012.326-2.524l9.014%205.402z%22%2F%3E%3Cpath%20fill%3D%22%23ffadbf%22%20d%3D%22m173.35%20162.244-3.864-.48c-4.433%2012.43-13.862%2017.792-27.535%2016.206-15.913-1.845-27.316-16.24-25.47-32.154%201.845-15.914%2016.24-27.317%2032.153-25.471%2014.54%201.686%2021.628%2016.692%2021.962%2030.923%201.389%203.746%201.546%207.188%202.755%2010.976z%22%2F%3E%3Cpath%20fill%3D%22%2348236a%22%20d%3D%22M157.373%20342.817s18.189-97.258%202.934-133.397c-6.334-15.007-36.168-32.52-60.995-8.668-16.69%2016.034-29.176%20167.068-29.176%20167.068l87.237-25.003z%22%2F%3E%3Cpath%20fill%3D%22%23010101%22%20d%3D%22M134.7%20103.41c-4.846%201.43-9.839-5.383-17.336-1.025-10.792%206.275-6.785%2018.431-5.571%2020.869-21.538%2014.173%206.734%2049.002%206.734%2049.002%204.184-4.04%2012.705-9.826%2013.177-14.3%200%200-7.774-7.46-2.136-13.904%202.032-2.313%204.786-1.415%206.963.139%202.484%201.771%201.58%207.881%201.58%207.881s8.891-4.794%204.533-13.163c-4.359-8.368%2033.255%2012.117%2040.447-3.443%207.191-15.56-15.973-41.622-48.39-32.056z%22%2F%3E%3Cpath%20fill%3D%22%234d4c91%22%20d%3D%22m318.704%20508.224-91.123-120.73-122.696%205.304%2065.703%2027.227%2084.336%20103.656z%22%2F%3E%3Cpath%20fill%3D%22%23d3d3d3%22%20d%3D%22M152.623%20529.61c.242.174.555.25.87.184.729-.153%207.162-1.598%208.645-5.164.384-.923.598-2.399-.561-4.186-1.035-1.594-2.361-2.45-3.945-2.548-3.554-.219-6.87%203.602-7.236%204.039a1.103%201.103%200%200%200%201.688%201.419c.802-.95%203.337-3.387%205.416-3.256.857.054%201.586.56%202.226%201.546.69%201.064.545%201.73.376%202.138-.877%202.113-5.51%203.525-7.063%203.853a1.104%201.104%200%200%200-.416%201.975z%22%2F%3E%3Cpath%20fill%3D%22%2348236a%22%20d%3D%22m165.622%20565.731-66.078-47.49%202.433-2.5%2020.614-21.22%2025.337%2018.21%2015.828%2047.412z%22%2F%3E%3Cpath%20fill%3D%22%23010101%22%20d%3D%22m165.622%20565.731-66.078-47.49%202.433-2.5%2061.779%2044.402z%22%20opacity%3D%22.3%22%2F%3E%3Cpath%20fill%3D%22%23010101%22%20d%3D%22M130.86%20499.845h3.449v84.282h-3.449z%22%20transform%3D%22rotate(-54.295%20132.584%20541.986)%22%2F%3E%3Cpath%20fill%3D%22%23ffadbf%22%20d%3D%22m147.93%20512.728%2015.303-19.063-27.146-10.523-10.396%2013.602z%22%2F%3E%3Cpath%20fill%3D%22%23d3d3d3%22%20d%3D%22M148.197%20534.421c.22.159.5.237.79.197%203.888-.52%207.043%202.973%207.075%203.008.403.453%201.1.498%201.556.095s.5-1.098.098-1.554c-.16-.181-3.953-4.414-9.022-3.735a1.103%201.103%200%200%200-.497%201.989zM147.091%20529.598c.35.251.829.284%201.218.046.263-.153%202.554-1.36%205.148%201.691a1.104%201.104%200%200%200%201.68-1.43c-3.126-3.676-6.592-3.007-7.985-2.138a1.103%201.103%200%200%200-.06%201.831z%22%2F%3E%3Cpath%20fill%3D%22%23d3d3d3%22%20d%3D%22M134.524%20531.018c.418.3%201.003.275%201.394-.088%208.884-8.244%2015.778-4.7%2015.847-4.664a1.103%201.103%200%200%200%201.042-1.944c-.337-.18-8.363-4.313-18.39%204.991a1.103%201.103%200%200%200%20.107%201.705z%22%2F%3E%3Cpath%20fill%3D%22%236a60a6%22%20d%3D%22m264.749%20420.952-96.939%2091.776-50.327-31.94%2059.686-60.029-83.89-29.154c-10.958-3.273-18.748-13.223-23.146-23.785l87.24-25.003%2093.441%2031.65c19.395%206.571%2026.523%2030.327%2013.935%2046.485z%22%2F%3E%3Cpath%20fill%3D%22%23ffadbf%22%20d%3D%22m324.56%20340.51-9.563-4.754a7.375%207.375%200%200%200-7.076.28l-11.31%206.78-105.366%201.142a23.74%2023.74%200%200%201-19.964-10.5l-38.133-60.476%2038.864-17.8%2033.169%2056.442%2093.848%208.339%2011.057-2.57a12.187%2012.187%200%200%201%2011.439%203.298l4.694%204.757c2.332%202.362%204.236%206.954%204.51%2011.067.215%203.238-3.263%205.44-6.169%203.995z%22%2F%3E%3Cpath%20fill%3D%22%23010101%22%20d%3D%22M155.126%20415.118c-.167%200-.337-.028-.503-.087l-90.358-32.16c-11.937-4.249-19.598-16.04-18.631-28.672l8.945-116.81a1.5%201.5%200%200%201%202.991.23l-8.945%20116.809c-.864%2011.287%205.981%2021.82%2016.646%2025.617l90.358%2032.16a1.5%201.5%200%200%201-.503%202.913z%22%2F%3E%3Cpath%20fill%3D%22%2348236a%22%20d%3D%22m158.364%20205.38%2021.45%2049.172-49.001%2023.871-17.076-41.778c-5.92-14.483%203.939-30.705%2018.785-30.91l25.842-.355z%22%2F%3E%3Cpath%20fill%3D%22%23010101%22%20d%3D%22M516.044%20569.48a1.5%201.5%200%200%201-1.446-1.104l-58.813-215.12a1.5%201.5%200%201%201%202.894-.791l58.813%20215.12a1.5%201.5%200%200%201-1.448%201.896zM182.72%20569.48a1.5%201.5%200%200%201-1.448-1.896l58.813-215.12a1.5%201.5%200%200%201%202.893.792l-58.812%20215.12a1.5%201.5%200%200%201-1.446%201.105z%22%2F%3E%3Cpath%20fill%3D%22%23d4c6ff%22%20d%3D%22M195.977%20342.817h306.81v10.044h-306.81z%22%2F%3E%3Cpath%20fill%3D%22%23010101%22%20d%3D%22M164.185%20170.489c-1.774%200-4.774-.505-7.64-3.333l1.405-1.424c3.534%203.489%207.197%202.694%207.352%202.658l.467%201.945c-.068.017-.66.154-1.584.154z%22%2F%3E%3Cpath%20fill%3D%22%23d5d400%22%20d%3D%22M279.721%20186.457v31.94a3.094%203.094%200%200%201-3.095%203.096h-41.597a3.092%203.092%200%200%201-3.086-3.096v-31.94a3.092%203.092%200%200%201%203.086-3.095h41.597a3.094%203.094%200%200%201%203.095%203.095z%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M273.1%20211.836h-34.536l9.659-11.176%205.37%206.212%207.682-9.216z%22%2F%3E%3Ccircle%20cx%3D%22252.987%22%20cy%3D%22195.416%22%20r%3D%222.397%22%20fill%3D%22%23fff%22%2F%3E%3Cpath%20fill%3D%22%236a86ff%22%20d%3D%22M490.324%20226.32a28.98%2028.98%200%200%200%205.955-5.574l5.425.538%204.527-9.965-3.97-3.725c.471-2.667.578-5.417.28-8.175l4.197-3.42-3.852-10.267-5.41.186a28.956%2028.956%200%200%200-5.587-5.966l.546-5.405-9.966-4.527-3.727%203.964a28.8%2028.8%200%200%200-8.161-.286l-3.439-4.206-10.247%203.845.177%205.43a29.026%2029.026%200%200%200-5.961%205.577l-5.413-.528-4.528%209.966%203.962%203.72a29.07%2029.07%200%200%200-.281%208.153l-4.21%203.43%203.853%2010.268%205.427-.184a29.015%2029.015%200%200%200%205.577%205.962l-.531%205.422%209.965%204.528%203.723-3.978a28.8%2028.8%200%200%200%208.16.286l3.436%204.2%2010.248-3.846-.175-5.422zM458.62%20208.2c-3.124-8.325%201.095-17.612%209.42-20.736s17.608%201.098%2020.732%209.424c3.123%208.325-1.093%2017.605-9.418%2020.729-8.326%203.123-17.61-1.09-20.734-9.416z%22%2F%3E%3Cpath%20fill%3D%22%236a5aff%22%20d%3D%22M489.869%20196.476c-3.352-8.933-13.308-13.461-22.241-10.11s-13.459%2013.314-10.107%2022.247%2013.311%2013.453%2022.244%2010.101%2013.455-13.306%2010.104-22.238zm-31.25%2011.725c-3.124-8.326%201.095-17.613%209.42-20.737s17.608%201.098%2020.732%209.424c3.123%208.325-1.093%2017.605-9.418%2020.729-8.326%203.123-17.61-1.09-20.734-9.416z%22%2F%3E%3Cpath%20fill%3D%22%236a86ff%22%20d%3D%22M528.7%20270.522a24.133%2024.133%200%200%200%205.017-4.58l4.511.506%203.875-8.25-3.267-3.144a24.15%2024.15%200%200%200%20.319-6.804l3.531-2.803-3.1-8.59-4.507.098c-1.3-1.91-2.85-3.59-4.59-5.027l.512-4.494-8.25-3.875-3.146%203.262a23.983%2023.983%200%200%200-6.793-.323l-2.818-3.539-8.574%203.094.091%204.523a24.17%2024.17%200%200%200-5.023%204.581l-4.501-.496-3.875%208.25%203.26%203.14a24.207%2024.207%200%200%200-.32%206.786l-3.54%202.813%203.1%208.59%204.52-.096c1.3%201.909%202.85%203.59%204.582%205.022l-.5%204.51%208.251%203.874%203.141-3.273c2.21.423%204.494.543%206.793.324l2.816%203.532%208.574-3.094-.089-4.517zm-26.21-15.42c-2.514-6.966%201.097-14.655%208.062-17.168s14.65%201.099%2017.163%208.064c2.514%206.965-1.094%2014.648-8.059%2017.161-6.965%202.514-14.652-1.092-17.166-8.058z%22%2F%3E%3Cpath%20fill%3D%22%236a5aff%22%20d%3D%22M528.634%20245.666c-2.697-7.473-10.94-11.348-18.413-8.65-7.473%202.696-11.347%2010.944-8.65%2018.417%202.697%207.473%2010.944%2011.342%2018.416%208.645%207.474-2.697%2011.344-10.939%208.647-18.412zm-26.144%209.435c-2.514-6.965%201.097-14.654%208.062-17.167s14.65%201.099%2017.163%208.064c2.514%206.965-1.094%2014.648-8.059%2017.161-6.965%202.514-14.652-1.092-17.166-8.058z%22%2F%3E%3Cpath%20fill%3D%22%23ff449c%22%20d%3D%22M334.635%20244.997v31.94a3.094%203.094%200%200%201-3.095%203.095h-41.597a3.092%203.092%200%200%201-3.086-3.095v-31.94a3.092%203.092%200%200%201%203.086-3.095h41.597a3.094%203.094%200%200%201%203.095%203.095z%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22m316.406%20262.881-9.083%205.299c-1.48.86-3.337-.195-3.337-1.916v-10.596c0-1.71%201.858-2.776%203.337-1.915l9.083%205.31c1.468.848%201.468%202.97%200%203.818z%22%2F%3E%3Cpath%20fill%3D%22%237e5086%22%20d%3D%22M334.861%20224.813a.998.998%200%200%201-.53-.153c-8.102-5.072-17.286-10.82-22.798-19.643-5.2-8.322-6.495-21.27%201.345-28.874%205.063-4.91%2012.908-6.8%2023.331-5.613a76.873%2076.873%200%200%201%2024.116%206.89c2.744-8.281%208.611-16.167%2016.82-22.058%2011.8-8.468%2026.556-12.287%2039.575-15.658a1%201%200%200%201%20.501%201.937c-12.85%203.326-27.414%207.096-38.91%2015.346-7.953%205.707-13.607%2013.342-16.178%2021.317a75.864%2075.864%200%200%201%207.289%204.205c3.179%202.078%207.067%205.004%208.934%209.207%201.778%204.004%201.247%209.752-2.716%2012.442-3.729%202.53-8.63%201.294-11.545-1.237-2.643-2.296-4.424-5.903-5.151-10.43-.69-4.3-.387-8.754.798-13.135a74.87%2074.87%200%200%200-23.76-6.84c-9.797-1.114-17.099.59-21.711%205.063-7.087%206.873-5.826%2018.721-1.042%2026.379%205.268%208.43%2014.244%2014.05%2022.164%2019.007a1%201%200%200%201-.532%201.848zm26.706-44.554c-1.026%203.985-1.274%208.02-.649%2011.914.455%202.83%201.602%206.73%204.489%209.238%202.68%202.328%206.595%202.798%209.11%201.091%203.098-2.102%203.455-6.722%202.011-9.974-1.645-3.704-5.069-6.297-8.201-8.345a74.017%2074.017%200%200%200-6.76-3.924zM440.154%2055.519h74.664v87.26h-74.664z%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M455.75%20103.054h45.374V108H455.75zM449.38%20114.86h56.211v1.631H449.38zM449.38%20119.872h56.211v1.631H449.38zM449.38%20124.885h56.211v1.631H449.38zM449.38%20129.897h56.211v1.631H449.38z%22%2F%3E%3Ccircle%20cx%3D%22477.486%22%20cy%3D%2280.08%22%20r%3D%2216.316%22%20fill%3D%22%23fff%22%2F%3E%3Ccircle%20cx%3D%22477.485%22%20cy%3D%2274.806%22%20r%3D%223.641%22%20fill%3D%22%23ff449c%22%2F%3E%3Cpath%20fill%3D%22%23ff449c%22%20d%3D%22M486.142%2088.994c-.068-4.726-3.914-8.538-8.656-8.538-4.743%200-8.59%203.812-8.657%208.538h17.313z%22%2F%3E%3Cpath%20fill%3D%22%237e5086%22%20d%3D%22M521.7%20347.571a1%201%200%200%201-.105-1.994c16.601-1.767%2031.112-15.241%2034.946-31.372a21.06%2021.06%200%200%201-5.709-.176c-6.338-1.067-11.461-5.178-13.051-10.472-.922-3.067-.405-6.612%201.383-9.482%201.564-2.51%203.867-4.13%206.487-4.565%202.893-.482%205.66.37%207.992%202.458%203.758%203.364%206.156%209.91%205.83%2015.917a37.577%2037.577%200%200%201-.408%203.853c8.313-2.06%2015.173-9.265%2018.175-16.736%204.653-11.574%202.638-24.907.718-33.93-5.253-24.679-16.28-48.202-31.887-68.026a1%201%200%201%201%201.57-1.237c15.797%2020.063%2026.957%2043.87%2032.273%2068.847%201.975%209.278%204.038%2023.01-.818%2035.092-3.315%208.249-11.065%2016.187-20.432%2018.126-3.743%2017.268-19.17%2031.809-36.857%2033.691a.997.997%200%200%201-.107.006zm25.528-56.193c-.41%200-.827.035-1.25.105-2.044.339-3.86%201.635-5.116%203.65-1.467%202.354-1.914%205.361-1.166%207.85%201.352%204.5%205.96%208.146%2011.468%209.073%201.978.334%203.924.345%205.806.085.257-1.439.427-2.895.507-4.364.294-5.443-1.831-11.331-5.168-14.32-1.545-1.382-3.25-2.08-5.08-2.08z%22%2F%3E%3C%2Fsvg%3E"
              alt="my jobs"
              height={200}
              width={400}
            />
          </Box>
        </Stack>

        <Box ml={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Card
            sx={{
              p: 4,
              m: 2,
              maxHeight: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" textAlign={'center'} p={1}>
              7
            </Typography>
            <Typography variant="body1"> Recruiter's Action</Typography>
          </Card>
          <Card
            sx={{
              p: 4,
              m: 2,
              maxHeight: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" textAlign={'center'} p={1}>
              {applications?.length || 0}
            </Typography>
            <Typography> Jobs Applied</Typography>
          </Card>
        </Box>
      </Grid>

    
      {/* Applied job lists */}
<Grid item xs={12} md={9}>
  <Container sx={{ p: 2, backgroundColor: '#F9FAFB', position: 'relative' }}>
    {/* Loading and Error Handling */}
    {(isLoading || error) && (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#E3F0FE',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isLoading ? (
          <CustomLoading />
        ) : (
          <Card sx={{ p: 2, backgroundColor: '#fff5f5', borderRadius: 2, boxShadow: 3 }}>
            <Alert
              severity="error"
              variant="filled"
              sx={{ mb: 2, alignItems: 'center', justifyContent: 'center' }}
              icon={<ErrorOutlinedIcon fontSize="large" />}
            >
              <Typography variant="h6">
                {typeof error === "object" && error.error && error.error.message
                  ? error.error.message
                  : JSON.stringify(error)}
              </Typography>
            </Alert>
          </Card>
        )}
      </Box>
    )}

    {/* Filter Toggle Buttons */}
    <ToggleButtonGroup
      color="info"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Filter by time"
      sx={{ mb: 3 }}
    >
      <ToggleButton value="Today">Today</ToggleButton>
      <ToggleButton value="Week">This Week</ToggleButton>
      <ToggleButton value="Month">This Month</ToggleButton>
      <ToggleButton value="Year">This Year</ToggleButton>
    </ToggleButtonGroup>

    {/* Main Grid Layout for Job List and Job Description */}
    <Grid container spacing={3}>
      {/* Job Cards List */}
      <Grid item xs={12} md={6} sx={{ overflowY: 'auto', my:2, height: '80vh', ...customScrollbarStyles(), }}>
        {!isLoading && !error && paginatedApplications?.length > 0 ? (
          paginatedApplications.map((application) => (
            <Card
              key={application._id}
              onClick={() => handleJobClick(application._id)}
              sx={{
                boxShadow: `2px 2px 2px #00000041`,
                color: '#032340',
                mt: 1,
                backgroundColor: application._id === selectedJobId ? '#d3e0f7' : 'white',
                '&:hover': {
                  boxShadow: `5px 5px 5px #00000041, inset 5px 5px 6px rgba(0, 0, 0, 0.2)`,
                },
              }}
            >
              <CardActionArea sx={{ py: 1 }}>
                <Stack direction={'row'} justifyContent="space-between" sx={{ width: '95%' }}>
                  <Box sx={{ p: 2 }}>
                    <Link
                      variant="h5"
                      sx={{
                        fontWeight: 'bold',
                        color: 'grey',
                        textDecoration: 'none',
                        '&:hover': {
                          color: '#032340',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {application?.job?.title || 'No Job title'}
                    </Link>
                    <Stack direction={'row'} spacing={1} py={1}>
                      <BusinessIcon />
                      <Typography variant="h6">
                        {application?.organisation?.name || 'No Org'}
                      </Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                      <PlaceIcon />
                      <Typography>{application.job?.location}</Typography>
                      <Typography color={'text.secondary'} sx={{ px: 3 }}>
                        Applied on: {new Date(application.applicationDate).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <Typography variant="h3">No Jobs Applied</Typography>
        )}
      </Grid>

      {/* Job Description */}
      <Grid item xs={12} md={6} sx={{ overflowY: 'auto', height: '80vh', ...customScrollbarStyles(), }}>
      {paginatedApplications?.length > 0 ? (
        <JobDesc applications={applications} />
      ) : null}
      </Grid>
    </Grid>

    {/* Pagination */}
    <TablePagination
      page={page}
      component="div"
      count={filteredApplications?.length || 0}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[5, 10]}
    />
  </Container>
</Grid>

    </Grid>
  );
}
