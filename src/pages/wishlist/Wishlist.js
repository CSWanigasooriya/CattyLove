import { Delete } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  ListItemSecondaryAction,
  Snackbar,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = React.useState(false);
  const [wishlist, setWishlist] = React.useState([]);

  React.useEffect(() => {
    getWishlistedCats();
    return () => { };
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    removeFromWishlist(id).then((data) => {
      if (data) {
        getWishlistedCats();
        setOpenSnack(true);
      }
    });
  };

  const handleItemClick = (id) => {
    navigate(`/cat/${id}/preview`);
  };

  async function getWishlistedCats() {
    const response = await fetch(
      `http://localhost:4000/api/users/${uid}/wishlist`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    setWishlist([...data]);

    return data;
  }

  async function removeFromWishlist(id) {
    const response = await fetch(
      `http://localhost:4000/api/users/${uid}/wishlist/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  }

  return (
    <div>
      <h1>Wishlist</h1>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {Array.from(wishlist).map((cat, index) => (
          <div key={index}>
            <ListItem
              alignItems="flex-start"
              button
              onClick={(event) => handleItemClick(cat._id)}
            >
              <ListItemAvatar>
                <Avatar alt="" src={cat.photoURL} />
              </ListItemAvatar>
              <ListItemText
                primary={cat.displayName}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {cat.address}
                    </Typography>
                    {`  -   ${cat.city ? cat.city : "N/A"}`}
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={(event) => {
                    handleDelete(cat._id);
                  }}
                >
                  <Delete sx={{ color: red[500] }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>

      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={() => setOpenSnack(false)}
        message="Deleted cat from wishlist"
      />
    </div>
  );
}
