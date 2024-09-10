import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';


export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        {/* Widget Summaries */}
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Job Listed"
            total={100}
            color="success"
            
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Applications Pending"
            total={15}
            color="info"
            
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Accept Offer"
            total={17}
            color="warning"
            
          />
        </Grid>

        {/* Main Charts and Data */}
        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Last Month's Hires"
            subheader="(+25%) compared to previous month"
            chart={{
              labels: [
                '01/08/2024', '02/08/2024', '03/08/2024', '04/08/2024',
                '05/08/2024', '06/08/2024', '07/08/2024', '08/08/2024',
                '09/08/2024', '10/08/2024', '11/08/2024',
              ],
              series: [
                { name: 'UI/UX Designers', type: 'column', fill: 'solid', data: [5, 7, 8, 6, 9, 5, 10, 7, 8, 6, 9] },
                { name: 'Python Developers', type: 'area', fill: 'gradient', data: [4, 6, 5, 7, 8, 6, 9, 8, 7, 5, 6] },
                { name: 'Java Developers', type: 'line', fill: 'solid', data: [3, 5, 4, 6, 7, 4, 8, 7, 6, 5, 7] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Most Applied Jobs"
            chart={{
              series: [
                { label: 'Software Engineer', value: 1200 },
                { label: 'Data Analyst', value: 950 },
                { label: 'Product Manager', value: 720 },
                { label: 'UI/UX Designer', value: 680 },
                { label: 'DevOps Engineer', value: 550 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Fresher Job Applications and Expired Applications"
            subheader="Comparison of Freshers' Applications vs Expired Applications"
            chart={{
              series: [
                { label: 'Freshers Applied', value: 1200 },
                { label: 'Applications Expired', value: 300 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Job Application Timing"
            chart={{
              categories: ['Morning', 'Afternoon', 'Evening', 'Night'],
              series: [
                { name: 'Job Applications', data: [30, 50, 70, 40] },
                { name: 'Interviews Scheduled', data: [20, 40, 60, 30] },
                { name: 'Follow-ups', data: [10, 30, 20, 15] },
              ],
            }}
          />
        </Grid>

        {/* Hidden Components */}
        <Grid xs={12} md={6} lg={4} sx={{ display: 'none' }}>
          <AppNewsUpdate
            title="Tech HR Updates"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: `Tech Industry Update ${index + 1}`,
              description: `Recent developments in the tech industry affecting HR practices. For more details, read about the latest trends in recruitment, employee retention, and tech advancements.`,
              image: `/assets/images/news/news_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="How many applications for the jobs"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '10 Applications for Software Engineer',
                '5 Applications for Data Scientist',
                '8 Applications for Frontend Developer',
                '12 Applications for Backend Developer',
                '7 Applications for UX Designer',
              ][index],
              type: `application${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              { name: 'FaceBook', value: 323234, icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} /> },
              { name: 'Google', value: 341212, icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} /> },
              { name: 'Linkedin', value: 411213, icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} /> },
              { name: 'Twitter', value: 443232, icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} /> },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4} sx={{ display: 'none' }}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
