import {
  Box,
  Container,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiSearch,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const JobCard = ({ data }) => {
  // console.log(data);
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
  return (
    <Box sx={{mb: 2 }}>
      <Card sx={{
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
                      boxShadow: ` 10px 10px 10px  #00000041 `,

                     
                    },
      }}>
        {/* <Link to={`/jobs/${_id}`} className="flex gap-4 flex-col sm:flex-row items-start">*/}
        <CardContent>
          <CardActionArea
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              "&:focus": {
                outline: "none",
              },
              
            }}
          >
            <CardMedia
              component="img"
              alt={jobTitle}
              height="80"
              sx={{ maxWidth: 145 }}
              image={companyLogo}
            />
            {/**  <img src={companyLogo} alt={jobTitle} /> className="w-16 h-16 mb-4" */}
            <Stack>
              <Typography variant="h5" sx={{ m: 1, fontWeight: "bold" }}>
                {companyName}
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, mx: 1 }}>
                {jobTitle}
              </Typography>
            </Stack>
          </CardActionArea>

          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: 1, m: 1 }}
            className="text-primary/70 text-base"
          >
            <Typography
              component={"span"}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <FiMapPin /> {jobLocation}
            </Typography>
            <Typography
              component={"span"}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <FiClock /> {employmentType}
            </Typography>
            <Typography
              component={"span"}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <FiDollarSign /> {minPrice}-{maxPrice}k
            </Typography>
            <Typography
              component={"span"}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <FiCalendar /> {postingDate}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        {/* </Link>*/}
      </Card>
    </Box>
  );
};

export default JobCard;
