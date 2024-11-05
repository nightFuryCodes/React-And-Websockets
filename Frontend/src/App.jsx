import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import io from "socket.io-client"
import axios from "axios"
import { useEffect } from 'react'
import Chatbox from './Components/Chatbox'
import Join from './Components/Join'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';




function App() {

  return (
    <>
      <Chatbox />
    </>
  )
}

export default App
