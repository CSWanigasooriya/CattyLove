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
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

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

    const [expanded, setExpanded] = React.useState(false);

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

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [values, setValues] = useState(props)

    return (
        <Card sx={{ maxWidth: '100vw', m: 1, boxShadow: 2 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton onClick={handleClickListItem}
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                title={values.name}
                subheader="September 14, 2016"
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
                    {values.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    {/* <ThumbUp sx={{ color: blue[700] }} /> */}
                    <ThumbUp />
                </IconButton>
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
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Comments
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}