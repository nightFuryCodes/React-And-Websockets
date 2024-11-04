// src/Chatbox.jsx
import React, { useState, useEffect } from 'react';
import './Chatbox.css'; // Import CSS for styling
import io from "socket.io-client"



const SOCKET_SERVER = "https://react-and-websockets.onrender.com"
const socket = io(SOCKET_SERVER)

const Chatbox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function updateType(message){
    message.type = "received"
  }


    useEffect(()=>{
      socket.on("server-message", (message)=>{
        console.log(message)
      })

      socket.on("sent", data=>{
        setMessages(prev=>[...prev, data])
      })
      socket.on("received", data=>{
        updateType(data)
        setMessages(prev=>[...prev, data])
      })

      return ()=>{
        socket.disconnect()
      }
    }, [])

    function sendMessage(){
      socket.emit("user-message", message)
      setMessage("")
    }

  return (
  
    <div className="chat-container">
    <div className="chat-header">Chat</div>
    <div className="chat-box">
      {messages.map((item, index) => (
        <div
          key={index}
          className = {`chat-message ${item.type}`}
        >
          {item.message}
        </div>
      ))}
    </div>
    <div className="chat-input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        // onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  </div>
);
};

export default Chatbox;
