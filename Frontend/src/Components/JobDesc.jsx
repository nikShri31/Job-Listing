import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
import {useNavigate} from "react-router-dom"

const logoStyle = {
  width: "80px",
  height: "60px",
  margin: "0 35px",
  opacity: 0.8,
};

const Job = [
  {
    logo: "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",
    name: "Web Developer",
    companyName: "Bern Black",
    place: "Delhi, India",
    description:
      "As a Web Developer at Bern Black, you will be responsible for designing, coding, and maintaining our websites and web applications. You will work closely with our design and development teams to create user-friendly and visually appealing digital experiences",
    skills: [
      "System Software Development",
      "Research and code , libraries, APIs and frameworks",
      "Strong problem solving and debugging skills",
      
    ],
    experience: [
      " 2 or more years of professional design experience",
      "  Ecommerce website design experience",
      " Familiarity with mobile and web apps preferred",
      " Website design experience",
    ],
  },
];

const JobOverview = {
  postDate: "10 Aug 2024",
  location: "New Delhi",
  vacancy: "05",
  nature: "FullTime",
  salary: "$40k - $50k",
  lastDate: "10 Oct 2024",
};

const JobDesc = () => {

  const navigate = useNavigate()
  const handleApply = () => {
    navigate("/home")
  }
  //Job Listing API CALL
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
        backgroundImage: "linear-gradient(130deg, #CEE5FD, #FFF)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "flex",

          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {/**Main description page */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            gap: 6,
            minWidth: { xs: "100%", sm: "60%" },
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "80%" }, ml: { xs: 1, sm: 4 } }}>
            <Box sx={{ m: 4,border:'2px solid red' }}>
              <Grid
                container
                spacing={1}
                sx={{
                  maxWidth: { xs: "270px", sm: "none" },
                 
                  border:'2px solid green',
                  backgroundImage: "linear-gradient(90deg,#CEE5FD,white)",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: `
          10px 10px 10px #00000041,
          inset 5px 5px 6px rgba(0, 0, 0, 0.2)
        `,
                  },
                }}
              >
                <Grid item xs={12} sm={3}>
                  <img src={Job[0].logo} style={logoStyle} />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                  <Stack direction={"column"}>
                    <Typography
                      variant="h5"
                      sx={{ px: 2, color: "matteblue", fontWeight: "bold" }}
                    >
                      {Job[0].name}
                    </Typography>
                    <Stack direction="row" spacing={5} sx={{ ml: 2 }}>
                      <Typography color="grey">
                        {" "}
                        {Job[0].companyName}{" "}
                      </Typography>

                      <Typography color="grey" sx={{ mt: -20 }}>
                        <PlaceIcon /> {Job[0].place}{" "}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            {/** Job description*/}
            <Box m={3}>
              <Typography
                gutterBottom
                variant="h5"
                color="primary.main"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                Job Description
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={2}
                sx={{ textAlign: { xs: "left", sm: "none" } }}
              >
                {Job[0].description}
              </Typography>
            </Box>

            {/* skills */}
            <Box m={3}>
              <Typography
                gutterBottom
                variant="h5"
                color="primary.main"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                Required Skills
              </Typography>

              <List>
                <ListItem
                  sx={{ flexDirection: "column" }}
                  alignItems="flex-start"
                >
                  {Job[0].skills.map((skill, index) => (
                    <ListItemText key={index} sx={{ color: "black" }}>
                      {skill}
                    </ListItemText>
                  ))}
                </ListItem>
              </List>
            </Box>

            {/*Education and Experience */}
            <Box m={3}>
              <Typography
                gutterBottom
                variant="h5"
                color="primary.main"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                Education and Experience
              </Typography>

              <List>
                <ListItem
                  sx={{ flexDirection: "column" }}
                  alignItems="flex-start"
                >
                  {Job[0].experience.map((exp, index) => (
                    <ListItemText key={index} sx={{ color: "black" }}>
                      {exp}
                    </ListItemText>
                  ))}
                </ListItem>
              </List>
            </Box>
          </Box>
        </Box>

        {/**Side page */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            minWidth: { xs: "100%", sm: "35%" },
          }}
        >
          <Stack
            direction="column"
            spacing={3}
            useFlexGap
            sx={{ mt: 5, mr: 4 }}
          >
            {/** Job Overview */}
            <Card
              sx={{
                maxWidth: 285,
                border: "2px solid white",
                backgroundImage: "linear-gradient(270deg,white,#CEE5FD)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: ` 10px 10px 10px #00000041,
                               inset 5px 5px 6px rgba(0, 0, 0, 0.2) `,
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  color={"black"}
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Job Overview
                </Typography>
                <List>
                  <ListItem disableGutters>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography variant="body1">Posted Date :</Typography>
                      <Typography variant="body1">
                        {JobOverview.postDate}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography variant="body1">Location:</Typography>
                      <Typography variant="body1">
                        {JobOverview.location}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography variant="body1">Vacancy:</Typography>
                      <Typography variant="body1">
                        {JobOverview.vacancy}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography variant="body1">Job nature:</Typography>
                      <Typography variant="body1">
                        {JobOverview.nature}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography variant="body1">Salary:</Typography>
                      <Typography variant="body1">
                        {JobOverview.salary}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography variant="body1">Application date:</Typography>
                      <Typography variant="body1">
                        {JobOverview.lastDate}
                      </Typography>
                    </Box>
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ color: "white", alignItems: "center" }}
                >
                  Apply Now
                </Button>
              </CardActions>
            </Card>

            {/**Company Info */}

            <Box>
              <Typography
                gutterBottom
                variant="h5"
                color="primary.main"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                Company Details
              </Typography>

              <List>
                <ListItem
                  sx={{ flexDirection: "column" }}
                  alignItems="flex-start"
                >
                  <ListItemText>
                    <Box sx={{ display: "flex", alignItems: "space-between" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "black",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        Bern Black{" "}
                      </Typography>
                      <Rating
                        name="half-rating-read"
                        sx={{ ml: 3, color: "black" }}
                        defaultValue={4.5}
                        precision={0.5}
                        readOnly
                      />
                    </Box>
                  </ListItemText>

                  <ListItemText sx={{ color: "black" }}>
                    <Typography variant="body2" color="text.secondary">
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout.
                    </Typography>
                  </ListItemText>
                  <ListItemText sx={{ color: "black" }}>
                    Main Office: New Delhi
                  </ListItemText>
                  <ListItemText sx={{ color: "black" }}>
                    Web : Bernblack.com
                  </ListItemText>
                  <ListItemText sx={{ color: "black" }}>
                    Email: carrier.bern@gmail.com
                  </ListItemText>
                </ListItem>
              </List>
            </Box>

            <Button variant="outlined" onClick={handleApply}>Back to other Similar jobs</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default JobDesc;
