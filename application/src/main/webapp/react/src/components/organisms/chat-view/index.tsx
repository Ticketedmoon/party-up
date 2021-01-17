import React, {FunctionComponent, RefObject, useState} from "react";
import {Button} from "@material-ui/core";
import history from "../../../utils/history/history";
import {ChatMessage} from "../../atoms/message";
import {IMessageTypeResponse} from "../../atoms/message/chat.message.enum"
import {IChatMessageResponse} from "../../atoms/message/chat.message.interface";
import {RootStateOrAny, useSelector} from "react-redux";

const style = require("./style/style.module.css");

interface Props {
    messageLog: IChatMessageResponse[],
    client: RefObject<any>
    disconnectClient: Function
}

export const ChatView: FunctionComponent<Props> = ({client, messageLog, disconnectClient}: Props) => {

    const [currentMessage, setCurrentMessage] = useState('');
    const user = useSelector((state: RootStateOrAny) => state.activeUser);

    const resetMessageBox: Function = () => {
        setCurrentMessage('');
    }

    const sendChatMessage = () => {
        try {
            if (currentMessage.length > 0) {
                resetMessageBox();
                client.current.publish({
                    destination: '/app/chat.send',
                    body: JSON.stringify({
                        'type': IMessageTypeResponse.CHAT,
                        'content': currentMessage,
                        'sender': {"username": user.username},
                        'time': new Date()
                    })
                })
            }
        } catch (err) {
            // TODO: Replace with snackbar notification or modal.
            console.log(err);
        }
    }

    const keyPress = (event: React.KeyboardEvent) => {
        if (event.key == "Enter") {
            sendChatMessage();
        }
    };

    return (
        <div className={style["chat-view-container"]}>
            <div className={style["chat-box"]}>
                <div id={"chat-region"} className={style["chat-region"]}>
                    {
                        messageLog.map((message: IChatMessageResponse, index: number) => {
                            return <ChatMessage type={IMessageTypeResponse.CHAT}
                                                content={message.content}
                                                sender={message.sender}
                                                time={message.time}
                                                key={"message-" + index}
                            />
                        })
                    }
                </div>
                <div className={style["message-box-container"]}>
                    <input className={style["message-box"]} type={"text"} placeholder={"Enter a message"}
                           onChange={(e) => setCurrentMessage(e.target.value)}
                           onKeyPress={(e: React.KeyboardEvent) => keyPress(e)}
                           value={currentMessage}/>
                </div>
            </div>
            <div className={style["footer"]}>
                <Button color="primary" variant="contained" className={style["button-return"]}
                        onClick={() => {
                            disconnectClient();
                            history.goBack();
                        }}> Return to Game Modes </Button>
            </div>
        </div>
    )
}
