import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Header from "./components/header/Header";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Footer from "./components/footer/Footer";

function App() {
  const { usuario } = useAuth();

  console.log(usuario)

  return (
    <>
      <Header/>

      <Router>
        <KeyComboListener />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Login />} />
        </Routes>
      </Router>
      <Footer></Footer>

    </>
  )
}

function KeyComboListener() {
  const navigate = useNavigate();
  const { signOut, flagLogin } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') && !flagLogin) {
        navigate('/admin');
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
        signOut();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

export default App
