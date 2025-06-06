import { useEffect, useState } from 'react'
import './historial.css'
import { useDatabase } from '../../context/DatabaseContext'
import { Link } from 'react-router-dom'

export default function Historial() {
  const { getUno } = useDatabase()
  const [nota, setNota] = useState<any>('')
  const usuario : string | null = localStorage.getItem('usuario')
  
  useEffect(()=>{
    window.scrollTo(0, 0);
    getUno('historial', '*', 1).then((res:any)=>{
      setNota(res[0])
    })
  },[])

  return (
    <div className="container-historial">
      <h1>Historial</h1>
      <Link
        key={nota?.id} 
        to={`/editor`} 
        state={{nota}}>
        <button className={`btn-editor abs ${usuario ? '' : 'hidden'}`}>Editar</button>
      </Link>
      <div className='vista-previa' dangerouslySetInnerHTML={{ __html: nota.texto || '' }}></div>
      <div className='gap'></div>
    </div>
  )
}
