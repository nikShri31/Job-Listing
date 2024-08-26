import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: " Find the Best Matches here!!!",
    description:
      "Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.",
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: "Looking For a Job ?...",
    description:
      "Experience unmatched durability that goes above and beyond with lasting investment.",
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: " Wanna POST a New Job ...",
    description:
      "Integrate our product into your routine with an intuitive and easy-to-use interface.",
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: "Innovative functionality",
    description:
      "Stay ahead with features that set new standards, addressing your evolving needs better than the rest.",
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Reliable support",
    description:
      "Count on our responsive customer support, offering assistance that goes beyond the purchase.",
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: "Precision in every detail",
    description:
      "Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        backgroundImage: "linear-gradient(90deg, #CEE5FD, #FFF ,#CEE5FD)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography component="h2" variant="h4" color={"grey"}>
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: "black" }}>
            Explore all the top opportunities, Excel your Career, Grow your
            skills with US !!!
          </Typography>
        </Box>
        <Grid container spacing={3.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="black"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  mb: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.400",
                  borderRadius: "20px",
                  background: "transparent",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05) translateZ(30px)",
                    boxShadow: `10px 10px 10px #00000041, inset 5px 5px 6px rgba(0, 0, 0, 0.2)`,
                  },
                }}
              >
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "black" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
