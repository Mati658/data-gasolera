import Body from '../../components/notas/Notas'
import Panel from '../../components/panel/Panel'
import './home.css'

export default function Home() {
  return (
      <>
      <div className='container'>
        
        <div className='gap'>
          <Body></Body>
        </div>
  
        <div className='gap'>
          <Panel></Panel>
        </div>
  
      </div>
  
      </>
    )
}

