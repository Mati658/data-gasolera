import { useEffect, useState } from "react";
import "./header.css"
import { useNavigate} from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const usuario : string | null = localStorage.getItem('usuario')
  const [flagWidth, setFlagWidth] = useState<boolean>(false)
  const [flagMenu, setFlagMenu] = useState<boolean>(false)
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const [temaOscuro, setTemaOscuro] = useState(Boolean(localStorage.getItem('theme')));

  useEffect(() => {
    const handleResize = () => {
        const width = window.innerWidth;
        setScreenWidth(width);
        setFlagWidth(width <= 930);

        if (width > 560) {
            setFlagMenu(false);
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
  }, [screenWidth]);


  const toggleMenu = () => {
    let flag = !flagMenu;
    setFlagMenu(!flagMenu)
    if(flag){
        const menu = document.querySelector('.menu');
        if(menu){
            menu.classList.remove('slide-out-right');
            menu.classList.add('slide-in-right');
        }
        
    }else{
        const menu = document.querySelector('.menu');
        const checkbox = document.getElementById('checkbox') as HTMLInputElement;
        if(menu){
            menu.classList.remove('slide-in-right');
            menu.classList.add('slide-out-right');
            checkbox.checked = false;
        }
    }
  }

  const cambiarTema = () => {
    const root = document.documentElement;
    const nuevoTema = !temaOscuro;
    localStorage.setItem('theme', nuevoTema ? '1' : '')
    setTemaOscuro(nuevoTema);
    
    if (nuevoTema) {
      root.style.setProperty('--bg-color', getComputedStyle(root).getPropertyValue('--bg-color-dk'));
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
    } else {
      root.style.setProperty('--bg-color', getComputedStyle(root).getPropertyValue('--bg-color-lt'));
      root.style.setProperty('--bg-color-loader', getComputedStyle(root).getPropertyValue('--bg-color-loader-lt'));
      root.style.setProperty('--pulse-loader', getComputedStyle(root).getPropertyValue('--pulse-loader-lt'));
      root.style.setProperty('--text-color', getComputedStyle(root).getPropertyValue('--text-color-lt'));
      root.style.setProperty('--text-effect', getComputedStyle(root).getPropertyValue('--text-bg-effect-lt'));
      root.style.setProperty('--text-color-videos', getComputedStyle(root).getPropertyValue('--text-color-videos-lt'));
      root.style.setProperty('--bg-video', getComputedStyle(root).getPropertyValue('--bg-video-lt'));
      root.style.setProperty('--bg-fila-liga', getComputedStyle(root).getPropertyValue('--bg-fila-lt-dk'));
      root.style.setProperty('--bg-fila-liga2', getComputedStyle(root).getPropertyValue('--bg-fila-lt-lt'));
      root.style.setProperty('--bg-temperley-fila', getComputedStyle(root).getPropertyValue('--bg-temperley-lt'));
      root.style.setProperty('--pj-icon-cancha', getComputedStyle(root).getPropertyValue('--pj-icon-cancha-lt'));

    }
  };

  const navegar = (path:string) =>{
      navigate(path);
  }

  return (
    <div className="header">
        <div className="container-header">
            <div className="logo" onClick={() => navegar('/')}>
                <img src="/logo-footer.png" className="img" />
                
            </div>
        </div>
        
        <div className="container-right">
          {flagWidth ? ( 
            <div className="container-menu">
                <div className="menu-toggle" >
                    <input type="checkbox" id="checkbox" onClick={toggleMenu} />
                    <label id='hamburguer' htmlFor="checkbox" className="toggle">
                        <div className="bars" id="bar1"></div>
                        <div className="bars" id="bar2"></div>
                        <div className="bars" id="bar3"></div>
                    </label>
                </div>

                <div className="menu" id="menu">
                  <button className="btn-header poppins-black " onClick={() => {navegar('/plantel'); toggleMenu()}}>Plantel</button>
                  <button className="btn-header poppins-black " onClick={() => {navegar('/fixture'); toggleMenu()}}>Fixture</button>
                  <button className="btn-header poppins-black " onClick={() => {navegar('/historial'); toggleMenu()}}>Historial</button>
                  <button className="btn-header poppins-black " onClick={() => {navegar('/noticias'); toggleMenu()}}>Más Noticias</button>
                  <button className="btn-header poppins-black " onClick={() => {navegar('/quienes-somos'); toggleMenu()}}>Quiénes Somos</button>
                  <button className={`${'btn-header poppins-black  '}${usuario ? '' : 'hidden'}`} onClick={() => {navegar('/alta-jugador'); toggleMenu()}}>Alta Jugador</button>
                  <button className={`${'btn-header poppins-black  '}${usuario ? '' : 'hidden'}`} onClick={() => {navegar('/editor'); toggleMenu()}}>Crear Nota</button>
                  <button className={`${'btn-header poppins-black  '}${usuario ? '' : 'hidden'}`} onClick={() => {navegar('/control-notas'); toggleMenu()}}>Edit Notas</button>
                  <div className="btn-theme">
                    <label className="switch">
                        <input type="checkbox" onChange={() => cambiarTema()} checked={temaOscuro} />
                        <span className="slider"></span>
                    </label>
                  </div>
                </div>
            </div>

            ) : ( 
            <>
              <div className="btn-theme">
                <label className="switch">
                    <input type="checkbox" onChange={() => cambiarTema()} checked={temaOscuro} />
                    <span className="slider"></span>
                </label>
              </div>
              <button className="btn-header poppins-black " onClick={() => navegar('/plantel')}>Plantel</button>
              <button className="btn-header poppins-black " onClick={() => navegar('/historial')}>Historial</button>
              <button className="btn-header poppins-black " onClick={() => navegar('/fixture')}>Fixture</button>
              <button className="btn-header poppins-black " onClick={() => {navegar('/noticias')}}>Más Noticias</button>
              <button className="btn-header poppins-black " onClick={() => navegar('/quienes-somos')}>Quiénes Somos</button>
              <label htmlFor="btns" className={`${'btn-header poppins-black  '}${usuario ? '' : 'hidden'}`}>Admin</label>
              <input type="checkbox" id="btns" hidden />
              <div className="btns-admin">
                <button className={`${'btn-header poppins-black  '}${usuario ? '' : 'hidden'}`} onClick={() => navegar('/alta-jugador')}>Alta Jugador</button>
                <button className={`${'btn-header poppins-black  '}${usuario ? '' : 'hidden'}`} onClick={() => navegar('/editor')}>Crear Nota</button>
                <button className={`${'btn-header poppins-black  '}${usuario ? '' : 'hidden'}`} onClick={() => navegar('/control-notas')}>Edit Notas</button>
              </div>
            </>
            )
          }
        </div>
    </div>
  )
}
