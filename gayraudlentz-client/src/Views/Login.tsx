import React from "react";
import {login} from "../API/auth";
import {withCookies} from "react-cookie";
import Button from '@material-ui/core/Button';
import {Container, Grid, TextField} from "@material-ui/core";

interface IProps {
    cookies: any
}

interface IState {
    mail: string,
    password: string,
    token: string,
    error?: string
}

class Login extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            mail: "",
            password: "",
            token: props.cookies.get('token') || ""
        }
    }

    _handleSubmit = () => {
        login(this.state.mail, this.state.password).then((data) => {
            this.setState({token: data.token, error: data.msg});
            // save token in Cookies with react-cookies
            this.props.cookies.set('token', data.token, '/');
        });
    };

    _handleChange = (value: string, field: string) => {
        this.setState(prev => ({
            ...prev,
            [field]: value
            })
        );
    };

    render()  {
        return (
            <Grid container style={{height: "100%"}} direction="column" justify="center" alignItems="center">
                <TextField label="Email" type="email"
                    name="email" autoComplete="email"
                    margin="normal" variant="outlined"
                    onChange={(event) => {this._handleChange(event.target.value, "mail")}}
                />
                <TextField label="Password" type="password"
                    name="password" margin="normal" variant="outlined"
                    onChange={(event) => {this._handleChange(event.target.value, "password")}}
                />
                {this.state.error && <p>{this.state.error}</p>}
                <div style={{margin: 20}}/>
                <Button size="large" variant="contained" color="primary" onClick={() => this._handleSubmit()}>Submit</Button>
            </Grid>
        )
    }
}

export default withCookies(Login);
