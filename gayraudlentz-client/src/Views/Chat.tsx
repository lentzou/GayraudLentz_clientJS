import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
// @ts-ignore
import { MessageList, Message, MessageText } from "@livechat/ui-kit";
import { useAuth } from "../Context/auth";
import { getMyInfos, userInfos } from '../API/user';
// @ts-ignore
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import useForceUpdate from 'use-force-update';


const io = require("socket.io-client");
const ioClient = io.connect("http://localhost:8000");
ioClient.emit('room', "videoGames");

interface chatMessage {
    username: string,
    message: string,
    isOwn: boolean
}

function Chat() {
    const [sendMessage, setSendMessage] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<chatMessage[]>([{ message: "Welcome to LeZoo General chat ! ", username: "Admin", isOwn: false }]);
    const [chatMessagesVideoGames, setChatMessagesVideoGames] = useState<chatMessage[]>([{ message: "Welcome to LeZoo Video Games chat ! ", username: "Admin", isOwn: false }]);
    const [chatMessagesMovies, setChatMessagesMovies] = useState<chatMessage[]>([{ message: "Welcome to LeZoo Movies chat ! ", username: "Admin", isOwn: false }]);
    const { authTokens } = useAuth();
    const [userInfos, setUsersInfos] = useState<userInfos>();
    const [room, setRoom] = useState("general");

    useEffect(() => {
        // @ts-ignore
        ioClient.on('generalMessage', ({ message, username }) => {
            _appendMessageToChat(message, username, false, "general");
        });
        // @ts-ignore
        ioClient.on('roomMessage', ({ message, username, room }) => {
            if (userInfos) {
                // @ts-ignore
                _appendMessageToChat(message, username, userInfos.user.username === username, room);
            }
        });
    }, [_appendMessageToChat]);


    function _appendMessageToChat(message: string, username: string, isOwn: boolean, room: string) {
        let tmp: chatMessage[]
        if (room === "general") {
            tmp = chatMessages.concat({ message, username, isOwn });
            setChatMessages(tmp);
        } else if (room === "videoGames") {
            tmp = chatMessagesVideoGames.concat({ message, username, isOwn });
            setChatMessagesVideoGames(tmp);
        } else if (room === "movies") {
            tmp = chatMessagesMovies.concat({ message, username, isOwn });
            setChatMessagesMovies(tmp);
        }
    }

    function _sendToServer(room: string) {
        if (userInfos) {
            if (room === "general") {
                _appendMessageToChat(sendMessage, userInfos.user.username, true, "general");
                ioClient.emit('generalMessage', {
                    message: sendMessage,
                    id: userInfos.user.id,
                    username: userInfos.user.username
                });
            } else {
                ioClient.emit('roomMessage', {
                    message: sendMessage,
                    id: userInfos.user.id,
                    username: userInfos.user.username,
                    room: room
                });
            }
        }
    }

    if (!userInfos)
        getMyInfos(authTokens).then((infos) => {
            setUsersInfos(infos);
        });

    return (
        <div>
            <SideNav
                onSelect={(selected: string) => {
                    console.log(selected)
                    setRoom(selected);
                    console.log(room)
                }}
                style={{ width: '90px' }}
            >
                <SideNav.Nav defaultSelected="general" expanded>
                    <NavItem eventKey="general">
                        <NavText style={{ fontSize: '11px', paddingLeft: '10px' }}>
                            General
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="videoGames">
                        <NavText style={{ fontSize: '11px', paddingLeft: '10px' }}>
                            VideoGames
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="movies">
                        <NavText style={{ fontSize: '11px', paddingLeft: '10px' }}>
                            Movies
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <div style={{ maxWidth: '100%', height: '90vh', paddingLeft: '90px' }}>
                <MessageList active>
                    {room === "general" && chatMessages.length > 0 && chatMessages.map(msg => {
                        return (
                            <Message authorName={msg.username} isOwn={msg.isOwn}>
                                <MessageText>{msg.message}</MessageText>
                            </Message>
                        );
                    })}
                    {room === "videoGames" && chatMessagesVideoGames.length > 0 && chatMessagesVideoGames.map(msg => {
                        return (
                            <Message authorName={msg.username} isOwn={msg.isOwn}>
                                <MessageText>{msg.message}</MessageText>
                            </Message>
                        );
                    })}
                    {room === "movies" && chatMessagesMovies.length > 0 && chatMessagesMovies.map(msg => {
                        return (
                            <Message authorName={msg.username} isOwn={msg.isOwn}>
                                <MessageText>{msg.message}</MessageText>
                            </Message>
                        );
                    })}
                </MessageList>
            </div>
            <Grid container direction="row" justify="center" alignItems="center">
                <TextField style={{ width: '70%' }} label="Enter your message" type="message"
                    name="message" autoComplete="message"
                    margin="normal" variant="outlined" value={sendMessage}
                    onChange={(event) => setSendMessage(event.target.value)}
                />
                <div style={{ margin: 20 }} />
                <Button size="large" variant="contained" color="primary" onClick={() => {
                    _sendToServer(room);
                    setSendMessage("");
                }}>Send</Button>
            </Grid>
        </div>
    );
}

export default Chat;
