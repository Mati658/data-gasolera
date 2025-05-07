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
          
          <div className='gap'></div>
          <Plantel></Plantel>
          <div className='gap'></div>

        </div>
  
      </>
    )
}

