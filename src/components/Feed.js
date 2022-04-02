import Comment from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUp from '@mui/icons-material/ThumbUp';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import { blue, red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
//name, gender, description, no of likes the cat has, and a profile picture.

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const options = [
    'Add to Wishlist',
];

export default function Feed(props) {

    React.useEffect(() => {

    }, []);

    const [expanded, setExpanded] = React.useState(false);
    const [liked, setLike] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const open = Boolean(anchorEl);


    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleLikeButtonClick = () => {
        const uid = localStorage.getItem('uid');

        if (!isAuthenticated()) {
            alert('Please login to like this cat');
        } else if (props.data.likedBy.length > 0) {
            Array.from(props.data.likedBy).map(id => {
                if (id === uid) {
                    setLike(false)
                    dislikeCat()
                    window.location.reload();
                    return;
                } else {
                    setLike(true)
                    likeCat()
                    window.location.reload();
                    return;
                }
            })
        } else {
            setLike(true)
            likeCat();
            window.location.reload();
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function isAuthenticated() {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken === null || jwtToken === undefined) {
            return false;
        }
        return true;
    }

    async function likeCat() {

        const response = await fetch(`http://localhost:4000/api/cats/${props.data.cid}/like/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: localStorage.getItem('uid'),
            }),
        })
    }

    async function dislikeCat() {
        const response = await fetch(`http://localhost:4000/api/cats/${props.data.cid}/unlike/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: localStorage.getItem('uid')
            }),
        })
    }


    return (
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
                <Typography variant="body2" color="text.secondary">
                    {props.data.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {/* <Button onClick={handleLikeButtonClick} sx={{ color: liked ? blue[500] : blue[200] }}> */}
                <Button onClick={handleLikeButtonClick} sx={{ color: blue[700] }}>
                    <ThumbUp sx={{ mr: 1 }} />
                    {props.data.likedBy.length} {props.data.likedBy.length === 1 ? 'like' : 'likes'}
                </Button>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >

                </ExpandMore>

                <Button
                    onClick={handleExpandClick}>
                    <Comment sx={{ mr: 1 }} />
                    Comments
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        Comments
                    </Typography>
                </CardContent>
            </Collapse>
        </Card >
    )
}