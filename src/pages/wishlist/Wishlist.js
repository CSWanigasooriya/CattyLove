import React from 'react';

export default function Wishlist(props) {

    const [wishlist, setWishlist] = React.useState([]);

    const [cats, setCats] = React.useState([]);


    React.useEffect(() => {
        getWishlistedCatIds().then(ids => {
            ids.map(cid => {
                return getCatDetails(cid)
            })
        });
    }, []);


    async function getWishlistedCatIds() {
        const uid = localStorage.getItem('uid');

        const response = await fetch(`http://localhost:4000/api/users/${uid}/wishlist`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json();

        setWishlist([...data])

        return data;
    }

    async function getCatDetails(cid) {
        const response = await fetch(`http://localhost:4000/api/cats/${cid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json();

        setCats([...cats, data])
    }

    // async function removeFromWishlist() {
    //     const uid = localStorage.getItem('uid');
    //     await fetch(`http://localhost:4000/api/users/${uid}/wishlist/${cid}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    // }

    return (
        <div>
            <h1>Wishlist</h1>
            {Array.from(wishlist).map((cid, index) => (
                <div key={index}>
                    <h1>CID: {JSON.stringify(cid)}</h1>
                </div>
            ))}


            {Array.from(cats).map((cat, index) => (
                <div key={index}>
                    <h1>CAT: {JSON.stringify(cat)}</h1>
                </div>
            ))}

        </div>
    )
}