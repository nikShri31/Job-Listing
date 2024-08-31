import { Box, Typography } from "@mui/material";
import JobCard from "../HomeComponents/Card"; // Assuming you have a JobCard component


const Jobs = ({ result }) => {
  return (
    <Box>
      <Box className="card-container">{result}</Box>
    </Box>
  );
};

export default Jobs;

{
  /* <Box>
     <Typography variant="h4" sx={{mb:2, fontWeight:'bold'}}>{result.length} Jobs</Typography>
     </Box> */
}
