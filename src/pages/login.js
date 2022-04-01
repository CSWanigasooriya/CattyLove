import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import "./login.scss";
import catimage from "../assets/images/login_cat_image.png";
import logoimage from "../assets/images/cattylove_logo.png";

export default function login() {
  return (
    <Card className="loginCard">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs>
            <div className="contentWrapper">
              <div className="headerWrapper">
                <img className="cattlovelogo" src={logoimage} alt="logo" />
                <h1 className="logoName">CattyLove</h1>
              </div>
              <div className="logintextWrapper">
                <h1 className="logintext">Log In</h1>
                <p className="logindescrip">Get started with CattyLove</p>
              </div>
              <div>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { mb: 2, width: "25em" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  />
                </Box>
              </div>
              <div className="terms-and-conditions">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="I accept the Terms and Conditions"
                  />
                </FormGroup>
              </div>
              <Button variant="contained" className="loginbtn">
                Login
              </Button>
              <div className="linksWrapper">
                <a className="account" href="url">
                  Create account
                </a>
                <a className="password" href="url">
                  Forgot password?
                </a>
              </div>
            </div>
          </Grid>
          <Grid item xs>
            <Card
              className="loginbackWrapper"
              sx={{ backgroundColor: "#AECFEF" }}
            >
              <img className="catimage" src={catimage} alt="cat" />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
