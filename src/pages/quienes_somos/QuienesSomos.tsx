import './quienesSomos.css'

import { useEffect, useRef, useState } from 'react';

export default function QuienesSomos() {
  // const [isInView] = useState()
  const labelRef : any = useRef(null);
  const div1Ref : any = useRef(null);
  const div2Ref : any = useRef(null);
  const div3Ref : any = useRef(null);
  const div4Ref : any = useRef(null);
  const div5Ref : any = useRef(null);

    
  const inView1 = useIsInView(div1Ref, 0.6);
  const inView2 = useIsInView(div2Ref, 0.6);
  const inView3 = useIsInView(div3Ref, 0.6);
  const inView4 = useIsInView(div4Ref, 0.6);
  const inView5 = useIsInView(div5Ref, 0.6);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      scrollStart(labelRef, 300)

    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollStart = (ref : any, maxScroll:number, ) =>{
    if (ref.current) {
        const scrollY = window.scrollY;
        const scale = Math.max(0.5, 1 - scrollY / maxScroll);
        const opacity = Math.max(0.5, 1 - scrollY / maxScroll);
        ref.current.style.transform = `scale(${scale})`;
        ref.current.style.opacity = opacity;
      }
  }

  return (
      <>
          <div className='container-quienes'>
              <div className='fondo-quienes'></div>
              <label className='label-quienes lucidity'  
                ref={labelRef}
                
              >
                <h1 className='preg'>¿</h1>
                <div>
                    <h1>Qué es</h1>
                    <img src="/logo-footer.png" className='logo-quienes'/>
                </div>
                <h1 className='preg'>?</h1>
              </label>
      

          </div>
          
          <div className="background">
            <div className='container-overflow-pres'>
              <div className='container-presentacion'>
                <div className='centro' ref={div1Ref}
                style={{
                    transition: 'transform 0.6s ease, opacity 0.6s ease',
                    transform: inView1 ? 'scale(1)' : 'scale(0)',
                    opacity: inView1 ? 1 : 0,
                }}>
                  <img src="/quienes_somos/1.jpg" className='img-div1' />
                </div>
                <div className='izquierda' ref={div2Ref}
                  style={{
                    transition: 'transform 0.6s ease, opacity 0.6s ease',
                    transform: inView2 ? 'scale(1)' : 'scale(0)',
                    opacity: inView2 ? 1 : 0,
                  }}>
                  <img src="/quienes_somos/2.jpg" className='img-div2' />
                  <h3>
                  Data Gasolera surge un <strong>30 de junio del 2023</strong>, como un proyecto de <strong>Lucas Alvarado y Luca Barrios. </strong>  
                   Comenzó como un medio digital de publicaciones informativos acerca de la primera del fútbol del Club Atlético Temperley, 
                  moldeando la línea gráfica los 2 creadores descubrieron que sería su forma de llegar al público. 
                  Además hicieron su primera entrevista presencial en los escalones de la Biondi con Maxi Moreno, de las inferiores celestes.
                  </h3>
                </div>

                <div className='derecha' ref={div3Ref}
                  style={{
                    transition: 'transform 0.6s ease, opacity 0.6s ease',
                    transform: inView3 ? 'scale(1)' : 'scale(0)',
                    opacity: inView3 ? 1 : 0,
                }}>
                  <h3>
                  En 2024 “Data” tenía los planes de arrancar un streaming para tener más llegada a sus seguidores y para ello 
                  incorporaron a <strong>Ciro Damoni</strong>, de a 3, entrevistaron a Lucas Angelini, Facundo Krüger, Lucas Richarte, Julian Mavilla y 
                  Leandro Lucero. También empezaron a hacer entrevistas Post-Partido con los protagonistas para tener las declaraciones 
                  “recién salidas del horno”, entre otros contenidos que fueron generando.
                  </h3>
                  <img src="/quienes_somos/3.jpg"/>
                </div>

                <div className='izquierda' ref={div4Ref}
                style={{
                    transition: 'transform 0.6s ease, opacity 0.6s ease',
                    transform: inView4 ? 'scale(1)' : 'scale(0)',
                    opacity: inView4 ? 1 : 0,
                }}>
                  <img src="/quienes_somos/4.jpg" className='img-div4' />
                  <h3>
                  En <strong>2025</strong> el medio incorpora a <strong>Franco Blanco</strong> para cerrar el “Dream Team”. En búsqueda de seguir creciendo para festejar 
                  los 2 años de la creación de Data Gasolera cambian su antiguo logo y proponen una nueva distinción gráfica, 
                  además se suma la creación de la <strong>Página Web</strong> donde cubrirán de manera escrita al club para ser multiplataforma e 
                  integrando la parte visual para ser más completos.
                  </h3>
                </div>

                <div className='centro' ref={div5Ref}
                style={{
                    transition: 'transform 0.6s ease, opacity 0.6s ease',
                    transform: inView5 ? 'scale(1)' : 'scale(0)',
                    opacity: inView5 ? 1 : 0,
                }}>
                  <img src="/quienes_somos/5.jpg" className='img-div5' />
                  <h3>
                  <br />
                  Gracias por elegir Data Gasolera, “Lo nuevo en el periodismo partidario Celeste”.
                  </h3>
                </div>

              </div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              
            </div>
          </div>
      </>
  )
}

export function useIsInView(ref: React.RefObject<HTMLElement>, threshold = 0.6) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isInView;
}