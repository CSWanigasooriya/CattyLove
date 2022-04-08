import { Comment, Delete, Favorite, Send, ThumbUp } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavigationIcon from "@mui/icons-material/Navigation";
import {
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Snackbar,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { blue, red } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GoogleMapReact from "google-map-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";
import logoimage from "../../assets/images/logo.png";

//The location of where the cat currently resides should be given using google maps API.

const Marker = ({ color }) => <div>{<NavigationIcon color={color} />}</div>;

export default function Preview() {
  const center = { lat: 6.9366020011364125, lng: 79.84251072596648 };
  const zoom = 5;
  const uid = localStorage.getItem("uid");

  let { id } = useParams();

  const [values, setValues] = React.useState({
    comment: "",
  });
  const [comments, setComments] = React.useState([]);
  const [cat, setCat] = React.useState({});
  const [openSnack, setOpenSnack] = React.useState(false);

  useEffect(() => {
    getCatDetails().then((data) => {
      getCatComments(data._id);
    });
    return () => {};
  }, []);

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId).then((data) => {
      getCatComments(data._id);
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownText = (event) => {
    event.preventDefault();
  };

  const handleClickSend = (event) => {
    setValues({
      ...values,
      comments: values.comment,
    });
    setCatComment().then((data) => {
      getCatComments(data._id);
    });
  };

  const handleAddToWishlist = (event) => {
    addToWishlist().then((data) => {
      if (data) setOpenSnack(true);
    });
  };

  async function getCatDetails() {
    const response = await fetch(`http://localhost:4000/api/cats/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCat(data);
    return data;
  }

  async function setCatComment() {
    const response = await fetch(
      `http://localhost:4000/api/cats/${cat._id}/comments/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: localStorage.getItem("uid"),
          comment: values.comment,
        }),
      }
    );

    const data = await response.json();
    return data;
  }

  async function getCatComments(cid) {
    const response = await fetch(
      `http://localhost:4000/api/cats/${cid}/comments/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setComments(data);
    return data;
  }

  async function deleteComment(commentId) {
    const response = await fetch(
      `http://localhost:4000/api/cats/${cat._id}/comments/${commentId}`,
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

  async function addToWishlist() {
    const uid = localStorage.getItem("uid");
    const response = await fetch(
      `http://localhost:4000/api/users/${uid}/wishlist/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: cat._id,
        }),
      }
    );

    const data = await response.json();
    return data;
  }

  return (
    <div>
      {cat && (
        <div>
          <Card sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              sx={{ width: 200, p: 2 }}
              image={cat.photoURL ? cat.photoURL : logoimage}
            />
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Box>
                  <Typography
                    component="div"
                    variant="h4"
                    sx={{ color: blue[700] }}
                  >
                    {cat.displayName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    component="p"
                  >
                    {format(cat.createdAt)}
                  </Typography>
                </Box>
                <Divider />
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <b> Age:</b> {cat.age}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <b> Gender:</b> {cat.gender}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <b> Address:</b> {cat.address ? cat.address : "N/A"}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <b> City:</b> {cat.city ? cat.city : "N/A"}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <b> Description:</b> {cat.description}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <b> Features:</b>
                  <Stack spacing={1}>
                    {" "}
                    <Stack direction="row" spacing={1}>
                      {cat.features && cat.features.length > 0 ? (
                        Array.from(cat.features).map((data, index) => (
                          <Chip
                            label={data}
                            variant="outlined"
                            color="info"
                            key={index}
                          />
                        ))
                      ) : (
                        <Chip label="No Features" />
                      )}
                    </Stack>
                  </Stack>
                </Typography>
              </CardContent>

              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <Button disableRipple>
                  <LocationOnIcon sx={{ mr: 1 }} />
                  {cat.lat && cat.lng ? `${cat.lat} , ${cat.lng}` : "N/A"}
                </Button>
                <Button disableRipple>
                  <ThumbUp sx={{ mr: 1 }} />
                  {cat && cat.likedBy ? cat.likedBy.length : 0}{" "}
                  {cat && cat.likedBy
                    ? cat.likedBy.length === 1
                      ? "like"
                      : "likes"
                    : "likes"}
                </Button>
                <Button disableRipple>
                  <Comment sx={{ mr: 1 }} />
                  {cat && cat.comments ? cat.comments.length : 0}{" "}
                  {cat && cat.comments
                    ? cat.comments.length === 1
                      ? "comment"
                      : "comments"
                    : "comment"}
                </Button>
                <Button
                  disableRipple
                  onClick={(event) => handleAddToWishlist()}
                >
                  <Favorite sx={{ mr: 1 }} />
                  Add to Wishlist
                </Button>
              </Box>
            </Box>
          </Card>

          {cat && cat.lng && cat.lat ? (
            <div style={{ height: "50vh" }}>
              <GoogleMapReact
                id="map"
                bootstrapURLKeys={{
                  key: "AIzaSyBt2tNTwamNhSga0Mj97Fuuy_5mCvfWpcM",
                }}
                defaultCenter={center}
                center={{
                  lat: -90 < cat.lat < 90 ? cat.lat : center.lat,
                  lng: -180 < cat.lng < 180 ? cat.lng : center.lng,
                }}
                defaultZoom={zoom}
              >
                <Marker lat={cat.lat} lng={cat.lng} color="primary" />
              </GoogleMapReact>
            </div>
          ) : (
            <div></div>
          )}

          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography variant="h5" sx={{ color: blue[700] }}>
                <b> Comments:</b>
              </Typography>
              <Divider />

              {cat && cat.comments ? (
                <List>
                  {Array.from(comments).map((data, index) => (
                    <div key={index}>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={12}>
                            <ListItemText primary={data.comment}></ListItemText>
                            <ListItemSecondaryAction
                              sx={{
                                display: uid === data.uid ? "block" : "none",
                              }}
                            >
                              <IconButton
                                onClick={() =>
                                  handleDeleteComment(data.commentId)
                                }
                              >
                                <Delete sx={{ color: red[500] }} />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </Grid>
                          <Grid item xs={12}>
                            <ListItemText
                              secondary={Date(data.updatedAt)}
                            ></ListItemText>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              ) : (
                <Typography paragraph sx={{ m: 1 }}>
                  No comments yet.
                </Typography>
              )}

              <Grid
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                sx={{ mt: 3 }}
              >
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="send-comment">Comment</InputLabel>
                  <OutlinedInput
                    id="send-comment"
                    onChange={handleChange("comment")}
                    value={values.comment}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          onMouseDown={handleMouseDownText}
                          onClick={(event) => handleClickSend(event)}
                          edge="end"
                        >
                          <Send />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Comment"
                  />
                </FormControl>
              </Grid>
            </CardContent>
          </Card>

          <Snackbar
            open={openSnack}
            autoHideDuration={2000}
            onClose={(event) => setOpenSnack(false)}
            message="Added to Wishlist"
          />
        </div>
      )}
    </div>
  );
}
