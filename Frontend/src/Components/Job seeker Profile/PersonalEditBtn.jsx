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
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

const style = {
  color:'#032340',
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PersonalDeatailsBtn() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [variant, setVariant] = React.useState("outlined");
  const handleChipClick = () => {
    setVariant("filled");
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
    <Button onClick={handleOpen}  sx={{color:'whitesmoke'}}><EditIcon/></Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backdropFilter: "blur(5px)",
            },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title"variant="h5"  sx={{ fontWeight:'bold',}}>
            Personal Details
            </Typography>

            {/**Gender */}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Gender
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label="Male" onClick={handleChipClick} />
              <Chip label="Female" onClick={handleChipClick} />
              <Chip label="other" onClick={handleChipClick} />
            </Stack>

            {/**Marital Status */}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Marital status
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label="Single" onClick={handleChipClick} />
              <Chip label="Married" onClick={handleChipClick} />
              <Chip label="Widowed" onClick={handleChipClick} />
              <Chip label="Divorced" onClick={handleChipClick} />
              <Chip label="other" onClick={handleChipClick} />
            </Stack>

            {/*DoB */}
            <Stack direction="row" spacing={1}>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label"></InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label"></InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label"></InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            {/**Catagory*/}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Marital status
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label="Genral" onClick={handleChipClick} />
              <Chip label="OBC" onClick={handleChipClick} />
              <Chip label="SC" onClick={handleChipClick} />
              <Chip label="ST" onClick={handleChipClick} />
              <Chip label="Other" onClick={handleChipClick} />
            </Stack>

            {/*Language */}
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Language
            </Typography>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <Stack direction="row" spacing={1}>
                <TextField required id="outlined-required" label="language" />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Proficiancy
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Beginner</MenuItem>
                    <MenuItem value={20}>Intermediate</MenuItem>
                    <MenuItem value={30}>Professional</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={1}>
                <FormControlLabel control={<Checkbox />} label="Read" />
                <FormControlLabel control={<Checkbox />} label="Write" />
                <FormControlLabel control={<Checkbox />} label="Speak" />
              </Stack>
            </Box>

            {/**Gender */}

            {/**Submit */}
            <Box sx={{ m: 1 }}>
            <ButtonGroup aria-label="Loading button group">
              <Button variant="contained" sx={{ m: 1 }} >
                Submit
              </Button>
              <Button variant="outlined" onClick={handleClose} sx={{ m: 1 }}>cancel</Button>
            </ButtonGroup>
          </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
