import LocationOnIcon from "@mui/icons-material/LocationOn";
import PetsIcon from '@mui/icons-material/Pets'; // name, age, gender, description, its features, contact number and an enlarged photo. 
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { blue } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import GoogleMapReact from 'google-map-react';
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import logoimage from "../../assets/images/logo.png";
//The location of where the cat currently resides should be given using google maps API.
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));


const Marker = ({ color }) => <div>{<PetsIcon color={color} />}</div>;

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

    const center = { lat: 6.9366020011364125, lng: 79.84251072596648 };
    const zoom = 11;

    return (
        <div>
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
                                    <img
                                        src={logoimage}
                                        alt=""
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

                        <div style={{ height: "100vh", width: "100vw" }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: "AIzaSyBt2tNTwamNhSga0Mj97Fuuy_5mCvfWpcM" }}
                                defaultCenter={center}
                                defaultZoom={zoom}
                            >
                                <Marker
                                    lat={center.lat}
                                    lng={center.lng}
                                    color="secondary"
                                />
                            </GoogleMapReact>

                            {JSON.stringify(cat)}
                        </div>
                    </Stack>
                </Box>
            </Card>

        </div>
    );
}
