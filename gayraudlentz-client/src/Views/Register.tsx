import Button from '@material-ui/core/Button';
import { Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import { register, error } from "../API/auth";
import React from 'react';
import { withRouter } from 'react-router-dom';

interface IProps {
    history: any
}

function Register(props: IProps) {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState();

    function _handleSubmit() {
        register(mail, password, username).then(data => {
            setError(data.errors);
            if (!data.errors) {
                props.history.push('/');
            }
        });
    }

    return (
        <Grid container style={{height: "100%"}} direction="column" justify="center" alignItems="center">
            <TextField label="Email" type="email"
                       name="email" autoComplete="email"
                       margin="normal" variant="outlined"
                       onChange={(event) => setMail(event.target.value)}
            />
            <TextField label="Password" type="password"
                       name="password" margin="normal" variant="outlined"
                       onChange={(event) => setPassword(event.target.value)}
            />
            <TextField label="Username" type="text"
                       name="username" margin="normal" variant="outlined"
                       onChange={(event) => setUsername(event.target.value)}
            />
            <div style={{margin: 20}}/>
            <Button size="large" variant="contained" color="primary" onClick={() =>_handleSubmit()}>Submit</Button>
            {error && error.map((err: error) => { return (<p key={err.param} style={{color: 'red'}}>{err.msg} {err.param}</p>)})}
        </Grid>
    );
}

export default withRouter(Register);
