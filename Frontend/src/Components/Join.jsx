import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Join.css'; 
import io from "socket.io-client"
import { useState } from 'react';

// const SOCKET_SERVER = "http://localhost:3000"
// const socket = io(SOCKET_SERVER, {
//     withCredentials: true
// })

function Join() {
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    
    function connect(e){
        e.preventDefault();
        sessionStorage.setItem("username", user)
        navigate("/chats")
    }

  return (
    <div className="form-container">
      <h2>Chit Chat</h2>
      <form onSubmit = {connect}>
        <div className="form-group">
          <input onChange={(e)=>setUser(e.target.value)}
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <button
          type="submit" 
          className="join-button">Join</button>
        </div>
      </form>
    </div>
  );
}

export default Join;
