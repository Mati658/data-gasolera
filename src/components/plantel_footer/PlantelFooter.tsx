import './plantelFooter.css'
import JugadorComp from '../jugador/Jugador';

type Props = {
    jugadores : any[];
}

export default function PlantelFooter({jugadores}: Props){

    const keys : string[] = ['AA Cuerpo Técnico', 'Arquero', 'Defensor', 'Mediocampista', 'Delantero', ];

    const filtrar = (filtro:string)=>{
        return (jugadores.filter((item)=>item.puesto == filtro))
    }

  return (
    <div className='container-jugadores'>
        {keys.map((key)=>(
            <div key={key} className='container-puesto'>
                <div><h1 className='poppins-black upper-case'>{key == 'AA Cuerpo Técnico' ? 'Cuerpo Técnico' : key == 'Defensor' ? 'Defensores' : key+'S'}</h1></div>
                <div className='puestos'>
                {filtrar(key).map((item)=>(
                        <JugadorComp key={item.id} jugador={item} onEliminar={()=>{}} onEdit={()=>{}} read={true}></JugadorComp>
                    ))}
                </div>
            
            </div>
        ))}
    </div>
  )
}