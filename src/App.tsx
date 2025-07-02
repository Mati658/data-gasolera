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

  useEffect(() => {
    const root = document.documentElement;
    const match = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (isDark: boolean) => {
      const theme = isDark ? '1' : '';
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

      root.style.setProperty('--bg-color', getComputedStyle(root).getPropertyValue(`--bg-color-${isDark ? 'dk' : 'lt'}`));
      root.style.setProperty('--bg-filtro', getComputedStyle(root).getPropertyValue(`--bg-filtro-${isDark ? 'dk' : 'lt'}`));
      root.style.setProperty('--bg-color-loader', getComputedStyle(root).getPropertyValue(`--bg-color-loader-${isDark ? 'dk' : 'lt'}`));
      root.style.setProperty('--pulse-loader', getComputedStyle(root).getPropertyValue(`--pulse-loader-${isDark ? 'dk' : 'lt'}`));
      root.style.setProperty('--text-color', getComputedStyle(root).getPropertyValue(`--text-color-${isDark ? 'dk' : 'lt'}`));
      root.style.setProperty('--text-effect', getComputedStyle(root).getPropertyValue(`--text-bg-effect-${isDark ? 'dk' : 'lt'}`));
      root.style.setProperty('--text-color-videos', getComputedStyle(root).getPropertyValue(`--text-color-videos-${isDark ? 'dk' : 'lt'}`));
      root.style.setProperty('--bg-video', getComputedStyle(root).getPropertyValue(`--bg-video-${isDark ? 'dk' : 'lt'}`));
      root.style.setProperty('--text-th', getComputedStyle(root).getPropertyValue(`--text-th-${isDark ? 'dk' : 'lt'}`));
      root.style.setProperty('--bg-fila-liga', getComputedStyle(root).getPropertyValue(`--bg-fila-${isDark ? 'dk-dk' : 'lt-dk'}`));
      root.style.setProperty('--bg-fila-liga2', getComputedStyle(root).getPropertyValue(`--bg-fila-${isDark ? 'dk-lt' : 'lt-lt'}`));
      root.style.setProperty('--bg-temperley-fila', getComputedStyle(root).getPropertyValue(`--bg-temperley-${isDark ? 'dk' : 'lt'}`));
      root.style.setProperty('--pj-icon-cancha', getComputedStyle(root).getPropertyValue(`--pj-icon-cancha-${isDark ? 'dk' : 'lt'}`));
    };

    const themePref = localStorage.getItem('theme');
    const isDarkInitial = themePref !== null ? Boolean(themePref) : match.matches;
    applyTheme(isDarkInitial);

    const listener = (e: MediaQueryListEvent) => applyTheme(e.matches);
    match.addEventListener('change', listener);

    return () => match.removeEventListener('change', listener);
  }, []);


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
