import React from "react";
import InputField from "../HomeComponents/InputField";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const JobPostingData = ({ handleChange }) => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const SevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const ThirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  // console.log(twentyFourHoursAgo)

  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
  const SevenDaysAgoDate = SevenDaysAgo.toISOString().slice(0, 10);
  const ThirtyDaysAgoDate = ThirtyDaysAgo.toISOString().slice(0, 10);
  console.log(twentyFourHoursAgoDate);

  return (
    <Box sx={{ color: "#032B53" }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        Date of Posting
      </Typography>
      <Box>
        <FormControl>
          <RadioGroup onChange={handleChange}>
            <FormControlLabel value="" control={<Radio />} label="Any Time" />
            <FormControlLabel
              value={twentyFourHoursAgoDate}
              title="Last 24 hours"
              name="test"
              control={<Radio />}
              label="Last 24 Hours"
            />
            <FormControlLabel
              value={SevenDaysAgoDate}
              title="Last 7 days"
              name="test"
              control={<Radio />}
              label="Last 7 Days"
            />
            <FormControlLabel
              value={ThirtyDaysAgoDate}
              title="Last Month"
              name="test"
              control={<Radio />}
              label="Last Month"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};
export default JobPostingData;
