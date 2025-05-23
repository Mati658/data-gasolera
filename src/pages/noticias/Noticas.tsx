import { Fragment, useEffect, useState } from 'react';
import './noticias.css';
import { useDatabase } from '../../context/DatabaseContext';
import NotaCaratula from '../../components/nota_caratula/NotaCaratula';
import { useLoader } from '../../context/LoaderContext';

export default function Noticas() {
    const { getNotas } = useDatabase()
    const { setLoader } = useLoader();
    const [ notas, SetNotas ] = useState([]);

    useEffect(()=>{
        setLoader(true)

        getNotas(-1).then((res:any)=>{
            setLoader(false)
            SetNotas(res);

        })
    },[])


    return (
        <>
            <div className='container-noticias'>
            <h1 className='lucidity' style={{color: 'var(--text-th)', width:'95%'}}>Noticas del club</h1>

                <div className='noticias-col'>
                    {notas.map((item:any, i=0)=>(
                        <Fragment key={i}>
                            {i++ < 2 ? ( 
                                <div key={item.id} className='nota-primeria'>
                                    <NotaCaratula  nota={item} onEliminar={()=>{}}></NotaCaratula>
                                </div>
                            ) : (
                                <div key={i} className='nota-secundaria'>
                                    <NotaCaratula  nota={item} onEliminar={()=>{}}></NotaCaratula>
                                </div>
                            ) }
                        </Fragment>
                    ))}
                </div>

            </div>
                <div className='gap'></div>
        </>
    )
}
