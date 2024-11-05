// src/Chatbox.jsx
import React, { useState, useEffect } from 'react';
import './Chatbox.css'; // Import CSS for styling
import io from "socket.io-client"
import { useNavigate } from 'react-router-dom';



const SOCKET_SERVER = "http://localhost:3000"
const socket = io(SOCKET_SERVER, {
  withCredentials: true
})

const Chatbox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [welcome, setWelcome] = useState([])
  const user = "ashwin"
  const navigate = useNavigate()


  function updateType(message){
    message.type = "received"
  }


    useEffect(()=>{
      if (user){
      socket.emit("new-user", user)

      socket.on("user-connected", (message)=>{
        setMessages(prev=>[...prev, message])
      })

      socket.on("sent", data=>{
        setMessages(prev=>[...prev, data])
      })
      socket.on("received", data=>{
        updateType(data)
        setMessages(prev=>[...prev, data])
      })
    }
      else{
        navigate("/")
      }

      return ()=>{
        socket.disconnect()
      }
    }, [])

    function sendMessage(){
      socket.emit("user-message", {message})
      setMessage("") 
    }

  return (
<>

    <div className="chat-container">
    <div className="chat-header">Chat</div>
    <div className="chat-box">
      {messages.map((item, index) => (

        <div
          key={index}
          className = {`chat-message ${item.type}`}
        >
          {`${item.name}: ${item.message}`}
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
  </>
);
};

export default Chatbox;
