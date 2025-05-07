import { Link, useLocation } from 'react-router-dom';
import { useDatabase } from '../../context/DatabaseContext';
import { useStorage } from '../../context/StorageContext';
import BtnIcon from '../btn_icon/BtnIcon';
import './jugador.css';
import { useEffect, useState } from 'react';

type Props = {
    jugador : any,
    onEliminar : (id:number) => void,
    onEdit : () =>void,
    read : boolean
}

export default function JugadorComp({jugador, onEliminar, onEdit, read}: Props) {

  const location = useLocation();
  const [locationAnterior, setLocationAnterior] = useState(location)
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
            <img src={jugador.imagen} className='img-jugador' />
  
            <div style={{width:'100%', display:'flex', justifyContent:'end'}}>
              <div className='numero-jugador'>
                <p className='num-p lucidity'>{jugador.numero}</p>
              </div>
            </div>
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
            <img src={jugador.imagen} className='img-jugador'  style={{height:'180px'}}/>
  
            <div style={{width:'100%', display:'flex', justifyContent:'end'}}>
            <div className='numero-jugador' style={{transform: 'translate(-5px, -54px)'}}>
                <p className='num-p lucidity'>{jugador.numero}</p>
              </div>
            </div>
        </Link>
     
        <p className='text-p lucidity' style={{maxWidth:'100px'}}>{`${jugador.nombre}`}</p>
        <p className='text-p lucidity'>{`${jugador.apellido}`}</p>   
      </div>
    )
  }
  return (
    <div className='card-jugador2' style={{minHeight:'550px', maxHeight:'550px', minWidth:'400px', maxWidth:'400px'}}>
      {usuario ? (
        <div className='container-btns'>
          <div onClick={onEdit}> <BtnIcon icon='edit'/> </div>
        </div>
      ) : ( <></> )}
      
      
      <img src={jugador.imagen} className='img-jugador' style={{height:'500px'}}/>

      <div style={{width:'100%', display:'flex', justifyContent:'end'}}>
        <div className='numero-jugador' style={{transform: 'translate(-5px, -54px)'}}>
          <p className='num-p lucidity'>{jugador.numero}</p>
        </div>
      </div>      
    </div>
  )

}