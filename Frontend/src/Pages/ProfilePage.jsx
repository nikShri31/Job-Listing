import { Box, Stack } from "@mui/material";
import BasicDetails from "../Components/Job seeker Profile/BasicDetails";
import CareerDetails from "../Components/Job seeker Profile/CareerDetails";

import Footer from "../Footer/Foooter";
import Header_2 from "../Header/Header_2";

const ProfilePage = () => {
  return (
    <Box sx={{color:'#084C91'}}>
      <Header_2 />
      <BasicDetails/>
      <Stack direction={"row"}sx={{alignItems:'flex-end'}}>
      <CareerDetails />
      </Stack>
      <Footer />
    </Box>
  );
};

export default ProfilePage;