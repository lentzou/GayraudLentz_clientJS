import React from "react";
import {Link} from "react-router-dom";
import {Grid} from "@material-ui/core";

interface IProps {

}

function Home(props: IProps) {

    return (
        <Grid container style={{height: "100%"}} direction="column" justify="center" alignItems="center">
            <Link style={{color: 'black'}} to="/chat">Go to chat</Link>
            <Link style={{color: 'black'}} to="/profile">Go to profile</Link>
        </Grid>
    );
}

export default Home;
