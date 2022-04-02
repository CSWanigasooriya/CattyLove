import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import { blue, grey, red } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import {
    useNavigate
} from 'react-router-dom';
import loginimage from "../../assets/images/login_image.png";
import logoimage from "../../assets/images/logo.png";
import './Auth.css';


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
            navigate('/home');
        }
    };

    return (
        <Grid container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            style={{ backgroundColor: blue[700], minHeight: '100vh' }}>

            <Card
                sx={{ borderRadius: '1em' }} component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <Grid container spacing={0} >
                    <Grid item xs={6}>
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

                        <CardContent>
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

                            <Button
                                style={{ borderRadius: '2em', marginTop: '1em' }}
                                type="submit"
                                fullWidth
                                variant="contained"
                            >
                                Sign In
                            </Button>

                        </CardContent>

                        <CardActions sx={{ m: 1 }}>
                            <Typography variant="caption">
                                Create Account
                            </Typography>
                            <Typography variant="caption" sx={{ color: red[500] }}>
                                Forgot Password?
                            </Typography>
                        </CardActions>
                    </Grid>

                    <Grid item xs={6} style={{ backgroundColor: blue[100] }} container
                        spacing={0}
                        alignItems="center"
                        justifyContent="center">
                        <img src={loginimage} style={{ margin: 0 }} />
                    </Grid>
                </Grid>

            </Card >

        </Grid >
    );
}

export default Auth;