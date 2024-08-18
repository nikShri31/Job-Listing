
// import { Box, Container, createTheme, Divider, Grid, Link, ThemeProvider, Typography } from "@mui/material";
// import React from "react";

// const boxStyle ={
// my: 5,
// mx:8,
// };

// const defaultTheme = createTheme({
//   palette: {
//     primary: {
//       main: "rgba(248, 248, 248, 1)",
//     },
//     secondary: {
//       main: "rgba(192, 192, 192, 1)",
//     },
//   },
// });

// const Footer = () => {
 
//   const links = [
//     {
//       name: "View Project",
//       href: "#",
//     },
//     {
//       name: "Contact Us",
//       href: "#",
//     },
//     {
//       name: "Testimonial",
//       href: "#",
//     },
//     {
//       name: "Properties",
//       href: "#",
//     },
//     {
//       name: "Support",
//       href: "#",
//     },
//   ];
 
//   return (
//     <ThemeProvider theme={defaultTheme}>
//     <Grid container>
//     <Container
//       align="left"
//       sx={{
//         backgroundColor: "rgba(25, 25, 112, 1)",
//         minHeight: "100vh",
//         minWidth:'100vh',
//         display: "flex",
//         justifyContent: "space-between",
//         py:15,
       
//         m:0,
//       }}
//     >
//       <Box sx={boxStyle}>
//         <Typography gutterBottom variant="h4" color="primary.main" component="div" sx={{ mb: 2 }}>
//           About Us
//         </Typography>
//         <Typography variant="body2" color="secondary.main" sx={{ mb: 5 }}>
//           Heaven fruitful doesn't cover lesser days appear creeping seasons so
//           behold.
//         </Typography>
//       </Box>

//       <Box sx={boxStyle}>
//       <Typography gutterBottom variant="h4" color="primary.main" component="div" sx={{ mb: 2 }}>
//         Contact Info
//       </Typography>
//       <Typography variant="body2" color="secondary.main" sx={{ mb: 5,}}>
//         Address: Your address goes here, your demo address.
//         Phone: +8880 44338899
//         Email: info@colorlib.com
//       </Typography>
//     </Box>

//       <Box sx={boxStyle}>
//         <Typography gutterBottom variant="h4" color="primary.main" component="div" >
//           Links
//         </Typography>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-start",
//           }}
//         >
          
//           { 
//             links.map((link, index) => (
//             <Box
//               key={index}
//               sx={{
//                 mb: 1,
//                 transition: 'transform 0.2s, box-shadow 0.2s',
//                 '&:hover': {
//                   fontWeight:'bold',
//                   color:'white',
//                   textDecoration:'none',
//                   transform: 'translateY(-5px)',
//                   boxShadow: 3,
                  
//                 },
//               }}
//             >
//               <Link href={link.href} variant="body2" color="secondary.main">
//                 {link.name}
//               </Link>
//             </Box>
//   ))}
//         </Box>
//       </Box>

//       <Box sx={boxStyle}>
//       <Typography gutterBottom variant="h4" color="primary.main" component="div" sx={{ mb: 2 }}>
//         Newsletter
//       </Typography>
//       <Typography variant="body2" color= "secondary.main" sx={{ mb: 5 }}>
//         Heaven fruitful doesn't cover lesser days appear creeping seasons so behold.
//       </Typography>
//     </Box>
   
//     </Container>
//     </Grid>
    
//     </ThemeProvider>
//   );
// };

// export default Footer;
