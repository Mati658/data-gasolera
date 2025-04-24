import { useState } from "react";
import "./header.css"

export default function Header() {
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
      console.log("AA")
    } else {
      root.style.setProperty('--bg-color', getComputedStyle(root).getPropertyValue('--bg-color-lt'));
      root.style.setProperty('--text-color', getComputedStyle(root).getPropertyValue('--text-color-lt'));
      root.style.setProperty('--text-effect', getComputedStyle(root).getPropertyValue('--text-bg-effect-lt'));
      root.style.setProperty('--text-color-videos', getComputedStyle(root).getPropertyValue('--text-color-videos-lt'));
      root.style.setProperty('--bg-video', getComputedStyle(root).getPropertyValue('--bg-video-lt'));
    }
  };

  return (
    <div className="header">
        <div className="container-header">
            <div className="logo">
                <img src="logo.png" className="img" />
                
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
          <button className="btn-header lucidity">Fixture</button>
          <button className="btn-header lucidity">Historia</button>
          <button className="btn-header lucidity">+ Noticias</button>
          <button className="btn-header lucidity">Quienes Somos</button>
        </div>
    </div>
  )
}
