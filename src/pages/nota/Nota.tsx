import'./nota.css';
import { useEffect, useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Link, useLocation } from 'react-router-dom';
import { useLoader } from '../../context/LoaderContext';

export default function Nota() {
    const location = useLocation();
    const [notas, setNotas] = useState([])
    const { getUno } = useDatabase()
    const { setLoader } = useLoader();
    const [nota, setNota] = useState<any>('')
    const usuario : string | null = localStorage.getItem('usuario')

    useEffect(()=>{
        const id = Number(location.pathname.split('/')[2])
        setLoader(true)
        getUno('notas', '*', id).then((res:any)=>{
            setLoader(false)
            setNota(res[0])
            console.log(res[0])
        })
        let temp = localStorage.getItem('listaNotas')
        if (temp) {
            setNotas(JSON.parse(temp))
            console.log(notas)
        }
        window.scrollTo(0, 0);
    },[])

  return (
        <div className='container-nota'>
            <Link
                key={nota?.id} 
                to={`/editor`} 
                state={{nota}}>
                <button className={`btn-editor abs ${usuario ? '' : 'hidden'}`}>Editar</button>
            </Link>
            <div className='vista-previa' dangerouslySetInnerHTML={{ __html: nota.texto || '' }}></div>
        </div>


  )
}
