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
import PlantelPage from "./pages/plantel/PlantelPage";
import Loader from "./components/loader/Loader";
import Historial from "./pages/historial/Historial";
import QuienesSomos from "./pages/quienes_somos/QuienesSomos";
import Equipo from "./pages/equipo/Equipo";
// import LoaderInit from "./components/loader_init/LoaderInit";
// import { useLoader } from "./context/LoaderContext";

function App() {
  // const usuario = localStorage.getItem('usuario')
  // console.log(usuario)

  const Home = lazy(()=>import('./pages/home/Home'));
  const CrearNota = lazy(()=>import('./pages/editor/CrearNota'));

  useEffect(()=>{
    const root = document.documentElement;

    if (localStorage.getItem('theme') == null) { 
      localStorage.setItem('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? '1' : '')
    }

    if (Boolean(localStorage.getItem('theme'))) { 
      root.style.setProperty('--bg-color', getComputedStyle(root).getPropertyValue('--bg-color-dk'));
      root.style.setProperty('--bg-filtro', getComputedStyle(root).getPropertyValue('--bg-filtro-dk'));
      root.style.setProperty('--bg-color-loader', getComputedStyle(root).getPropertyValue('--bg-color-loader-dk'));
      root.style.setProperty('--pulse-loader', getComputedStyle(root).getPropertyValue('--pulse-loader-dk'));
      root.style.setProperty('--text-color', getComputedStyle(root).getPropertyValue('--text-color-dk'));
      root.style.setProperty('--text-effect', getComputedStyle(root).getPropertyValue('--text-bg-effect-dk'));
      root.style.setProperty('--text-color-videos', getComputedStyle(root).getPropertyValue('--text-color-videos-dk'));
      root.style.setProperty('--bg-video', getComputedStyle(root).getPropertyValue('--bg-video-dk'));
      root.style.setProperty('--text-th', getComputedStyle(root).getPropertyValue('--text-th-dk'));
      root.style.setProperty('--bg-fila-liga', getComputedStyle(root).getPropertyValue('--bg-fila-dk-dk'));
      root.style.setProperty('--bg-fila-liga2', getComputedStyle(root).getPropertyValue('--bg-fila-dk-lt'));
      root.style.setProperty('--bg-temperley-fila', getComputedStyle(root).getPropertyValue('--bg-temperley-dk'));
      root.style.setProperty('--pj-icon-cancha', getComputedStyle(root).getPropertyValue('--pj-icon-cancha-dk'));
    }
  },[])

  return (
    <>
    <div className="app">
      {/* <LoaderInit></LoaderInit> */}
      <Suspense fallback={<></>}>
        <Router>
          <Loader></Loader>
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
            <Route path="/control-notas" element={<ControlNotas />} />
            <Route path="/noticias" element={<Noticas />} />
            <Route path="/plantel" element={<PlantelPage />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/historial/:equipo" element={<Equipo />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />

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
