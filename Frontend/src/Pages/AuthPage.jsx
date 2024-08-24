// import Header from "../Header/Header";
// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardMedia,
//   Container,
//   CssBaseline,
//   Grid,
//   Paper,
//   Typography,
// } from "@mui/material";
// import Footer from "../Footer/Footer";

// const AuthPage = () => {
//   return (
//     <>
//       <CssBaseline />
//       <Header />

//       <Grid
//         container
      
//         flexDirection="column"
//         alignItems="flex-start"
//         sx={{ backgroundColor: "rgba(192, 192, 220, 1)" }}
//         xs={12} sm={6} md={4} lg={3}
//       >
//         {/* Headlines */}
//         <Grid
//           container
//           sx={{
//             maxWidth:"xl",
//             minHeight: "50vh",
//             display: "flex",
//             flexGrow: 1,
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "flex-start",
//             py: 4,
//             px: 2,
//           }}
//         >
//           <Typography component="div" variant="h5" sx={{ m: 6 }}>
//             ` We have 100000+ great Job Offers For your domain....`
//           </Typography>
//           <Typography component="div" variant="h2" sx={{ m: 6 }}>
//             YOUR DREAM JOB
//           </Typography>
//           <Typography component="div" variant="h4" sx={{ mx: 10 }}>
//             Is Waiting For YOU ....
//           </Typography>
//         </Grid>

//         {/* Cards */}
//         <Grid container spacing={2} sx={{ py: 4 }}>
//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card sx={{ boxShadow: 25, borderRadius: 5 }}>
//               <CardMedia
//                 component="img"
//                 sx={{ height: 140 }}
//                 image="https://img.freepik.com/free-photo/3d-cartoon-doctor-character_1048-12971.jpg?t=st=1722838895~exp=1722842495~hmac=ea770f831070f808a4bd55d3cff9368a5f38cdb5f6449960f4f27cee89c1b952&w=360"
//                 title="green iguana"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Find the Best Matches here!!!
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Lizards are a widespread group of squamate reptiles, with over
//                   6,000 species, ranging across all continents except Antarctica
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small">Login now</Button>
//               </CardActions>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card sx={{ boxShadow: 25, borderRadius: 5 }}>
//               <CardMedia
//                 component="img"
//                 sx={{ height: 140 }}
//                 image="https://img.freepik.com/free-photo/3d-cartoon-doctor-character_1048-12971.jpg?t=st=1722838895~exp=1722842495~hmac=ea770f831070f808a4bd55d3cff9368a5f38cdb5f6449960f4f27cee89c1b952&w=360"
//                 title="green iguana"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Looking For a Job ?...
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Lizards are a widespread group of squamate reptiles, with over
//                   6,000 species, ranging across all continents except Antarctica
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Typography variant="body2">Join Us</Typography>
//                 <Button size="small">Login now</Button>
//               </CardActions>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={4} lg={3}>
//             <Card sx={{ boxShadow: 25, borderRadius: 5 }}>
//               <CardMedia
//                 component="img"
//                 sx={{ height: 140 }}
//                 image="https://img.freepik.com/free-photo/3d-cartoon-doctor-character_1048-12971.jpg?t=st=1722838895~exp=1722842495~hmac=ea770f831070f808a4bd55d3cff9368a5f38cdb5f6449960f4f27cee89c1b952&w=360"
//                 title="green iguana"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Wanna POST a New Job ...
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Lizards are a widespread group of squamate reptiles, with over
//                   6,000 species, ranging across all continents except Antarctica
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small">Login now</Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Apply Process */}
//         <Container
//           component="div"
//           sx={{
//             minHeight: "50vh",
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "center",
//             alignItems: "center",
//             py: 4,
//           }}
//         >
//           <Grid container spacing={2} justifyContent="center">
//             <Grid item xs={12} sm={6} md={4}>
//               <Paper elevation={10} sx={{ borderRadius: 5, p: 4 }}>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Search a Job
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Heaven frucvitful doesn't cover lesser dvsays appear creeping
//                   seasons so behold.
//                 </Typography>
//               </Paper>
//             </Grid>

//             <Grid item xs={12} sm={6} md={4}>
//               <Paper elevation={10} sx={{ borderRadius: 5, p: 4 }}>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Apply for the Job
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Lizards are a widespread group of squamate reptiles, with over
//                   6,000 species, ranging across all continents except Antarctica
//                 </Typography>
//               </Paper>
//             </Grid>

//             <Grid item xs={12} sm={6} md={4}>
//               <Paper elevation={10} sx={{ borderRadius: 5, p: 4 }}>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Get your Job
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Lizards are a widespread group of squamate reptiles, with over
//                   6,000 species, ranging across all continents except Antarctica
//                 </Typography>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Container>
//       </Grid>

//       <Footer />
//     </>
//   );
// };

// export default AuthPage;
