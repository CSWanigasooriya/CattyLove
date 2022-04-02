import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { grey, blue } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import './Auth.css';
import logoimage from "../../assets/images/logo.png";
import loginimage from "../../assets/images/login_image.png"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import {
    useNavigate,
} from 'react-router-dom';


const initialValues = {
    email: '',
    password: ''
}


function Auth() {

    const [values, setValues] = useState(initialValues)

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const repsonse = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password'),
            }),
        })

        const jsonData = await repsonse.json();

        if (jsonData.user) {
            localStorage.setItem('token', jsonData.token);
            navigate('/dashboard');
        }
    };

    return (
        <Grid container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{ backgroundColor: blue[100], minHeight: '100vh' }}>

            <Card sx={{ borderRadius: '1em' }} component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <CardHeader
                    avatar={
                        <img src={logoimage} />
                    }
                    title={
                        <Typography variant="h5" sx={{ color: blue[700] }}>
                            Catty Love
                        </Typography>
                    }
                    subheader={
                        <Typography variant="subtitle2" sx={{ color: grey[500] }}>
                            Get Started with Catty Love
                        </Typography>
                    }
                />
                <CardContent
                >

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        autoComplete="email"
                        value={values.email}
                        onChange={(event) => setValues({ ...values, email: event.target.value })}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        name="password"
                        label="Password"
                        value={values.password}
                        onChange={(event) => setValues({ ...values, password: event.target.value })}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                </CardContent>
                <CardActions>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Sign In
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default Auth;