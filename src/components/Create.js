import CloseIcon from "@mui/icons-material/Close";
import { Grid, Snackbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FeatureInput from "./FeatureInput";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialValues = {
  catId: "",
  catName: "",
  catDescription: "",
  gender: "Male" | "Female",
  catImage: "",
  age: "",
  features: [],
  longitude: "",
  latitude: "",
};

export default function Create(props) {
  const [feature, setFeature] = React.useState([]);
  const [values, setValues] = useState(initialValues);
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCatData().then((data) => {
      if (data) setOpenSnack(true);
    });
  };

  const handleClose = () => {
    setOpenSnack(false);
  };

  async function setCatData(data) {
    const response = await fetch("http://localhost:4000/api/cats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cid: values.catId,
        displayName: values.catName,
        gender: values.gender,
        description: values.catDescription,
        photoUrl: values.catImage,
        age: values.age,
        features: feature,
        likedBy: [],
        comments: [],
      }),
    });

    const jsonData = await response.json();
    console.log(values.gender);
    return jsonData;
  }

  const handleSelecetedTags = (items) => {
    setFeature(items);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create Cat
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container sx={{ p: 2 }}>
          <Grid
            item
            xs={12}
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="catId"
              type="text"
              name="catId"
              label="Cat ID"
              variant="outlined"
              value={values.catId}
              onChange={(event) =>
                setValues({ ...values, catId: event.target.value })
              }
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              name="catName"
              label="Cat Name"
              value={values.catName}
              onChange={(event) =>
                setValues({ ...values, catName: event.target.value })
              }
            />

            <FeatureInput
              margin="normal"
              selectedTags={handleSelecetedTags}
              fullWidth
              variant="outlined"
              id="features"
              name="Features"
              placeholder="Type feature"
              label="Features"
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                onChange={(event) =>
                  setValues({ ...values, gender: event.target.value })
                }
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              name="age"
              label="Cat Age"
              value={values.age}
              onChange={(event) =>
                setValues({ ...values, age: event.target.value })
              }
            />

            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              name="catDescription"
              label="Cat Description"
              value={values.catDescription}
              onChange={(event) =>
                setValues({ ...values, catDescription: event.target.value })
              }
            />

            <Button
              style={{ borderRadius: "2em", marginTop: "1em" }}
              type="submit"
              variant="contained"
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Dialog>

      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Cat created successfully"
      />
    </div>
  );
}
