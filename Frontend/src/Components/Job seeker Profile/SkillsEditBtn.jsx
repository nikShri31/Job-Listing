import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Autocomplete, ButtonGroup, Stack, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import countries from "../../assets/countryList";


const style = {
  color: "#032340",
  width: "80%",
  p: 2,
 
};

export default function SkillsEditBtn({itSkills}) {
  

  return (
    <>
      <Box sx={style}>
      <Typography id="transition-modal-title"variant="h5"  sx={{ fontWeight:'bold',}}>
      Add Skills
      </Typography>

        <Stack
          spacing={3}
         
          sx={{ m:2}}
        >
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Skills
        </Typography>
          <Autocomplete
            multiple
            id="tags-standard"
            options={itSkills}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="select your skills"
              />
            )}
          />
        </Stack>
      </Box>
    </>
  );
}
