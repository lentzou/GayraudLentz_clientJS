import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";

const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:8000");

ioClient.on('newConnection', function(message: string) {    
    alert('Le serveur a un message pour vous : ' + message);        
});

ioClient.emit('pseudo', "pseudo a renseigner");   

ioClient.on('generalMessage', function(message: string) {    
    alert('Quelqun a dit : ' + message);        
});

interface IProps {

}

function Chat(props: IProps) {
    const [message, setMessage] = useState("");

    function _sendToServer() {    
        ioClient.emit('generalMessage', message);    
    }    

    return (
        <Grid container style={{height: "100%"}} direction="column" justify="center" alignItems="center">
            <TextField label="Enter your message" type="message"
                       name="message" autoComplete="message"
                       margin="normal" variant="outlined"    
                       onChange={(event) => setMessage(event.target.value)}                                      

            />
            <div style={{margin: 20}}/>
            <Button size="large" variant="contained" color="primary" onClick={() =>_sendToServer()}>Send</Button>            
        </Grid>
    );    
}

export default Chat;
