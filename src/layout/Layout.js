import { Favorite, Home, Logout } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';
import logoimage from "../assets/images/logo.png";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function Layout(props) {

    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openEl = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenuItemClick = (event) => {
        switch (event.currentTarget.id) {
            case "sign-out":
                // logic to remove the row
                signOut() // contain to item.id passed by `show`
                break;
            default:
                break;
        }
    };

    function handleItemClick(event) {
        switch (event.currentTarget.id) {
            case "home":
                // logic to remove the row
                navigate('/user') // contain to item.id passed by `show`
                break;
            default:
                navigate('/user/wishlist');
                break;
        }
    }

    const handleClose = (event) => {
        setAnchorEl(null);
    };

    function signOut() {
        localStorage.removeItem('uid');
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={openEl}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Catty Love
                    </Typography>

                    <div>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={openEl ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openEl ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={openEl}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            {/* <MenuItem id="profile" onClick={(event) => handleMenuItemClick(event)}>
                                <Avatar /> Profile
                            </MenuItem> */}
                            <MenuItem id="sign-out" onClick={(event) => handleMenuItemClick(event)}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Toolbar>
                        <Avatar sx={{ mr: 2 }} src={logoimage} />
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Catty Love
                        </Typography>
                    </Toolbar>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem button id="home" onClick={(event) => handleItemClick(event)}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button id="wishlist" onClick={(event) => handleItemClick(event)}>
                        <ListItemIcon>
                            <Favorite />
                        </ListItemIcon>
                        <ListItemText primary="Wishlist" />
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Outlet />

            </Main>
        </Box>
        // <Box sx={{ display: 'flex' }}>
        //     <CssBaseline />
        //     <AppBar
        //         position="fixed"
        //         sx={{
        //             width: { sm: `calc(100% - ${drawerWidth}px)` },
        //             ml: { sm: `${drawerWidth}px` },
        //         }}
        //     >
        //         <Toolbar>
        //             <IconButton
        //                 color="inherit"
        //                 aria-label="open drawer"
        //                 edge="start"
        //                 onClick={handleDrawerToggle}
        //                 sx={{ mr: 2 }}
        //             >
        //                 <MenuIcon />
        //             </IconButton>
        //             <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        //                 Dashboard
        //             </Typography>

        //             {/* {auth && ( */}
        //             <div>
        //                 <Tooltip title="Wishlist">

        //                     <IconButton
        //                         onClick={handleWishlist}
        //                         size="large"
        //                         aria-label="account of current user"
        //                         aria-controls="menu-appbar"
        //                         aria-haspopup="true"
        //                         color="inherit"
        //                     >
        //                         <FactCheckIcon />
        //                     </IconButton>

        //                 </Tooltip>
        //                 <IconButton
        //                     size="large"
        //                     aria-label="account of current user"
        //                     aria-controls="menu-appbar"
        //                     aria-haspopup="true"
        //                     onClick={handleMenu}
        //                     color="inherit"
        //                 >
        //                     <AccountCircle />
        //                 </IconButton>
        //                 <Menu
        //                     id="menu-appbar"
        //                     anchorEl={anchorEl}
        //                     anchorOrigin={{
        //                         vertical: 'top',
        //                         horizontal: 'right',
        //                     }}
        //                     keepMounted
        //                     transformOrigin={{
        //                         vertical: 'top',
        //                         horizontal: 'right',
        //                     }}
        //                     open={Boolean(anchorEl)}
        //                 >
        //                     <MenuItem onClick={handleClose}>Sign Out</MenuItem>
        //                 </Menu>
        //             </div>
        //             {/* )} */}
        //         </Toolbar>
        //     </AppBar>
        //     <Box
        //         component="nav"
        //         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        //         aria-label="mailbox folders"
        //     >
        //         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        //         <Drawer
        //             container={container}
        //             variant="temporary"
        //             open={mobileOpen}
        //             onClose={handleDrawerToggle}
        //             ModalProps={{
        //                 keepMounted: true, // Better open performance on mobile.
        //             }}
        //             sx={{
        //                 display: { xs: 'block', sm: 'none' },
        //                 '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        //             }}
        //         >
        //             {drawer}
        //         </Drawer>
        //         <Drawer
        //             variant="permanent"
        //             sx={{
        //                 display: { xs: 'none', sm: 'block' },
        //                 '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        //             }}
        //             open
        //         >
        //             {drawer}
        //         </Drawer>
        //     </Box>
        //     <Box
        //         component="main"
        //         sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        //     >
        //         <Toolbar />

        //         <Outlet />

        //     </Box>

        // </Box >
    )
}
Layout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Layout;