import React from 'react';
import Feed from '../../components/Feed';
import './Home.css';


function Home() {
    const [cats, setCats] = React.useState([]);

    React.useEffect(() => {
        getData()
    }, []);

    async function getData() {
        const response = await fetch('http://localhost:4000/api/cats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json();
        setCats([...data])
    }


    return (
        <div>
            {Array.from(cats).map((cat, index) => (
                <Feed data={cat} key={index} />
            ))}
        </div>
    );
}
export default Home;