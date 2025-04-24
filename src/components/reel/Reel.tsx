import './reel.css'
import { useEffect } from "react";

type Props = {
    link : string,
}

export default function Reel({link}:Props) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    
    return (
        <>
            <blockquote
                className="instagram-media video-reel"
                data-instgrm-permalink={link}
                data-instgrm-version="14"
                style={{background:'black'}}
            ></blockquote>
        </>
    );
}
