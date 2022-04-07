import { Comment, Delete, Send, ThumbUp } from "@mui/icons-material";
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
import logoimage from "../../assets/images/logo.png";

//The location of where the cat currently resides should be given using google maps API.

const Marker = ({ color }) => <div>{<NavigationIcon color={color} />}</div>;

export default function Preview() {
  const center = { lat: 6.9366020011364125, lng: 79.84251072596648 };
  const zoom = 11;
  const uid = localStorage.getItem("uid");
  let { id } = useParams();

  const [values, setValues] = React.useState({
    comment: "",
  });
  const [comments, setComments] = React.useState([]);
  const [cat, setCat] = React.useState({});

  useEffect(() => {
    getCatDetails().then((data) => {
      getCatComments(data._id);
    });
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

  return (
    <div>
      {/* <Card
        sx={{ m: 1, boxShadow: 2, borderRadius: "0.5em" }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Box>
          <Stack spacing={2}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingLeft: "1em",
                paddingTop: "1em",
              }}
            >
              <div style={{ paddingRight: "2em" }}>
                <Avatar
                  src={logoimage}
                  sx={{ width: "200px", height: "200px" }}
                />
              </div>

              <div style={{ display: "inline-block" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{ color: blue[700] }}
                >
                  Cat Name: {cat.displayName}
                </Typography>


                <Divider />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Age: {cat.age ? cat.age : "N/A"}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Gender: {cat.gender}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    <LocationOnIcon sx={{ color: blue[700] }} />
                  </Typography>
                </div>

              </div>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ textAlign: "left" }}>
                <div style={{ paddingLeft: "1em" }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Features
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                    sx={{ listStyleType: "circle" }}
                  >
                    Cats have 32 muscles that control the outer ear.
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    In relation to their body size, cats have the largest eyes
                    of any mammal.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "left" }}>
                <div style={{ paddingRight: "1em" }}>
                  <Typography variant="h6" gutterBottom component="div">
                    Description
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                  >
                    {cat.description}
                  </Typography>
                </div>
              </Grid>
            </Grid>

            <div style={{ height: "600px" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyBt2tNTwamNhSga0Mj97Fuuy_5mCvfWpcM",
                }}
                defaultCenter={center}
                defaultZoom={zoom}
              >
                <Marker lat={cat.lat} lng={cat.lng} color="primary" />
              </GoogleMapReact>
            </div>
          </Stack>
        </Box>
      </Card> */}

      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 200, p: 2 }}
          image={logoimage}
        />
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5" sx={{ color: blue[700] }}>
              {cat.displayName}
            </Typography>
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
              <b> Location:</b> {cat.location}
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
                  {cat && cat.features ? (
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
              {cat && cat.location ? cat.location : 0}
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
          </Box>
        </Box>
      </Card>

      <div style={{ height: "50vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBt2tNTwamNhSga0Mj97Fuuy_5mCvfWpcM",
          }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker lat={cat.lat} lng={cat.lng} color="primary" />
        </GoogleMapReact>
      </div>

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
                          sx={{ display: uid === data.uid ? "block" : "none" }}
                        >
                          <IconButton
                            onClick={() => handleDeleteComment(data.commentId)}
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
    </div>
  );
}
