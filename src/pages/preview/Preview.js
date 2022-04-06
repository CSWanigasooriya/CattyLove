import { Delete, Send } from "@mui/icons-material";
import Comment from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PetsIcon from "@mui/icons-material/Pets"; // name, age, gender, description, its features, contact number and an enlarged photo.
import ThumbUp from "@mui/icons-material/ThumbUp";
import {
  Button, Grid, List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import { blue, red } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import GoogleMapReact from "google-map-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import logoimage from "../../assets/images/logo.png";
//The location of where the cat currently resides should be given using google maps API.

const Marker = ({ color }) => <div>{<PetsIcon color={color} />}</div>;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <ExpandMoreIcon {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  height: 24,
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Preview(props) {
  const uid = localStorage.getItem("uid");
  let { cid } = useParams();

  const [cat, setCat] = React.useState({});

  const [values, setValues] = React.useState({
    comment: "",
  });
  const [comments, setComments] = React.useState([]);

  const handleClickSend = (event) => {
    setValues({
      ...values,
      comments: values.comment,
    });
    setCatComment().then(() => {
      getCatComments();
    });
  };

  useEffect(() => {
    getCatDetails();
    getCatComments();
  }, []);

  async function getCatDetails() {
    const response = await fetch(`http://localhost:4000/api/cats/${cid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setCat(data);
  }

  const center = { lat: 6.9366020011364125, lng: 79.84251072596648 };
  const zoom = 11;

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Card Expansion
  const [expanded, setExpanded] = React.useState(true);
  const [liked, setLike] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //Handle Like Button Click
  const handleLikeButtonClick = () => {
    const uid = localStorage.getItem("uid");

    if (!isAuthenticated()) {
      alert("Please login to like this cat");
      return;
    }

    if (Array.from(props.data.likedBy).some((id) => id === uid)) {
      setLike(false);
      unlikeCat().then(() => {
        props.onLike(false);
      });
    } else {
      setLike(true);
      likeCat().then(() => {
        props.onLike(true);
      });
    }
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId).then(() => {
      getCatComments();
    });
  };

  function isAuthenticated() {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken === null || jwtToken === undefined) {
      return false;
    }
    return true;
  }

  async function likeCat() {
    await fetch(`http://localhost:4000/api/cats/${cid}/like/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: localStorage.getItem("uid"),
      }),
    });
  }

  async function unlikeCat() {
    await fetch(`http://localhost:4000/api/cats/${cid}/unlike/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: localStorage.getItem("uid"),
      }),
    });
  }

  async function setCatComment() {
    const response = await fetch(
      `http://localhost:4000/api/cats/${cid}/comments/`,
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

  async function getCatComments() {
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
  }

  async function deleteComment(commentId) {
    const response = await fetch(
      `http://localhost:4000/api/cats/${cid}/comments/${commentId}`,
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
      <Card
        sx={{ maxWidth: "100vw", m: 1, boxShadow: 2, borderRadius: "0.5em" }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
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
                  Cat Name
                </Typography>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    columnGap: "1em",
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Age: 3
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Gender: Male
                  </Typography>
                </div>

                <LocationOnIcon sx={{ color: blue[700] }} />

                <div>
                  <Button
                    onClick={handleLikeButtonClick}
                    sx={{ color: liked ? blue[700] : blue[700] }}
                  >
                    <ThumbUp sx={{ mr: 1 }} />
                    {JSON.stringify(cat.likedBy)}
                  </Button>
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
                    nowrap={false}
                  >
                    {cat.description}
                  </Typography>
                </div>
              </Grid>
            </Grid>

            <div style={{ height: "600px", width: "100vw" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyBt2tNTwamNhSga0Mj97Fuuy_5mCvfWpcM",
                }}
                defaultCenter={center}
                defaultZoom={zoom}
              >
                <Marker lat={cat.lat} lng={cat.lng} color="secondary" />
              </GoogleMapReact>
            </div>
          </Stack>
        </Box>
      </Card>

      <Divider sx={{ paddingTop: "1em" }} />
      <Button onClick={handleExpandClick}>
        <Comment sx={{ mr: 1 }} />
        Comments
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <ExpandMoreIcon sx={{ color: blue[700] }} />
        </ExpandMore>
      </Button>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comments.length > 0 ? (
            <List>
              {Array.from(comments).map((data, index) => (
                <ListItem key={index}>
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
                      <ListItemText secondary={data.updatedAt}></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
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
                      onMouseDown={handleMouseDownPassword}
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
      </Collapse>
    </div>
  );
}
