import { useAuth } from "../../context/AuthContext";
import "./header.css"

export default function Header() {
  const { usuario, signOut, handleSignInWithGoogle } = useAuth();

  let temaOscuro : boolean = false;

  const cambiarTema = () => {
    const root = document.documentElement;
    temaOscuro = !temaOscuro;
    if (temaOscuro) {
      root.style.setProperty('--bg-color', getComputedStyle(root).getPropertyValue('--bg-color-dk'));
      root.style.setProperty('--text-color', getComputedStyle(root).getPropertyValue('--text-color-dk'));
      root.style.setProperty('--text-effect', getComputedStyle(root).getPropertyValue('--text-bg-effect-dk'));
      root.style.setProperty('--text-color-videos', getComputedStyle(root).getPropertyValue('--text-color-videos-dk'));
      root.style.setProperty('--bg-video-video-principal', getComputedStyle(root).getPropertyValue('--bg-video-pr-dk'));
      root.style.setProperty('--text-color-video-principal', getComputedStyle(root).getPropertyValue('--text-color-video-pr-dk'));
    } else {
      root.style.setProperty('--bg-color', getComputedStyle(root).getPropertyValue('--bg-color-lt'));
      root.style.setProperty('--text-color', getComputedStyle(root).getPropertyValue('--text-color-lt'));
      root.style.setProperty('--text-effect', getComputedStyle(root).getPropertyValue('--text-bg-effect-lt'));
      root.style.setProperty('--text-color-videos', getComputedStyle(root).getPropertyValue('--text-color-videos-lt'));
      root.style.setProperty('--bg-video-video-principal', getComputedStyle(root).getPropertyValue('--bg-video-pr-lt'));
      root.style.setProperty('--text-color-video-principal', getComputedStyle(root).getPropertyValue('--text-color-video-pr-lt'));
    }
  };

  console.log(usuario)

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
                <input type="checkbox" onChange={() => cambiarTema()}/>
                <span className="slider"></span>
            </label>
          </div>
          <a href="/login" className="login roboto-slab">Login</a>
        </div>
    </div>
  )
}
