import './App.css'
import Body from './components/notas/Notas'
import Header from './components/header/Header'
import Panel from './components/panel/Panel'

function App() {

  return (
    <>
    <Header></Header>
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

export default App
