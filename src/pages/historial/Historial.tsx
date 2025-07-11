import { useEffect, useState } from 'react'
import './historial.css'
import { useDatabase } from '../../context/DatabaseContext'
import { Link, useNavigate } from 'react-router-dom'
import { useLoader } from '../../context/LoaderContext'

export default function Historial() {
  const { getUno } = useDatabase()
  const [nota, setNota] = useState<any>('')
  const { setLoader } = useLoader();
  const navigate  = useNavigate();
  const usuario : string | null = localStorage.getItem('usuario')
  
  useEffect(()=>{
    window.scrollTo(0, 0);
    setLoader(true)
    getUno('historial', '*', 1).then((res:any)=>{
      setNota(res[0])
      setLoader(false)
    })

    const handler = (e: MouseEvent) => getEvent(e)
    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  },[])

  const getEvent=(e:any)=>{
    if (e.target.tagName == 'BUTTON') {
      // console.log(e.target.id)
      if (Number(e.target.id) > 0) { 
        // console.log(e.target.id)
        navigate(`/historial/${e.target.id}`)
      }
    }
  }

  return (
    <>
    <div className='fondo-img-historial'></div>
    <div className='filtro'></div>
    <div className="container-historial">
      <h1 className='upper-case poppins-black'>Historial</h1>
      <Link
        key={nota?.id} 
        to={`/editor`} 
        state={{nota}}>
        <button className={`btn-editor abs ${usuario ? '' : 'hidden'}`}>Editar</button>
      </Link>
      <div className='vista-previa' dangerouslySetInnerHTML={{ __html: nota.texto || '' }}></div>
      <div className='gap'></div>
      <div className='gap'></div>

      <label className='label-agradecimiento poppins-semibold'>
        <h4>
          ℹ Se agradece la información dada para la realización de estos historiales: Daniel Remolina, Marcelo Ventieri en su Blogspot 
          sobre el club y al Departamento Histórico.
        </h4>
      </label>
    </div>
    </>
  )
}
