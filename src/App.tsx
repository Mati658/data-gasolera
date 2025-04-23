import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Header from "./components/header/Header";

function App() {

  return (
    <>
      <Header></Header>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
