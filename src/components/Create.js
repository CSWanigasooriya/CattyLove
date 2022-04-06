import CloseIcon from '@mui/icons-material/Close';
import { Grid, Snackbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initialValues = {
    catId: '',
    catName: '',
    catDescription: '',
    gender: '',
    catImage: '',
    longitude: '',
    latitude: '',
}

export default function Create(props) {

    const [values, setValues] = useState(initialValues)
    const [openSnack, setOpenSnack] = React.useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setCatData(data).then((data) => {
            if (data.status === 200)
                setOpenSnack(true);
        });
    }


    const handleClose = () => {
        setOpenSnack(false);
    };

    async function setCatData(data) {
        const response = await fetch('http://localhost:4000/api/cats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cid: data.get('catId'),
                displayName: data.get('catName'),
                gender: data.get('gender'),
                description: data.get('catDescription'),
                photoUrl: data.get('catImage'),
                location: {
                    lng: data.get('longitude'),
                    lat: data.get('latitude')
                }
            }),
        })

        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    }


    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Create Cat
                        </Typography>
                    </Toolbar>
                </AppBar>


                <Grid container sx={{ p: 2 }} >
                    <Grid item xs={12} component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="catId"
                            type="text"
                            name="catId"
                            label="Cat ID"
                            variant="outlined"
                            value={values.catId}
                            onChange={(event) => setValues({ ...values, catId: event.target.value })}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="text"
                            name="catName"
                            label="Cat Name"
                            value={values.catName}
                            onChange={(event) => setValues({ ...values, catName: event.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="text"
                            name="gender"
                            label="Gender"
                            value={values.gender}
                            onChange={(event) => setValues({ ...values, gender: event.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="text"
                            name="catDescription"
                            label="Cat Description"
                            value={values.catDescription}
                            onChange={(event) => setValues({ ...values, catDescription: event.target.value })}
                        />

                        <Button
                            style={{ borderRadius: '2em', marginTop: '1em' }}
                            type="submit"
                            variant="contained"
                        >
                            Create
                        </Button>

                    </Grid>
                </Grid>


            </Dialog>

            <Snackbar
                open={openSnack}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Cat created successfully"
            />
        </div>
    )
}