import React from "react";
import {IChatMessageResponse} from "./chat.message.interface";

const style = require("./style/style.module.css");

export const ChatMessage = (props: IChatMessageResponse) => {
    return (
        <div className={style["chat-message"]}>
            <span className={style["message-sender"]}> {props.sender.username} </span>
            <span className={style["message-time"]}> {props.time} </span>
            <span className={style["message-content"]}> {props.content} </span>
        </div>
    )
}
