import React, {useEffect, useRef} from 'react';
import {Client} from "@stomp/stompjs";

export const TestSocket = () => {

    const client = useRef(new Client());

    useEffect(() => {
        client.current.configure({
            brokerURL: 'ws://localhost:8080/chat-app',
            onConnect: () => {
                console.log('connected!');

                /*
                                this.client.subscribe('/queue/now', message => {
                                    console.log(message);
                                    this.setState({serverTime: message.body});
                                });

                                this.client.subscribe('/topic/greetings', message => {
                                    alert(message.body);
                                });
                */
            },
            // Helps during debugging, remove in production
            debug: (str) => {
                console.log(new Date(), str);
            }
        })

        client.current.activate();
    }, [])

    const clickHandler = () => {
        client.current.publish({destination: '/app/greetings', body: 'Hello world'});
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
