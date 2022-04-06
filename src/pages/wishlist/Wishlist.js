import { Delete } from '@mui/icons-material';
import ImageIcon from '@mui/icons-material/Image';
import { IconButton, ListItemSecondaryAction } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';


export default function Wishlist(props) {
    const uid = localStorage.getItem('uid');

    const [wishlist, setWishlist] = React.useState([]);


    React.useEffect(() => {
        getWishlistedCats()
    }, []);


    const handleDelete = (cid) => {
        removeFromWishlist(cid).then((data) => {
            if (data)
                getWishlistedCats();
        });
    }


    async function getWishlistedCats() {

        const response = await fetch(`http://localhost:4000/api/users/${uid}/wishlist`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json();

        console.log(data);

        setWishlist([...data])

        return data;
    }


    async function removeFromWishlist(cid) {
        const response = await fetch(`http://localhost:4000/api/users/${uid}/wishlist/${cid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        console.log(data);
        return data;
    }



    return (
        <div>
            <h1>Wishlist</h1>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

                {Array.from(wishlist).map((cat, index) => (
                    <div key={index}>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={cat.displayName} secondary="Jan 9, 2014" />
                            <ListItemSecondaryAction>
                                <IconButton onClick={(event) => { handleDelete(cat.cid) }}><Delete sx={{ color: red[500] }} /></IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </div>
                ))}
            </List>


            {Array.from(wishlist).map((cat, index) => (
                <div key={index}>
                    <h1>CAT: {JSON.stringify(cat)}</h1>
                </div>
            ))}




        </div>
    )
}