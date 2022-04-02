import './Home.css';
import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken'


function Home() {

    useEffect(() => {
        const token = jwt.decode(localStorage.getItem('token'));
        if (token) {
            console.log(token);
        }
    }, []);

    return (
        <h1>Home</h1>
    );
}

export default Home;