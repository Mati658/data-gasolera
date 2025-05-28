import './quienesSomos.css'

import { useEffect, useRef } from 'react';
import Canva from '../../components/canva/Canva';

export default function QuienesSomos() {
   const labelRef : any = useRef(null);
   const canvaRef : any = useRef(null);
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
  
        const maxScroll = 300;
        const scale = Math.max(0.5, 1 - scrollY / maxScroll);
        const opacity = Math.max(0.5, 1 - scrollY / maxScroll);
  
        if (labelRef.current) {
          const h1s = labelRef.current.querySelectorAll('label');
          h1s.forEach((h1:any) => {
            h1.style.transform = `scale(${scale})`;
            h1.style.opacity = opacity;
          });
        }

         if (canvaRef.current) {
            const maxScrollCanva = 800;
            const scaleCanva = Math.min(1,0.5 + scrollY / maxScrollCanva);
            const opacityCanva = Math.max(0.5, 1 + scrollY / maxScrollCanva);
            canvaRef.current.style.transform = `scale(${scaleCanva})`;
            canvaRef.current.style.opacity = opacityCanva;
        //   const h1s = canvaRef.current.querySelectorAll('div');
        //   h1s.forEach((h1:any) => {
        //     h1.style.transform = `scale(${scale})`;
        //     h1.style.opacity = opacity;
        //   });
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
        <>
            <div className='container-historial' ref={labelRef}>
                <div className='fondo-historial'></div>
                <label className='label-historial lucidity' >
                    <h1 className='preg'>¿</h1>
                    <div>
                        <h1>Qué es</h1>
                        <img src="/logo-footer.png" className='logo-historial'/>
                    </div>
                    <h1 className='preg'>?</h1>
                </label>
        

            </div>
            
            <div ref={canvaRef}>
                <Canva></Canva>
            </div>
        </>
    )
}
