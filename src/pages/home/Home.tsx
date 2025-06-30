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
          <div className='gap'></div>
    
          <Panel></Panel>
          <div className='gap'></div>
          
          <h1 className='poppins-black upper-case' style={{color: '#24bcec',}}>Plantel</h1>
          <Plantel></Plantel>
          <div className='gap'></div>

        </div>
  
      </>
    )
}

