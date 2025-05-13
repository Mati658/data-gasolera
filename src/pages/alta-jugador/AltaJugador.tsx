import { useEffect } from 'react';
import './altaJugador.css'
import { useNavigate } from 'react-router-dom';
import FormJugador from '../../components/form-jugador/FormJugador';

export default function AltaJugador() {
    const navigate = useNavigate();
    const usuario = localStorage.getItem('usuario')

    useEffect(()=>{      
        if (!usuario) {
            navigate('/');
        }
    },[])

    return (
        <div className='container-alta'>
            <FormJugador jugadorEdit={null} onSubmit={()=>{}} sendJugador={()=>{}}></FormJugador>
            <div className='gap'></div>
        </div>
    )
}
