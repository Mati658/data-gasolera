import { useEffect, useState } from 'react';
import './controlNotas.css'
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../../context/DatabaseContext';
import NotaCaratula from '../../components/nota_caratula/NotaCaratula';

export default function ControlNotas() {
    const navigate = useNavigate();
    const usuario = localStorage.getItem('usuario')
    const { getTabla } = useDatabase()
    const [ notas, SetNotas ] = useState([]);

    useEffect(()=>{
        if (!usuario) {
            navigate('/');
            return;
        }

        getTabla('notas', '*', -1).then((res:any)=>{
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
