import { Status, Wrapper } from "@googlemaps/react-wrapper";
import React, { useEffect, useRef, ReactElement } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import { blue, grey, red } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import loginimage from "../../assets/images/login_image.png";
import logoimage from "../../assets/images/logo.png";
import ReactRoundedImage from "react-rounded-image";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { styled } from "@mui/material/styles";
// name, age, gender, description, its features, contact number and an enlarged photo.
//The location of where the cat currently resides should be given using google maps API.
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function MapComponent({
  center,
  zoom,
}) {

  const ref = useRef();

  useEffect(() => {
      new window.google.maps.Map(ref.current, {
          center,
          zoom,
      });
  });

  return <div ref={ref} id="map" />;
}

export default function Preview() {

  let { cid } = useParams();

  const [cat, setCat] = React.useState({});

  useEffect(() => {
      getCatDetails()
  }, []);

  async function getCatDetails() {
      const response = await fetch(`http://localhost:4000/api/cats/${cid}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
      })
      const data = await response.json();

      setCat(data)
  }

  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  return (
    <div>
       {/* <h1>Preview</h1>
            <p>
                {JSON.stringify(cat)}
            </p>
            <p>{cat.displayName}</p>  */}

       <Card
        sx={{ maxWidth: "100vw", m: 1, boxShadow: 2, borderRadius: "0.5em" }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Item>
              <div style={{ flexDirection: "row" }}>
                <div>
                  <ReactRoundedImage
                    image={logoimage}
                    imageWidth="150"
                    imageHeight="150"
                    roundedSize="13"
                  />
                </div>
                <div>
                  <Typography variant="h6" gutterBottom component="div">
                    Cat Name
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Age: 3
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Gender: Male
                  </Typography>
                  <LocationOnIcon sx={{ color: blue[700] }} />
                </div>
              </div>
            </Item>

            <Item>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ textAlign: "left" }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Features
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Cats have 32 muscles that control the outer ear.
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    In relation to their body size, cats have the largest eyes
                    of any mammal.
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "left" }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Description
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    eu malesuada orci, a imperdiet enim. Praesent viverra
                    fermentum enim, eget bibendum neque suscipit sit amet.
                    Nullam rutrum magna a nisi fermentum, ac pulvinar orci
                    blandit. Donec laoreet dapibus ex. Phasellus ut accumsan
                    velit. Sed et tempor risus, ac sagittis mauris.
                  </Typography>
                </Grid>
              </Grid>
            </Item>

            <div style={{height: "1000px", width: "1000px"}}>
              <Wrapper apiKey={"AIzaSyBt2tNTwamNhSga0Mj97Fuuy_5mCvfWpcM"} render={render}>
                <MapComponent center={center} zoom={zoom}/>
              </Wrapper>
            </div>
           </Stack>
        </Box>
      </Card> 

      {/* <Wrapper apiKey="AIzaSyAKDfv_S_DT0Dbe8bTIqdJhINlYyFf9vWo" render={render}>
        <MapComponent center={center} zoom={zoom} />
      </Wrapper> */}
    </div>
  );
}
