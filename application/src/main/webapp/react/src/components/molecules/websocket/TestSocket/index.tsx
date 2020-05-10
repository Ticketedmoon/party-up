import React, {useEffect, useRef, useState} from 'react';
import {Client} from "@stomp/stompjs";
import {RootStateOrAny, useSelector} from "react-redux";

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

export const TestSocket = () => {

    const user = useSelector((state: RootStateOrAny) => state.activeUser);
    const [messages, setMessages] = useState<IChatMessageResponse[]>([]);
    const client = useRef(new Client());

    const addMessage: Function = (message: IChatMessageResponse) => {
        setMessages((state: IChatMessageResponse[]) => [...state, message])
    };

    useEffect(() => {
        client.current.configure({
            brokerURL: 'ws://localhost:8080/chat-app',
            onConnect: () => {
                console.log('connected!');
                client.current.subscribe('/topic/public', message => {
                    addMessage(message)
                });

                client.current.subscribe('/topic/queue', message => {
                    alert(message.body);
                });
            },
            // Helps during debugging, remove in production
            debug: (str) => {
                console.log(new Date(), str);
            }
        })

        client.current.activate();
    }, [])

    const clickHandler = () => {
        console.log(messages);
        try {
            client.current.publish({
                destination: '/app/chat.send', body:
                    JSON.stringify({
                        'type': IMessageTypeResponse.CHAT,
                        'content': 'Hello world',
                        'sender': "test",//user.username,
                        'time': new Date()
                    })
            });
        } catch (err) {
            // TODO: Replace with snackbar notification or modal.
            console.log(err);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <p>
                    <button onClick={clickHandler}> Click me</button>
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}
