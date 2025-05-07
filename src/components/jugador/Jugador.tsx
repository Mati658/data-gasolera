import { useDatabase } from '../../context/DatabaseContext';
import { useStorage } from '../../context/StorageContext';
import BtnIcon from '../btn_icon/BtnIcon';
import './jugador.css';

type Props = {
    jugador : any,
    onEliminar : (id:number) => void,
    onEdit : () =>void,
}

export default function JugadorComp({jugador, onEliminar, onEdit}: Props) {

  const { bajaDB } = useDatabase()
  const { deleteFoto } = useStorage()


  const eliminarJugador = async() =>{
    await bajaDB('plantel', jugador.id);
    await deleteFoto(jugador.imagen.split('public/storage/')[1]);
    onEliminar(jugador.id);
  }

  return (
    <div className='card-jugador'>
      <div className='container-btns'>
        <div onClick={eliminarJugador}> <BtnIcon icon='delete'/> </div>
        <div onClick={onEdit}> <BtnIcon icon='edit'/> </div>
      </div>

        <img src={jugador.imagen} className='img-jugador' />

        <p className='lucidity'>{`${jugador.nombre}`}</p>
        <p className='lucidity'>{`${jugador.apellido}`}</p>
    </div>
  )
}