import React from 'react';
import { useParams } from 'react-router-dom';

export default function Wishlist(props) {

    const [wishlist, setWishlist] = React.useState([]);

    React.useEffect(() => {
        getWishlistedCats()
    }, []);


    async function getWishlistedCats() {
        const uid = localStorage.getItem('uid');

        const response = await fetch(`http://localhost:4000/api/users/${uid}/wishlist`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json();
        console.log(data)
        setWishlist([...data])
    }

    // async function removeFromWishlist() {
    //     const uid = localStorage.getItem('uid');
    //     await fetch(`http://localhost:4000/api/users/${uid}/remove/`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             uid: localStorage.getItem('uid'),
    //             cid: props.data.cid
    //         }),
    //     })
    // }

    return (
        <div>
            <h1>Wishlist</h1>
            {Array.from(wishlist).map((item, index) => (
                <div key={index}>
                    <h1>{JSON.stringify(item)}</h1>
                </div>
            ))}

        </div>
    )
}