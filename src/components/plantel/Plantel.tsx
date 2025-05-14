import { useEffect, useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import JugadorComp from '../jugador/Jugador';
import './plantel.css';
import { Jugador } from '../../classes/Jugador';
import FormJugador from '../form-jugador/FormJugador';

export default function Plantel() {

    const { getTabla } = useDatabase()
    const [ jugadores, SetJugadores ] = useState([]);
    const [ jugador, setJugador ] = useState<Jugador | null>(null);

    useEffect(() => {
        getTabla('plantel', '*', -1).then((res:any)=>{
            SetJugadores(res);
            localStorage.setItem('listaJugadores', JSON.stringify(jugadores))
        })
    }, []);

    const eliminarJugador = (id: number) => {
        SetJugadores(jugadores.filter((j:Jugador) => j.id !== id));
    };

    return (
        <div className='parent-plantel'>
                {
                    jugador ? ( 
                        <div className='form-edit'>
                            <button className='cerrar-form' onClick={()=>setJugador(null)}>X</button>
                            <FormJugador jugadorEdit={jugador} onSubmit={()=>setJugador(null)} sendJugador={()=>{}}></FormJugador>
                        </div>
                ) : ( <></> )
                }
            

            {
                jugadores.map((item:Jugador)=>(
                    <JugadorComp key={item.id} jugador={item} onEliminar={eliminarJugador} onEdit={()=>{setJugador(item)}} read={false}></JugadorComp>
                )
            )}
           
        </div>
    )
}

