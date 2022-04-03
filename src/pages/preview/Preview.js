import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
// name, age, gender, description, its features, contact number and an enlarged photo. 
//The location of where the cat currently resides should be given using google maps API.

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

    return (
        <div>
            <h1>Preview</h1>
            <p>
                {JSON.stringify(cat)}
            </p>
            <p>{cat.displayName}</p>
        </div>
    )
}