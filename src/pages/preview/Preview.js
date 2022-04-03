import { Status, Wrapper } from "@googlemaps/react-wrapper";
import React, { useEffect, useRef, ReactElement } from "react";
import { useParams } from 'react-router-dom';
// name, age, gender, description, its features, contact number and an enlarged photo. 
//The location of where the cat currently resides should be given using google maps API.

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
            <h1>Preview</h1>
            <p>
                {JSON.stringify(cat)}
            </p>
            <p>{cat.displayName}</p>

            <Wrapper apiKey="AIzaSyAKDfv_S_DT0Dbe8bTIqdJhINlYyFf9vWo" render={render}>
                <MapComponent center={center} zoom={zoom} />
            </Wrapper>
        </div>
    )
}