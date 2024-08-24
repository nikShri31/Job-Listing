import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import {
  ButtonGroup,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  Link,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import dateSelect from "../../assets/dateSelect";

const style = {
  color: "#032340",
  width: "80%",
  height: "80%",
  p: 2,
};

export default function PersonalDeatailsBtn() {


  const [variant, setVariant] = React.useState("outlined");
  const handleChipClick = () => {
    setVariant("filled");
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [gender, setGender] = React.useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  
  return (
    <>
      <>
        <>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h5"
              sx={{ fontWeight: "bold" }}
            >
              Personal Details
            </Typography>

            {/**Gender */}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Gender
            </Typography>
            <Stack direction="row" spacing={1} mt={1}>
              <Chip value={"male"} variant={variant} label="Male" onClick={handleChipClick} />
              
              <Chip value={"female"} variant={variant} label="Female" onClick={handleChipClick} />
              <Chip value={"other"}  variant={variant} label="other" onClick={handleChipClick} />
            </Stack>

            {/**Marital Status */}
            <Typography id="transition-modal-description" sx={{ mt: 3 }}>
              Marital status
            </Typography>
            <Stack direction="row" spacing={1} mt={1}>
              <Chip label="Single" onClick={handleChipClick} />
              <Chip label="Married" onClick={handleChipClick} />
              <Chip label="Widowed" onClick={handleChipClick} />
              <Chip label="Divorced" onClick={handleChipClick} />
              <Chip label="other" onClick={handleChipClick} />
            </Stack>

            {/*DoB */}
            <Typography id="transition-modal-description" sx={{ mt: 3 }}>
              Date of Birth
            </Typography>
            <Stack direction="row" spacing={1}>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="Date">Date</InputLabel>
                <Select
                  labelId="Date"
                  id="demo-simple-select-filled"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  {dateSelect.dates.map((date) => (
                    <MenuItem key={date} value={date}>
                      {date}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="month">month</InputLabel>
                <Select
                  labelId="month"
                  id="demo-simple-select-filled"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  {dateSelect.month.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="year">Year</InputLabel>
                <Select
                  labelId="year"
                  id="demo-simple-select-filled"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  {dateSelect.year.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            {/**Catagory*/}
            <Typography id="transition-modal-description" sx={{ mt: 3 }}>
              Category
            </Typography>
            <Stack direction="row" spacing={2} mt={1}>
              <Chip label="Genral" onClick={handleChipClick} />
              <Chip label="OBC" onClick={handleChipClick} />
              <Chip label="SC" onClick={handleChipClick} />
              <Chip label="ST" onClick={handleChipClick} />
              <Chip label="Other" onClick={handleChipClick} />
            </Stack>

            {/*Language */}
            <Typography id="transition-modal-description" sx={{ mt: 3 }}>
              Language
            </Typography>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { width: "25ch" },
                mt: 2,
              }}
              noValidate
              autoComplete="off"
            >
              <Stack direction="row" spacing={2}>
                <TextField required id="outlined-required" label="language" />
                <FormControl sx={{ width: "25ch" }}>
                  <InputLabel id="demo-simple-select-label">
                    Proficiancy
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Proficiancy"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Beginner</MenuItem>
                    <MenuItem value={20}>Intermediate</MenuItem>
                    <MenuItem value={30}>Professional</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction="row" spacing={1}>
                  <FormControlLabel control={<Checkbox />} label="Read" />
                  <FormControlLabel control={<Checkbox />} label="Write" />
                  <FormControlLabel control={<Checkbox />} label="Speak" />
                </Stack>
                <Link> Add +</Link>
              </Stack>
            </Box>

            {/**Gender */}
          </Box>
        </>
      </>
    </>
  );
}
