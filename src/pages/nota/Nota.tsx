import'./nota.css';
import { useEffect, useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Link, useLocation } from 'react-router-dom';
import { useLoader } from '../../context/LoaderContext';
import NotaCaratula from '../../components/nota_caratula/NotaCaratula';

export default function Nota() {
    const location = useLocation();
    const { getUno, getNotas } = useDatabase()
    const { setLoader } = useLoader();
    const [nota, setNota] = useState<any>('')
    const [ notas, SetNotas ] = useState([]);
    const usuario : string | null = localStorage.getItem('usuario')

    useEffect(()=>{
        const id = Number(location.pathname.split('/')[2])
        setLoader(true)
        getUno('notas', '*', id).then((res:any)=>{
            setLoader(false)
            setNota(res[0])
            // console.log(res[0])
        })

        getNotas(3).then((res:any)=>{
            // setLoader(false)
            SetNotas(res);
            // console.log("a")
            localStorage.setItem('listaNotas', JSON.stringify(notas))
        })
        window.scrollTo(0, 0);
    },[])

  return (
    <>
        <div className='container-nota'>
            
            <Link
                key={nota?.id} 
                to={`/editor`} 
                state={{nota}}>
                <button className={`btn-editor abs ${usuario ? '' : 'hidden'}`}>Editar</button>
            </Link>
            <div className='vista-previa-nota' dangerouslySetInnerHTML={{ __html: nota.texto || '' }}>
            </div>
            
            <div className='container-mas-noticias'>
                <h3 className='poppins-black upper-case'>Más noticas</h3>
                {notas.map((item:any, i:number=1)=>(i++,
                    <div key={item.id} className={'caratula-mas-noticas'}> 
                        <NotaCaratula nota={item} onEliminar={()=>{}}></NotaCaratula>
                    </div>
                ))} 
            </div>
            <div className='gap'></div>

        </div>
        <div className='gap'></div>
    </>


  )
}
