import { Send } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Comment from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUp from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import { blue, red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import {
    useNavigate
} from 'react-router-dom';
//name, gender, description, no of likes the cat has, and a profile picture.

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <ExpandMoreIcon {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    height: 24,
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



const options = [
    'Add to Wishlist',
];

export default function Feed(props) {

    React.useEffect(() => {
        getCatComments()
    }, []);

    const navigate = useNavigate();

    //Snackbar 
    const [openSnack, setOpenSnack] = React.useState(false);

    const [values, setValues] = React.useState({
        comment: '',
    })
    const [comments, setComments] = React.useState([]);

    const handleClickSend = (event) => {
        setValues({
            ...values,
            comments: values.comment
        });
        setCatComment().then(() => {
            getCatComments()
        })
    };

    const snackbarAction = (
        <React.Fragment>
            {/* <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button> */}
            {/* <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton> */}
        </React.Fragment>
    );

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    //Card Expansion
    const [expanded, setExpanded] = React.useState(false);
    const [liked, setLike] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const open = Boolean(anchorEl);


    //Handle Menu Items
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        addToWishlist()
        setOpenSnack(true);
    };

    //Handle Like Button Click
    const handleLikeButtonClick = () => {
        const uid = localStorage.getItem('uid');

        if (!isAuthenticated()) {
            alert('Please login to like this cat');
            return;
        }

        if (Array.from(props.data.likedBy).some(id => id === uid)) {
            setLike(false)
            unlikeCat().then(() => {
                props.onLike(false)
            })
        } else {
            setLike(true)
            likeCat().then(() => {
                props.onLike(true)
            })
        }
    };

    const handleViewClick = () => {
        navigate(`/cat/${props.data.cid}/preview`)
    }


    const handleClose = () => {
        setAnchorEl(null);
        setOpenSnack(false);
    };

    function isAuthenticated() {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken === null || jwtToken === undefined) {
            return false;
        }
        return true;
    }

    async function likeCat() {

        await fetch(`http://localhost:4000/api/cats/${props.data.cid}/like/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: localStorage.getItem('uid'),
            }),
        })
    }

    async function unlikeCat() {
        await fetch(`http://localhost:4000/api/cats/${props.data.cid}/unlike/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: localStorage.getItem('uid')
            }),
        })
    }

    async function addToWishlist() {
        const uid = localStorage.getItem('uid');
        await fetch(`http://localhost:4000/api/users/${uid}/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wishlist: props.data
            }),
        })
    }


    async function setCatComment() {
        const response = await fetch(`http://localhost:4000/api/cats/${props.data.cid}/comments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: localStorage.getItem('uid'),
                comment: values.comment
            }),
        })
        console.log(response)
    }

    async function getCatComments() {
        const response = await fetch(`http://localhost:4000/api/cats/${props.data.cid}/comments/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        setComments(data)
    }


    return (
        <div>

            <Card sx={{ maxWidth: '100vw', m: 1, boxShadow: 2, borderRadius: '0.5em' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }}>
                            <img src={props.data.photoURL} />
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={handleClickListItem}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.data.displayName}
                    subheader={props.data.updatedAt}
                />
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'lock-button',
                        role: 'listbox',
                    }}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
                <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{
                        wordWrap: 'break-word',
                    }}>
                        {props.data.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button onClick={handleLikeButtonClick} sx={{ color: liked ? blue[700] : blue[700] }}>
                        {/* <Button onClick={handleLikeButtonClick} sx={{ color: blue[700] }}> */}
                        <ThumbUp sx={{ mr: 1 }} />
                        {props.data.likedBy.length} {props.data.likedBy.length === 1 ? 'like' : 'likes'}
                    </Button>

                    <Button
                        onClick={handleExpandClick}>
                        <Comment sx={{ mr: 1 }} />
                        Comments
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                        >
                            <ExpandMoreIcon sx={{ color: blue[700] }} />
                        </ExpandMore>
                    </Button>

                    <Button sx={{ ml: 'auto' }} onClick={handleViewClick}>
                        <VisibilityIcon sx={{ mr: 1 }} />
                        View
                    </Button>

                </CardActions>
                <Divider />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            Comments:
                        </Typography>

                        {Array.from(comments).map((comment, index) => (
                            <Typography paragraph key={index}>
                                {JSON.stringify(comment)}
                            </Typography>
                        ))}

                        <Grid component="form">
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="send-comment">Comment</InputLabel>
                                <OutlinedInput
                                    id="send-comment"
                                    onChange={handleChange('comment')}
                                    value={values.comment}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
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
            </Card >

            <Snackbar
                open={openSnack}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Added to Wishlist"
                action={snackbarAction}
            />
        </div>

    )
}