import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import {ChatView} from "../organisms/chat-view";
import {OnlineUserView} from "../organisms/online-user-view";
import {IMessageTypeResponse} from "../atoms/message/chat.message.enum";
import {Client, IMessage} from "@stomp/stompjs";
import {IChatMessageResponse} from "../atoms/message/chat.message.interface";
import {RootStateOrAny, useSelector} from "react-redux";

const style = require("./style/style.module.css");

export const PublicChatTemplate: FunctionComponent<any> = () => {

    const MESSAGE_LOG_LIMIT = 50;

    const user = useSelector((state: RootStateOrAny) => state.activeUser);
    const client = useRef(new Client());
    const [connectedUsers, setConnectedUsers] = useState<Map<string, string>>(new Map());
    const [messageLog, setMessageLog] = useState<IChatMessageResponse[]>([]);

    const addMessage: Function = (message: IChatMessageResponse) => {
        setMessageLog((state: IChatMessageResponse[]) => state.concat(message));
    }

    const disconnectClient = () => {
        client.current.deactivate();
    };
    const moveScrollBarToShowNewMessage = () => {
        let chatRegion = document.querySelector('#chat-region');
        if (chatRegion) {
            chatRegion.scrollTop = chatRegion.scrollHeight - chatRegion.clientHeight;
        }
    };

    const removeUserFromConnectedUsers = (userId: string): void => {
        if (connectedUsers.has(userId)) {
            connectedUsers.delete(userId);
            setConnectedUsers(new Map(connectedUsers));
        }
    }

    useEffect(() => {
        client.current.configure({
            // TODO: Update this to be base path rather than hard-coded "localhost"
            brokerURL: 'ws://localhost:8080/chat-app',
            onConnect: () => {
                client.current.subscribe('/topic/chat', (message: IMessage) => {
                    let response = JSON.parse(message.body);
                    addMessage(response.chatMessage);
                    moveScrollBarToShowNewMessage();
                });

                client.current.subscribe('/topic/chat/newUser', (message: IMessage) => {
                    let response = JSON.parse(message.body);
                    addMessage(response.chatMessage);
                    setConnectedUsers(response.connectedUsers);
                    moveScrollBarToShowNewMessage();
                });

                client.current.subscribe('/topic/chat/userDisconnected', (message: IMessage) => {
                    let response: IChatMessageResponse = JSON.parse(message.body);
                    addMessage(response);
                    removeUserFromConnectedUsers(response.sender.userId);
                    console.log("user disconnected: " + response.sender.username);
                    moveScrollBarToShowNewMessage();
                });

                client.current.publish({
                    destination: '/app/chat.newUser', body:
                        JSON.stringify({
                            'type': IMessageTypeResponse.CHAT,
                            'sender': {"username": user.username},
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

    useEffect(() => {
        if (messageLog.length > MESSAGE_LOG_LIMIT) {
            let messageLogWithoutFirst = [...messageLog];
            messageLogWithoutFirst.splice(0, 1);
            setMessageLog(messageLogWithoutFirst);
        }
    }, [messageLog])

    return (
        <div className={style["position-container"]}>
            <ChatView client={client} disconnectClient={disconnectClient} messageLog={messageLog}/>
            <OnlineUserView userList={Object.values(connectedUsers)}/>
        </div>
    )
}
