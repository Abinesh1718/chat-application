import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import dayjs from "dayjs";

// To connect the server in socket

const socket = io("http://127.0.0.1:4000", {
    transports: ['websocket', 'polling'],
    withCredentials: true
});


const Chat = () => {
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState({ msg: "", time: "" });
    const [messages, setMessages] = useState([]);
    const [joined, setJoined] = useState(false);


    useEffect(() => {
        // To get message from socket 
        socket.on('message', (msg) => {
            console.log("Time:", dayjs(msg.time).format('h.mm A'));

            setMessages((prevMessages) => [...prevMessages, msg]);
        });
        // To get error while connection
        socket.on('connect_error', (error) => {
            console.log('Connection Error:', error);
        });

        return () => {
            socket.off('message');
        };
    }, []);




    // To join the room 

    const joinRoom = (e) => {
        e.preventDefault();
        if (room) {
            socket.emit('join room', room);

            setJoined(true);
        }
    };

    // To send the chat
    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('chat message', { room, message });
            setMessage({ msg: "" });
        }
    };

    return (
        <div >
            {!joined ? (
                <form onSubmit={joinRoom}>
                    <input
                        type="text"
                        placeholder="Enter room"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                    />
                    <button type="submit">Join Room</button>
                </form>
            ) : (
                <div>
                    <ul id="messages">
                        {messages.map((msg, index) => (
                            <>
                                <li key={index}>
                                    {msg?.msg} </li><span style={{ display: 'inline' }}>{dayjs(msg?.time).format('h.mm A')}
                                </span>

                                <li />
                            </>
                        ))}
                    </ul>
                    <form onSubmit={sendMessage}>
                        <input
                            id="m"
                            autoComplete="off"
                            value={message?.msg}
                            onChange={(e) => setMessage({ msg: e.target.value, time: new Date() })}
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chat;
