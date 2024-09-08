import { Box } from "@mui/material";
import BasicDetails from "../Components/JobSeekerProfile/BasicDetails";
import CareerDetails from "../Components/JobSeekerProfile/CareerDetails";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setUserDetails(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDataChange = async() => {
    await fetchData();
  };

  return (
    <Box >
      <BasicDetails userDetails={userDetails} onDataChange={handleDataChange} />
      <CareerDetails userDetails={userDetails.profile} />
    </Box>
  );
};

export default ProfilePage;
