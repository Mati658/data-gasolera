import { useEffect, useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import JugadorComp from '../jugador/Jugador';
import './plantel.css';
import { Jugador } from '../../classes/Jugador';
import FormJugador from '../form-jugador/FormJugador';
// import { useLoader } from '../../context/LoaderContext';

export default function Plantel() {

    const { getTabla } = useDatabase()
    // const { setLoader } = useLoader();
    const [ jugadores, SetJugadores ] = useState([]);
    const [ jugador, setJugador ] = useState<Jugador | null>(null);
    const keys : string[] = ['AA Cuerpo Técnico', 'Arquero', 'Defensor', 'Mediocampista', 'Delantero', ];

    const filtrar = (filtro:string)=>{
        return (jugadores.filter((item:any)=>item.puesto == filtro))
    }
    useEffect(() => {
        // setLoader(true)

        getTabla('plantel', '*', -1).then((res:any)=>{
            // setLoader(false)
            SetJugadores(res);
            localStorage.setItem('listaJugadores', JSON.stringify(res))
            // console.log(localStorage.getItem('listaJugadores'))
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
            
        {keys.map((key)=>(  
            <>
            {filtrar(key).map((item:any)=>(
                <JugadorComp key={item.id} jugador={item} onEliminar={eliminarJugador} onEdit={()=>{setJugador(item)}} read={false}></JugadorComp>
                )
            )}
            </>
        ))}
           
        </div>
    )
}

