import { useEffect } from 'react';
import './altaJugador.css'
import { useNavigate } from 'react-router-dom';

export default function AltaJugador() {
    const navigate = useNavigate();
    const usuario = localStorage.getItem('usuario')

    useEffect(()=>{
            
            console.log(usuario)
            if (!usuario) {
                navigate('/');
            }
        })

    return (
        <div>AltaJugador</div>
    )
}
