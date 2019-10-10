import React, {useState} from "react";
import {login} from "../API/auth";
import {withCookies} from "react-cookie";
import Button from '@material-ui/core/Button';
import {Grid, TextField} from "@material-ui/core";
import { useAuth } from "../Context/auth";
import {Redirect} from "react-router";

interface IProps {
    cookies: any
}

interface IState {
    mail: string,
    password: string,
    token: string,
    error?: string
}

function Login(props: IProps) {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const [token, setToken] = useState(props.cookies.get('token') || "");
    const { setAuthTokens } = useAuth();

    if (token) {
        setAuthTokens(token);
        return <Redirect to="/chat" />;
    }

    function _handleSubmit() {
        login(mail, password).then(data => {
            setToken(data.token);
            setAuthTokens(data.token);
            setError(data.msg);
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
            <div style={{margin: 20}}/>
            <Button size="large" variant="contained" color="primary" onClick={() =>_handleSubmit()}>Submit</Button>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </Grid>
    );
}

export default withCookies(Login);
