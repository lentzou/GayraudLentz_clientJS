import React, {useEffect, useState} from "react";
import { Grid, TextField, Button } from "@material-ui/core";
// @ts-ignore
import { MessageList, Message, MessageText } from "@livechat/ui-kit";
import {useAuth} from "../Context/auth";
import {getMyInfos, userInfos} from '../API/user';

const io = require("socket.io-client");
const ioClient = io.connect("http://localhost:8000");

interface chatMessage {
    username: string,
    message: string,
    isOwn: boolean
}

function Chat() {
    const [sendMessage, setSendMessage] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<chatMessage[]>([{message: "Welcome on LeZoo ! ", username: "Admin", isOwn: false}]);
    const { authTokens } = useAuth();
    const [userInfos, setUsersInfos] = useState<userInfos>();

    useEffect(() => {
        // @ts-ignore
        ioClient.on('generalMessage', ({message, username}) => {
            _appendMessageToChat(message, username, false);
        });
    }, [_appendMessageToChat]);


    function _appendMessageToChat(message: string, username: string, isOwn: boolean) {
        let tmp: chatMessage[] = chatMessages.concat({message, username, isOwn});
        setChatMessages(tmp);
    }

    function _sendToServer() {
        if (userInfos) {
            _appendMessageToChat(sendMessage, userInfos.user.username, true);
            ioClient.emit('generalMessage', {
                message: sendMessage,
                id: userInfos.user.id,
                username: userInfos.user.username
            });
        }
    }

    if (!userInfos)
        getMyInfos(authTokens).then((infos) => {
            setUsersInfos(infos);
        });

    return (
        <div>
            <div style={{ maxWidth: '100%', height: '90vh' }}>
                <MessageList active>
                    {chatMessages.length > 0 && chatMessages.map(msg => {
                        return (
                            <Message authorName={msg.username} isOwn={msg.isOwn}>
                                <MessageText>{msg.message}</MessageText>
                            </Message>
                        );
                    })}
                </MessageList>
            </div>
            <Grid container direction="row" justify="center" alignItems="center">
                <TextField style={{width: '70%'}} label="Enter your message" type="message"
                           name="message" autoComplete="message"
                           margin="normal" variant="outlined" value={sendMessage}
                           onChange={(event) => setSendMessage(event.target.value)}
                />
                <div style={{margin: 20}}/>
                <Button size="large" variant="contained" color="primary" onClick={() => {
                    _sendToServer();
                    setSendMessage("");
                }}>Send</Button>
            </Grid>
        </div>
    );
}

export default Chat;
