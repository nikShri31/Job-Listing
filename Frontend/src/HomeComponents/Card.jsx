import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import { Link, useNavigate} from "react-router-dom";

const JobCard = ({ data }) => {
  const {
    _id,
    companyLogo,
    jobTitle,
    companyName,
    jobLocation,
    employmentType,
    minPrice,
    maxPrice,
    postingDate,
    description,
  } = data;
  const navigate = useNavigate();
  return (
    <Box sx={{ mb: 2 }}>
      <Card
        sx={{
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <CardActionArea
          component={Link}
          to={companyName === "Bern Black" ? '/jd' : null}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <CardMedia
            component="img"
            alt={jobTitle}
            height="80"
            sx={{ maxWidth: 145, objectFit: "cover" }}
            image={companyLogo}
            backgroundSize="Contained"
          />
          <Stack sx={{ ml: 2, flex: 1, p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {companyName}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {jobTitle}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                color: "text.secondary",
                mb: 1,
              }}
            >
              <Typography
                component="span"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <FiMapPin /> {jobLocation}
              </Typography>
              <Typography
                component="span"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <FiClock /> {employmentType}
              </Typography>
              <Typography
                component="span"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <FiDollarSign /> {minPrice}-{maxPrice}k
              </Typography>
              <Typography
                component="span"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <FiCalendar /> {postingDate}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Stack>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default JobCard;
