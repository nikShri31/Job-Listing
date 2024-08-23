import { Avatar, Box, Container, Grid, Stack, Typography } from "@mui/material";
import React, {useNavigate} from "react";
import { deepOrange, deepPurple } from "@mui/material/colors";
import EditBtn from "./BasicEditBtn";
import axios from "axios";


const BasicDetails = async () => {
  if(localStorage.getItem("token")){
    const response = await axios.get("http://localhost:5000/api/users/signup", {
      'Authorization' : `Bearer ${localStorage.getItem("token")}`
    });
    const details = response.data;
    if (details.profile.experience) {
      if (details.profile.experience < 1) {
        details.profile.experience = details.profile.experience * 12 + " Months";
      }
      else{
        let year = Math.floor(details.profile.experience);
        let months = Math.round((details.profile.experience - year) * 12);
        details.profile.experience = year + " Years " + months + " Months";
      }
    }
  }else{

  }
  

  return (
    <Box
      sx={{
        display: "flex",
        color: "#032340",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        textAlign: { sm: "center", md: "left" },
        backgroundImage: "linear-gradient(180deg, #CEE5FD, #FFF)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container sx={{ minHeight: "50vh", mt: 8, border: "3px solid #032340" }}>
        <Box
          mt={5}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 180,
              height: 180,
              border: "3px solid green",
            }}
          >
            N
          </Avatar>
          <Box
            sx={{
              minWidth: { sm: "100%", md: "80%" },
              ml: 4,

              textAlign: "left",
            }}
          >
            <Stack direction="row">
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {details.name}
              </Typography>
              {/*Edit Button */}
              <Box
                component="span"
                ml={2}
                sx={{
                  cursor: "pointer",
                }}
              >
                <EditBtn />
              </Box>
            </Stack>

            <Typography
              variant="h6"
              component="div"
              sx={{ textAlign: "left", color: "grey" }}
            >
              {details.profile}
            </Typography>

            {/*Basic Details */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                mt: 2,
                pt: { xs: 4, sm: 3 },
                width: "100%",
                borderTop: "2px solid ",
                borderColor: "divider",
              }}
            >
              <Box width={"60vh"} variant="h6" sx={{}}>
                {/* <Typography component="div"> {details.place} </Typography> */}
                <Typography component="div"> {details.profile.experience} </Typography>
                {/* <Typography component="div">
                  {" "}
                  {details.noticePeriod}{" "}
                </Typography> */}
              </Box>
              <Box sx={{}}>
                <Typography component="div"> {details.email} </Typography>
                <Typography component="div"> {details.phone} </Typography>
              </Box>
            </Box>
          </Box>{" "}
        </Box>
      </Container>
    </Box>
  );
};

export default BasicDetails;
