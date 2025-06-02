import { useEffect, useState } from 'react';
import './controlNotas.css'
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../../context/DatabaseContext';
import NotaCaratula from '../../components/nota_caratula/NotaCaratula';
import { useLoader } from '../../context/LoaderContext';

export default function ControlNotas() {
    const navigate = useNavigate();
    const usuario = localStorage.getItem('usuario')
    const { getNotas } = useDatabase()
    const [ notas, SetNotas ] = useState([]);
    const { setLoader } = useLoader();

    useEffect(()=>{
        if (!usuario) {
            navigate('/');
            return;
        }
        setLoader(true)
        window.scrollTo(0, 0);

        getNotas(-1).then((res:any)=>{
            setLoader(false)
            SetNotas(res);

        })
    },[])

    const eliminarNota = (id: number) => {
            SetNotas(notas.filter((item:any) => item.id !== id));
        };

  return (
    <div className='container-control'>
        {notas.map((item:any)=>(
            <div key={item.id} style={{maxWidth:'200px', minWidth:'200px', maxHeight:'300px', minHeight:'300px'}}>
                <NotaCaratula  nota={item} onEliminar={eliminarNota}></NotaCaratula>
            </div>
        ))}
    </div>
  )
}
