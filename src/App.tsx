import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import './App.css';
import Login from './pages/login/Login';
import Header from "./components/header/Header";
import { lazy, useEffect, Suspense } from "react";
import { useAuth } from "./context/AuthContext";
import Footer from "./components/footer/Footer";
import Fixture from "./pages/fixture/Fixture";
import AltaJugador from "./pages/alta-jugador/AltaJugador";
import Perfil from "./pages/perfil/Perfil";
import Nota from "./pages/nota/Nota";
import ControlNotas from "./pages/control_notas/ControlNotas";
import Noticas from "./pages/noticias/Noticas";

function App() {
  const usuario = localStorage.getItem('usuario')
  console.log(usuario)

  const Home = lazy(()=>import('./pages/home/Home'));
  const CrearNota = lazy(()=>import('./pages/editor/CrearNota'));

  return (
    <>
    <div className="app">
      <Suspense fallback={<div>Cargando...</div>}>
        <Router>
          <Header/>
          <KeyComboListener />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/fixture" element={<Fixture />} />
            <Route path="/alta-jugador" element={<AltaJugador />} />
            <Route path="/perfil/:nombre" element={<Perfil />} />
            <Route path="/nota/:id/:titulo" element={<Nota />} />
            <Route path="/editor" element={<CrearNota />} />
            <Route path="/nota" element={<Nota />} />
            <Route path="/control-notas" element={<ControlNotas />} />
            <Route path="/noticias" element={<Noticas />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </Suspense>
      <Footer></Footer>
    </div>
    </>

  )
}

function KeyComboListener() {
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuario')
  const { signOut } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') && !usuario) {
        navigate('/admin');
      }
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') && usuario) {
        signOut();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

export default App
