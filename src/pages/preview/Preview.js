import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef, ReactElement } from "react";
import { useParams } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import PetsIcon from '@mui/icons-material/Pets';// name, age, gender, description, its features, contact number and an enlarged photo. 
//The location of where the cat currently resides should be given using google maps API.


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

    if (!cat.cid) return (<CircularProgress />)

    const center = { lat: 6.9366020011364125, lng: 79.84251072596648 };
    const zoom = 11;

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBt2tNTwamNhSga0Mj97Fuuy_5mCvfWpcM" }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                <Marker
                    lat={cat.location.lat}
                    lng={cat.location.lng}
                    color="secondary"
                />
            </GoogleMapReact>
        </div>
    )
}