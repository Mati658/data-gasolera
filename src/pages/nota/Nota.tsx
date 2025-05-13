import { useEffect, useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import'./nota.css';

export default function Nota() {
    const { getTabla } = useDatabase()
    const [nota, setNota] = useState('')
    useEffect(()=>{
        getTabla('notas').then((res:any)=>{
            console.log(res[0])
            setNota(res[0].texto)
        })
    },[])

  return (
        <div className='container-nota'>
            <div className='vista-previa' dangerouslySetInnerHTML={{ __html: nota || '' }}></div>
        </div>


  )
}
