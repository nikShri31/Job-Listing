import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { deepOrange } from "@mui/material/colors";
import EditBtn from "./BasicEditBtn";

const BasicDetails = ({ userDetails, onDataChange }) => {
  const [formData, setFormData] = useState(userDetails);

  useEffect(() => {
    setFormData(userDetails);
  }, [userDetails]);

  const changeData = (data) => {
    console.log("Data Changed:", data);
    setFormData((oldData) => ({ ...oldData, ...data }));
    onDataChange();
  };

  return (
    <Box
      sx={{
        display: "flex",
        color: "#032340",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        textAlign: { sm: "center", md: "left" },
        backgroundImage: "linear-gradient(0deg, #E3F0FE, #E3F0FE)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container sx={{ minHeight: "50vh", mt: 8, border: "3px solid white", bgcolor: "#CEE5FD", }}>
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
                {formData?.name || "Name"}
              </Typography>
              <Box
                component="span"
                ml={2}
                sx={{
                  cursor: "pointer",
                }}
              >
                <EditBtn formData={formData} changeData={changeData} />
              </Box>
            </Stack>

            <Typography
              variant="h6"
              component="div"
              sx={{ textAlign: "left", color: "grey" }}
            >
              {formData?.workRole || ""}
            </Typography>

            {/* Basic Details */}
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
                  {formData?.email || "email"}
                </Typography>
                <Typography variant="h6" component="div">
                  {formData?.phoneNo || "phoneNo"}
                </Typography>
                <Typography variant="h6" component="div">
                  {formData?.location || ""}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BasicDetails;
