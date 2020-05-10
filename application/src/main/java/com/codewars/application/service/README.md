### ADD encoder/decoder to utility module
### Add websocket stuff to websocket module

There are three main ways to say where messages are sent and how they are subscribed to using Spring WebSockets and STOMP:

Topics – common conversations or chat topics open to any client or user
Queues – reserved for specific users and their current sessions
Endpoints – generic endpoints
Now, let's take a quick look at an example context path for each:

“/topic/movies”
“/user/queue/specific-user”
“/secured/chat”
It's important to note that we must use queues to send messages to specific users, as topics and endpoints don't support this functionality.
