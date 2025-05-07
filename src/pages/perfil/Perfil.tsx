import { useLocation } from 'react-router-dom';
import './perfil.css';
import { useEffect, useState } from 'react';
import JugadorComp from '../../components/jugador/Jugador';
import FormJugador from '../../components/form-jugador/FormJugador';
import { Jugador } from '../../classes/Jugador';
import PlantelFooter from '../../components/plantel_footer/PlantelFooter';

export default function Perfil() {

    const location = useLocation();
    const [jugadores, setJugadores] = useState([])
    const [jugador, setJugador] = useState(location.state.jugador || {})
    const keys : string[] = ['puesto', 'nacimiento', 'edad', 'lugarNacimiento', 'altura', 'peso', 'nacionalidad'];
    const [flagEdit, setFlagEdit] = useState(false)

    useEffect(()=>{
        let temp = localStorage.getItem('listaJugadores')
        if (temp) {
            setJugadores(JSON.parse(temp))
            console.log(JSON.parse(temp))
        }
        window.scrollTo(0, 0);
    },[])

    const actualizar= async(jugadorEdit:Jugador)=>{
        console.log(jugadorEdit)
    
        if (jugadorEdit) {
            setJugador(jugadorEdit)
        }
    }

    useEffect(()=>{

    },[jugador])



    return (
        <div className='container-perfil'>
            <h1 className='lucidity'>Plantel</h1>
            {
                flagEdit ? ( 
                    <div className='form-edit-perfil'>
                        <button className='cerrar-form' onClick={()=>setFlagEdit(false)}>X</button>
                        <FormJugador jugadorEdit={jugador} onSubmit={()=>{setFlagEdit(false);}} sendJugador={actualizar}></FormJugador>
                    </div>
                ) : ( <></> )
            }

            <div className='jugador-perfil'>       
                <div>
                    <JugadorComp jugador={jugador} onEliminar={()=>{}} onEdit={()=>setFlagEdit(true)} read={false}></JugadorComp>
                </div>

                <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                    <div className='perfil-item'>
                        <p className='lucidity' style={{fontSize:'2rem'}}>{jugador.nombre}</p>
                        <p className='lucidity' style={{color:'white', fontSize:'3rem'}}>{jugador.apellido}</p>
                    </div>
                    
                    {keys.map((item)=>(
                        <div key={item} className='perfil-item'>
                            <p className='lucidity' style={{color:'white'}}>{item}</p>
                            <p className='lucidity' style={{fontSize:'1.7rem'}}>{jugador[item]}</p>
                        </div>
                    ))}
                </div>

            </div>

            <div className='gap'></div>
            
            <PlantelFooter jugadores={jugadores}></PlantelFooter>

            <div className='gap'></div>

        </div>
    );
}
