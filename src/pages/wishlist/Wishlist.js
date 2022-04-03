import React from 'react';

export default function Wishlist() {

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