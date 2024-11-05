import Chatbox from './Components/Chatbox'
import Join from './Components/Join'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';




function App() {

  return (
    <>
  <Router>
    <Routes>
      <Route path = "/" element = {<Join />} /> 
      <Route path = "/chats" element = {<Chatbox/>} /> 
    </Routes>
  </Router>
    </>
  )
}

export default App
