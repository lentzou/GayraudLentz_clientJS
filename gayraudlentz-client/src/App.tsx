import React, {useState} from 'react';
import './App.css';
import Login from "./Views/Login";
import { withCookies } from 'react-cookie';
// @ts-ignore
import { ThemeProvider } from '@livechat/ui-kit';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import { AuthContext } from "./Context/auth";
import PrivateRoute from "./Views/PrivateRoute";
import Chat from "./Views/Chat";
import Register from "./Views/Register";
import Home from "./Views/Home";
import Profile from "./Views/Profile";

interface IProps {
    cookies: any,
}

function App(props: IProps) {

    const [authTokens, setAuthTokens] = useState();

    const setTokens = (data: string) => {
        // save token in Cookies with react-cookies
        props.cookies.set('token', data, '/');
        setAuthTokens(data);
    };

    return (
        <ThemeProvider>
        <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
            <Router>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute path="/chat" component={Chat} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/home" component={Home} />
            </Router>
        </AuthContext.Provider>
        </ThemeProvider>
    );
}

export default withCookies(App);
