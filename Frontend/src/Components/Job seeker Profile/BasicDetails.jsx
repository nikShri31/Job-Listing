import { Avatar, Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useState, useEffect, useNavigate } from "react";
import { deepOrange } from "@mui/material/colors";
import EditBtn from "./BasicEditBtn";
import axios from "axios";

const BasicDetails = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
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
        setUserDetails({ ...response.data.user });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        color: "#032340",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        textAlign: { sm: "center", md: "left" },
        // backgroundImage: "linear-gradient(180deg, #CEE5FD, #FFF)",
        bgcolor: "#CEE5FD",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container sx={{ minHeight: "50vh", mt: 8, border: "3px solid white" }}>
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
                {userDetails.name || "Name"}
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
              {userDetails.profile?.role || "Role"}
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
              <Box sx={{}}>
                <Typography variant="h6" component="div">
                  {" "}
                  {userDetails.email}{" "}
                </Typography>
                <Typography variant="h6" component="div">
                  {" "}
                  {userDetails.phoneNo}{" "}
                </Typography>
                <Typography variant="h6" component="div">
                  {" "}
                  {
                    userDetails.location || "Location"
                  }
                </Typography>
              </Box>
            </Box>
          </Box>{" "}
        </Box>
      </Container>
    </Box>
  );
};

export default BasicDetails;
