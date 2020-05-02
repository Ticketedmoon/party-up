import React, {useState} from 'react';
import SockJsClient from 'react-stomp';
import {TalkBox} from "react-talk";

export const TestSocket = () => {

    const [clientRef, setClientRef] = useState(null);
    const [clientConnected, setClientConnected] = useState(false);
    const [messages, setMessages] = useState([]);


    const sendMessage = (msg) => {
        clientRef.sendMessage('/topics/all', msg);
    }

    return (
        <div>
            <TalkBox topic="react-websocket-template" currentUserId={5}
                     currentUser={"socket-name!"} messages={messages}
                     onSendMessage={sendMessage} connected={clientConnected}/>

            <SockJsClient url='http://localhost:8080/handler'
                          topics={['/topic/all']}
                          onMessage={(msg, topic) => setMessages(state => ({messages: [...state.messages, msg]}))}
                          ref={(client) => {
                              setClientRef(client)
                          }}
                          onConnect={() => {
                              setClientConnected(true)
                          }}
                          onDisconnect={() => {
                              setClientConnected(false)
                          }}/>
        </div>
    );
}
