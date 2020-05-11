import React, {useEffect, useRef, useState} from "react";
import {Button} from "@material-ui/core";
import history from "../../../utils/history";
import {RootStateOrAny, useSelector} from "react-redux";
import {Client} from "@stomp/stompjs";
import {ChatMessage} from "../../atoms/message";
import {IChatMessageResponse} from "../../atoms/message/chat.message.interface"
import {IMessageTypeResponse} from "../../atoms/message/chat.message.enum"

const style = require("./style/style.module.css");

export const ChatView = () => {

    const MESSAGE_LOG_LIMIT = 50;

    const user = useSelector((state: RootStateOrAny) => state.activeUser);
    const [messageLog, setMessageLog] = useState<IChatMessageResponse[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');

    const client = useRef(new Client());

    const addMessage: Function = (message: IChatMessageResponse) => {
        setMessageLog((state: IChatMessageResponse[]) => state.concat(message));
    };

    const resetMessageBox: Function = () => {
        setCurrentMessage('');
    }

    const moveScrollBarToShowNewMessage = () => {
        let chatRegion = document.querySelector('#chat-region');
        if (chatRegion) {
            chatRegion.scrollTop = chatRegion.scrollHeight - chatRegion.clientHeight;
        }
    }

    const sendChatMessage = () => {
        try {
            if (currentMessage.length > 0) {
                client.current.publish({
                    destination: '/app/chat.send', body:
                        JSON.stringify({
                            'type': IMessageTypeResponse.CHAT,
                            'content': currentMessage,
                            'sender': user.username,
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

    useEffect(() => {
        if (messageLog.length > MESSAGE_LOG_LIMIT) {
            let messageLogWithoutFirst = [...messageLog];
            messageLogWithoutFirst.splice(0, 1);
            setMessageLog(messageLogWithoutFirst);
        }
    }, [messageLog])

    useEffect(() => {
        client.current.configure({
            // TODO: Update this to be base path rather than hard-coded "localhost"
            brokerURL: 'ws://localhost:8080/chat-app',
            onConnect: () => {
                client.current.subscribe('/topic/chat', (message) => {
                    resetMessageBox();
                    addMessage(JSON.parse(message.body));
                    moveScrollBarToShowNewMessage();
                });

                client.current.publish({
                    destination: '/app/chat.newUser', body:
                        JSON.stringify({
                            'type': IMessageTypeResponse.CHAT,
                            'sender': user.username,
                            'time': new Date()
                        })
                })
            },
            // Helps during debugging, remove in production
            debug: (str) => {
                console.log(new Date(), str);
            }
        })

        client.current.activate();
    }, [])

    return (
        <div className={style["chat-view-container"]}>
            <div className={style["chat-box"]}>
                <div id={"chat-region"} className={style["chat-region"]}>
                    {
                        messageLog.map((message) => {
                            return <ChatMessage type={IMessageTypeResponse.CHAT}
                                                content={message.content}
                                                sender={message.sender}
                                                time={message.time}
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
                            client.current.deactivate();
                            history.goBack();
                        }}> Return to Game Modes </Button>
            </div>
        </div>
    )
}
