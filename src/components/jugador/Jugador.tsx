import { Link, useLocation } from 'react-router-dom';
import { useDatabase } from '../../context/DatabaseContext';
import { useStorage } from '../../context/StorageContext';
import BtnIcon from '../btn_icon/BtnIcon';
import './jugador.css';
import { useEffect, useState } from 'react';
import { useLoader } from '../../context/LoaderContext';

type Props = {
    jugador : any,
    onEliminar : (id:number) => void,
    onEdit : () =>void,
    read : boolean
}

export default function JugadorComp({jugador, onEliminar, onEdit, read}: Props) {

  const location = useLocation();
  const [locationAnterior] = useState(location)
  const { setLoader } = useLoader();
  const { bajaDB } = useDatabase()
  const { deleteFoto } = useStorage()
  const usuario : string | null = localStorage.getItem('usuario')


  const eliminarJugador = async() =>{
    await bajaDB('plantel', jugador.id);
    await deleteFoto(jugador.imagen.split('public/storage/')[1]);
    onEliminar(jugador.id);
  }

  useEffect(()=>{
    if (locationAnterior != location) {
      setLoader(true);
      window.location.reload();
      window.scrollTo(0, 0);
    }
  },[location])

  if (location.pathname == '/') {
    return (
      <div className='card-jugador'>
        {usuario ? (
          <div className='container-btns'>
            <div onClick={eliminarJugador}> <BtnIcon icon='delete'/> </div>
            <div onClick={onEdit}> <BtnIcon icon='edit'/> </div>
          </div>
        ) : ( <></> )}
        
        <Link 
            key={jugador.id} 
            to={`/perfil/${jugador.nombre}-${jugador.apellido}`} 
            state={{jugador}}>
            {jugador.puesto != 'AA Cuerpo Técnico' && (
              <div className='background-datos'>
                <div className='container-datos slide-in-left'>
                  <label className='label-datos'>
                    <h1 className='lucidity'>{jugador.datos.dato1}</h1>
                    <span className='lucidity'>{jugador.puesto == 'Arquero' ? 'Atajadas' : 'Goles'}</span>
                  </label>
                  <label className='label-datos'>
                    <h1 className='lucidity'>{jugador.datos.dato2}</h1>
                    <span className='lucidity'>{jugador.puesto == 'Arquero' ? 'Arcos en Cero' : 'Asistencias'}</span>
                  </label>
                  <label className='label-datos'>
                    <h1 className='lucidity'>{jugador.datos.dato3}</h1>
                    <span className='lucidity'>Partidos Jugados</span>
                  </label>
                </div>
              </div>
            )}
            <img src={jugador.imagen} className='img-jugador' />


  
            {/* <div style={{width:'100%', display:'flex', justifyContent:'end'}}>
              <div className='numero-jugador'>
                <p className='num-p lucidity'>{jugador.numero}</p>
              </div>
            </div> */}
        </Link>
  
            <p className='text-p lucidity'>{`${jugador.nombre}`}</p>
            <p className='text-p lucidity'>{`${jugador.apellido}`}</p>
      </div>
    )
  }

  if (read) {
    return (
      <div className='card-jugador' style={{minHeight:'250px', maxHeight:'250px', minWidth:'150px', maxWidth:'150px'}}>

        <Link 
            key={jugador.id} 
            to={`/perfil/${jugador.nombre}-${jugador.apellido}`} 
            state={{jugador}}>
            {jugador.puesto != 'AA Cuerpo Técnico' && (
              <div className='background-datos2'>
                <div className='container-datos2 slide-in-left'>
                  <label className='label-datos2'>
                    <h1 className='lucidity'>{jugador.datos.dato1}</h1>
                    <span className='lucidity'>{jugador.puesto == 'Arquero' ? 'Atajadas' : 'Goles'}</span>
                  </label>
                  <label className='label-datos2'>
                    <h1 className='lucidity'>{jugador.datos.dato2}</h1>
                    <span className='lucidity'>{jugador.puesto == 'Arquero' ? 'Arcos en Cero' : 'Asistencias'}</span>
                  </label>
                  <label className='label-datos2'>
                    <h1 className='lucidity'>{jugador.datos.dato3}</h1>
                    <span className='lucidity'>Partidos Jugados</span>
                  </label>
                </div>
              </div>
            )}
            <img src={jugador.imagen} className='img-jugador'  style={{height:'180px'}}/>

  
            {/* <div style={{width:'100%', display:'flex', justifyContent:'end'}}>
            <div className='numero-jugador' style={{transform: 'translate(-5px, -54px)'}}>
                <p className='num-p lucidity'>{jugador.numero}</p>
              </div>
            </div> */}
        </Link>
     
        <p className='text-p lucidity' style={{maxWidth:'90%'}}>{`${jugador.nombre}`}</p>
        <p className='text-p lucidity'>{`${jugador.apellido}`}</p>   
      </div>
    )
  }
  return (
    <div className='card-jugador2' style={{minHeight:'100%', maxHeight:'100%', minWidth:'100%', maxWidth:'100%'}}>
      {usuario ? (
        <div className='container-btns'>
          <div onClick={onEdit}> <BtnIcon icon='edit'/> </div>
        </div>
      ) : ( <></> )}
      
      
      <img src={jugador.imagen} className='img-jugador' style={{height:'500px'}}/>

      {/* <div style={{width:'100%', display:'flex', justifyContent:'end'}}>
        <div className='numero-jugador' style={{transform: 'translate(-5px, -54px)'}}>
          <p className='num-p lucidity'>{jugador.numero}</p>
        </div>
      </div>       */}
    </div>
  )

}