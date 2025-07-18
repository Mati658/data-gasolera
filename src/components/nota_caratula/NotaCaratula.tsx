import { Link, useLocation } from 'react-router-dom';
import './notaCaratula.css';
import { useEffect, useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import BtnIcon from '../btn_icon/BtnIcon';
import Confirm from '../confirm/Confirm';

type Props = {
    nota : any,
    onEliminar : (id:number) => void,
}

export default function NotaCaratula({nota, onEliminar}: Props) {
  const location = useLocation();
  const [locationAnterior] = useState(location)
  const { bajaDB } = useDatabase()
  const [imagen, setImagen] = useState('');
  const usuario : string | null = localStorage.getItem('usuario')
  const [flagDialog, setFlagDialog] = useState<boolean>(false);

  const eliminarNota = async() =>{
    await bajaDB('notas', nota.id);
    onEliminar(nota.id);
  }

  const getImagen = () =>{
    if (nota?.texto) {   
        try {
          setImagen(((nota?.texto.split('src="')[1]).split('"')[0]));
          
        } catch (error) {
          console.log('No hay imagen')
        }
    }
  }

  useEffect(()=>{
    if (locationAnterior != location) {
      window.location.reload();
      window.scrollTo(0, 0);
    }
  },[location])

  useEffect(()=>{
    getImagen()
  },[])

  if (location.pathname == '/') {
    return (
      <div className='img-wrapper-nota'>       
        <Link 
            key={nota?.id} 
            to={`/nota/${nota?.id}/${nota?.titulo}`} 
            state={{nota}}>
            <img className="img-grid" src={imagen} />
            <h1 className="titulo-nota lucidity">
                <span className="text-effect2 caratula">{nota?.titulo}</span> 
            </h1>
        </Link>
      </div>
    )
  }
  if (location.pathname == '/noticias') {
    return (
      <div className='img-wrapper-nota'>        
          <Link 
              key={nota?.id} 
              to={`/nota/${nota?.id}/${nota?.titulo}`} 
              state={{nota}}>
              <img className="img-grid" src={imagen} />
              <h1 className="titulo-nota lucidity">
                  <span className="text-effect2 caratula">{nota?.titulo}</span> 
              </h1>
          </Link>
      </div>
    )
  }
  if (location.pathname.includes('nota/')) {
    return (
      <div className='img-wrapper-nota'>        
          <Link 
              key={nota?.id} 
              to={`/nota/${nota?.id}/${nota?.titulo}`} 
              state={{nota}}>
              <img className="img-grid" src={imagen} />
              <h1 className="titulo-nota-2 lucidity">
                  <span className="text-effect2 caratula">{nota?.titulo}</span> 
              </h1>
          </Link>
      </div>
    )
  }
  return (
    <div className='img-wrapper-nota'>
      {flagDialog && (
        <Confirm onConfirm={()=>eliminarNota()} onCancel={()=>setFlagDialog(false)}></Confirm>
      )}
        {usuario ? (
            <div className='container-btns'>
                <Link
                    key={nota?.id} 
                    to={`/editor`} 
                    state={{nota}}>
                    <div> <BtnIcon icon='edit'/> </div>
                </Link>
                <div onClick={()=>setFlagDialog(true)}> <BtnIcon icon='delete'/> </div>
            </div>
        ) : ( <></> )}
      
      
        <Link 
            key={nota?.id} 
            to={`/nota/${nota?.id}/${nota?.titulo}`} 
            state={{nota}}>
            <img className="img-grid" src={imagen} />
            <h1 className="titulo-nota lucidity">
                <span className="text-effect2 caratula">{nota?.titulo}</span> 
            </h1>
        </Link>
    </div>
  )

}