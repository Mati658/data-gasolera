import { useLocation } from 'react-router-dom';
import './perfil.css';
import { useEffect, useState } from 'react';
import JugadorComp from '../../components/jugador/Jugador';
import FormJugador from '../../components/form-jugador/FormJugador';
import { Jugador } from '../../classes/Jugador';
import PlantelFooter from '../../components/plantel_footer/PlantelFooter';
import { useLoader } from '../../context/LoaderContext';

export default function Perfil() {

    const location = useLocation();
    const { setLoader } = useLoader();
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
        setLoader(false);
        window.scrollTo(0, 0);
    },[])

    const actualizar= async(jugadorEdit:Jugador)=>{
        console.log(jugadorEdit)
    
        if (jugadorEdit) {
            setJugador(jugadorEdit)
        }
    }

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
                            <p className='lucidity' style={{color:'white'}}>{item == 'lugarNacimiento' ? 'Lugar de Nacimiento' : item}</p>
                            <p className='lucidity' style={{fontSize:'1.7rem'}}>{jugador[item] == 'AA Cuerpo Técnico'? 'Cuerpo Técnico' : jugador[item]}</p>
                        </div>
                    ))}
                </div>
                

            </div>
            <div className='container-perfil-datos'>
                <div className='perfil-item'>
                    <p className='lucidity' style={{color:'white'}}>{jugador.puesto != 'AA Cuerpo Técnico' ? (jugador.puesto == 'Arquero' ? 'Atajadas' : 'Goles') : ''}</p>
                    <p className='lucidity' style={{fontSize:'1.7rem'}}>{jugador.puesto != 'AA Cuerpo Técnico' ? jugador.datos.dato1 : ''}</p>
                </div>

                <div className='perfil-item'>
                    <p className='lucidity' style={{color:'white'}}>{jugador.puesto != 'AA Cuerpo Técnico' ? (jugador.puesto == 'Arquero' ? 'Arcos en Cero' : 'Asistencias') : ''}</p>
                    <p className='lucidity' style={{fontSize:'1.7rem'}}>{jugador.puesto != 'AA Cuerpo Técnico' ? jugador.datos.dato2 : ''}</p>
                </div>

                <div className='perfil-item'>
                    <p className='lucidity' style={{color:'white'}}>{jugador.puesto != 'AA Cuerpo Técnico' ? 'Partidos Jugados' : ''}</p>
                    <p className='lucidity' style={{fontSize:'1.7rem'}}>{jugador.puesto != 'AA Cuerpo Técnico' ? jugador.datos.dato3 : ''}</p>
                </div>

            </div>

            <div className='gap'></div>
            
            <PlantelFooter jugadores={jugadores}></PlantelFooter>

            <div className='gap'></div>

        </div>
    );
}
