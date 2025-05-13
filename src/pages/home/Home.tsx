import Body from '../../components/notas/Notas'
import Panel from '../../components/panel/Panel'
import Plantel from '../../components/plantel/Plantel'
import './home.css'

export default function Home() {
  return (
      <>
        <div className='container'>
          
          <Body></Body>
    
          <div className='gap'></div>
          <Panel></Panel>
          
          <h1 className='lucidity' style={{color: 'var(--text-th)',}}>Plantel</h1>
          <Plantel></Plantel>
          <div className='gap'></div>

        </div>
  
      </>
    )
}

