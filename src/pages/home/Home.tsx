import Footer from '../../components/footer/Footer'
import Body from '../../components/notas/Notas'
import Panel from '../../components/panel/Panel'
import './home.css'

export default function Home() {
  return (
      <>
      <div className='container'>
        
        <Body></Body>
  
        <div className='gap'>
          <Panel></Panel>
        </div>
  
        <div className='gap'></div>

      </div>
  
      </>
    )
}

