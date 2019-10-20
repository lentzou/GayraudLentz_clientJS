import React from "react";

const
    io = require("socket.io-client"),
    ioClient = io.connect("http://localhost:8000");

ioClient.on("seq-num", (msg: string) => console.info(msg));

interface IProps {

}

function Chat(props: IProps) {
    return <div>test</div>;
}

export default Chat;
