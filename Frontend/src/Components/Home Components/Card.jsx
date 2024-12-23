import React, { useState } from "react";
import { Box, Card, CardActionArea, CardMedia, Stack, Typography, Chip, Button } from "@mui/material";
import { FiMapPin, FiClock, FiDollarSign, FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const getDateFormat = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

const JobCard = ({ data, onClick  }) => {
  const {
    companyLogo,
    title,
    organisation,
    location,
    employmentType,
    salary,
    postedDate,
    description,
  } = data;

  return (
    <Box sx={{ mb: 3 }}>
      <Card
        sx={{
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <CardActionArea
        onClick={onClick}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <CardMedia
            component="img"
            alt={title}
            height="100"
            sx={{ maxWidth: 175, objectFit: "contain",pt:2 }}
            image={companyLogo}
           
          />
          <Stack sx={{ flex: 1, p:2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {organisation?.name}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {title}
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
                sx={{ display: "flex", alignItems: "center", mx: 1 }}
              >
                <FiMapPin /> <Chip label={location} />
              </Typography>
              <Typography
                component="span"
                sx={{ display: "flex", alignItems: "center", mx: 1 }}
              >
                <FiClock /> <Chip label={employmentType} />
              </Typography>
              <Typography
                component="span"
                sx={{ display: "flex", alignItems: "center", mx: 1 }}
              >
                <FiDollarSign /> <Chip label={`${salary}k`} />
              </Typography>
              <Typography
                component="span"
                sx={{ display: "flex", alignItems: "center", mx: 1 }}
              >
                <FiCalendar /> <Chip label={getDateFormat(postedDate)} />
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary"
            sx={{ 
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              lineHeight: '1.5',  
              }}
            >
              {description}
            </Typography>
          </Stack>
        </CardActionArea>

       
      </Card>
    </Box>
  );
};

export default JobCard;


