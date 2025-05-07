import { useState } from "react";
import "./header.css"
import { useNavigate} from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [temaOscuro, setTemaOscuro] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );


  const cambiarTema = () => {
    const root = document.documentElement;
    const nuevoTema = !temaOscuro;
    setTemaOscuro(nuevoTema);
    
    if (nuevoTema) {
      root.style.setProperty('--bg-color', getComputedStyle(root).getPropertyValue('--bg-color-dk'));
      root.style.setProperty('--text-color', getComputedStyle(root).getPropertyValue('--text-color-dk'));
      root.style.setProperty('--text-effect', getComputedStyle(root).getPropertyValue('--text-bg-effect-dk'));
      root.style.setProperty('--text-color-videos', getComputedStyle(root).getPropertyValue('--text-color-videos-dk'));
      root.style.setProperty('--bg-video', getComputedStyle(root).getPropertyValue('--bg-video-dk'));
      root.style.setProperty('--text-th', getComputedStyle(root).getPropertyValue('--text-th-dk'));
      root.style.setProperty('--bg-fila-liga', getComputedStyle(root).getPropertyValue('--bg-fila-dk-dk'));
      root.style.setProperty('--bg-fila-liga2', getComputedStyle(root).getPropertyValue('--bg-fila-dk-lt'));
    } else {
      root.style.setProperty('--bg-color', getComputedStyle(root).getPropertyValue('--bg-color-lt'));
      root.style.setProperty('--text-color', getComputedStyle(root).getPropertyValue('--text-color-lt'));
      root.style.setProperty('--text-effect', getComputedStyle(root).getPropertyValue('--text-bg-effect-lt'));
      root.style.setProperty('--text-color-videos', getComputedStyle(root).getPropertyValue('--text-color-videos-lt'));
      root.style.setProperty('--bg-fila-liga', getComputedStyle(root).getPropertyValue('--bg-fila-lt-dk'));
      root.style.setProperty('--bg-fila-liga2', getComputedStyle(root).getPropertyValue('--bg-fila-lt-lt'));

    }
  };

  const navegar = (path:string) =>{
      navigate(path);
  }

  return (
    <div className="header">
        <div className="container-header">
            <div className="logo" onClick={() => navegar('/')}>
                <img src="/logo.png" className="img" />
                
            </div>
        </div>
        
        <div className="container-right">
          <div className="btn-theme">
            <label className="switch">
                <input type="checkbox" onChange={() => cambiarTema()} checked={temaOscuro} />
                <span className="slider"></span>
            </label>
          </div>
          <button className="btn-header lucidity">Plantel</button>
          <button className="btn-header lucidity" onClick={() => navegar('/fixture')}>Fixture</button>
          <button className="btn-header lucidity">Historia</button>
          <button className="btn-header lucidity">+ Noticias</button>
          <button className="btn-header lucidity">Quienes Somos</button>
        </div>
    </div>
  )
}
