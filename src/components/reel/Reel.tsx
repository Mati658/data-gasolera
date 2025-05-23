import './reel.css'
import { useEffect } from "react";

type Props = {
    link : string,
}

declare global {
  interface Window {
    instgrm: any;
  }
}

export default function Reel({link}:Props) {
        useEffect(() => {
        const scriptExists = document.querySelector(`script[src="https://www.instagram.com/embed.js"]`);

        // Si no existe el script aún, lo agregamos
        if (!scriptExists) {
            const script = document.createElement("script");
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            script.onload = () => {
                if (window.instgrm) {
                    window.instgrm.Embeds.process();
                }
            };
            document.body.appendChild(script);
        } else {
            // Si ya existe, solo volvemos a procesar los embeds
            setTimeout(() => {
                if (window.instgrm) {
                    window.instgrm.Embeds.process();
                }
            }, 100); // pequeño delay para asegurar que el DOM se montó
        }

    }, [link]); // si cambia el link, lo re-procesamos
    
    return (
        <>
            {/* <div className='pintado'></div> */}
            {/* <div className='prueba'> */}
                
                <blockquote
                
                className="instagram-media video-reel"
                data-instgrm-permalink={link}
                data-instgrm-version="14"
                ></blockquote>
            {/* </div> */}
        </>
    );
}
