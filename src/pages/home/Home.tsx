import { useEffect } from 'react'
import LoaderInit from '../../components/loader_init/LoaderInit'
import Body from '../../components/notas/Notas'
import Panel from '../../components/panel/Panel'
import Plantel from '../../components/plantel/Plantel'
import './home.css'

export default function Home() {

  useEffect(()=>{
    window.scroll(0,0)
  },[])

  return (
      <>
        <LoaderInit></LoaderInit>
        <div className='container'>
          
          <Body></Body>
    
          <Panel></Panel>
          
          <h1 className='lucidity' style={{color: 'var(--text-th)',}}>Plantel</h1>
          <Plantel></Plantel>
          <div className='gap'></div>

        </div>
  
      </>
    )
}

