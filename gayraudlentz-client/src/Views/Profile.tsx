import React, {useState} from "react";
import {Grid, Button, TextField} from "@material-ui/core";
import {getMyInfos, patchMyInfos, userInfos} from '../API/user';
import {useAuth} from "../Context/auth";

interface IProps {
    history: any
}

function Profile(props: IProps) {

    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [userInfos, setUsersInfos] = useState<userInfos>();
    const { authTokens } = useAuth();

    if (!userInfos)
        getMyInfos(authTokens).then((infos) => {
            setUsersInfos(infos);
            setUsername(infos.user.username);
            setDescription(infos.user.description);
        });

    function _handleSubmit() {
        patchMyInfos(authTokens, username, description).then((user) => {
            props.history.push('/home');
        })
    }

    return (
        <Grid container style={{height: "100%"}} direction="column" justify="center" alignItems="center">
            <div>
            <p>Username</p>
            <TextField value={username} name="username"
                       margin="normal" variant="outlined"
                       onChange={(event: any) => setUsername(event.target.value)}
            />
            </div>
            <div>
            <p>Description</p>
            <TextField value={description} name="desc"
                       margin="normal" variant="outlined" multiline={true} rows={10}
                       onChange={(event: any) => setDescription(event.target.value)}
            />
            </div>
            <div style={{margin: 20}}/>
            <Button size="large" variant="contained" color="primary" onClick={() =>_handleSubmit()}>Submit</Button>
        </Grid>
    )
}

export default Profile;
