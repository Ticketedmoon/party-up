import React, {useEffect, useRef, useState} from "react";
import {Button} from "@material-ui/core";
import history from "../../../utils/history";
import {RootStateOrAny, useSelector} from "react-redux";
import {Client} from "@stomp/stompjs";

const style = require("./style/style.module.css");

enum IMessageTypeResponse {
    CHAT = "CHAT",
    CONNECT = "CONNECT",
    DISCONNECT = "DISCONNECT"
}

interface IChatMessageResponse {
    type: IMessageTypeResponse,
    content: string,
    sender: string,
    time: string
}

export const ChatView = () => {

    const user = useSelector((state: RootStateOrAny) => state.activeUser);
    const [messageLog, setMessageLog] = useState<IChatMessageResponse[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');

    const client = useRef(new Client());

    useEffect(() => {
        client.current.configure({
            // TODO: Update this to be base path rather than hard-coded "localhost"
            brokerURL: 'ws://localhost:8080/chat-app',
            onConnect: () => {
                console.log('connected!');
                client.current.subscribe('/topic/chat', (message) => {
                    resetMessageBox();
                    addMessage(message);
                });
            },
            // Helps during debugging, remove in production
            debug: (str) => {
                console.log(new Date(), str);
            }
        })

        client.current.activate();
    }, [])

    const addMessage: Function = (message: IChatMessageResponse) => {
        setMessageLog((state: IChatMessageResponse[]) => [...state, message])
    };

    const resetMessageBox: Function = () => {
        setCurrentMessage('');
    }

    const sendChatMessage = () => {
        try {
            client.current.publish({
                destination: '/app/chat.send', body:
                    JSON.stringify({
                        'type': IMessageTypeResponse.CHAT,
                        'content': currentMessage,
                        'sender': "test",//user.username,
                        'time': new Date()
                    })
            });
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
                <div className={style["chat-region"]}>

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
                        onClick={() => history.goBack()}> Return to Game Modes </Button>
            </div>
        </div>
    )
}
