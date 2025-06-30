import { useEffect, useState } from 'react'
import PlantelFooter from '../../components/plantel_footer/PlantelFooter'
import './plantelpage.css'
import { useDatabase } from '../../context/DatabaseContext'
// import Loader from '../../components/loader/Loader'
import { useLoader } from '../../context/LoaderContext'

export default function PlantelPage() {
    const [jugadores, setJugadores] = useState([])
    const { getTabla } = useDatabase()
    const { setLoader } = useLoader();
    useEffect(() => {
        window.scrollTo(0, 0);
        let temp = localStorage.getItem('listaJugadores')
        if (temp) {
            setJugadores(JSON.parse(temp))
            return;
        }

        setLoader(true)
        getTabla('plantel', '*', -1).then((res:any)=>{
            setJugadores(res);
            localStorage.setItem('listaJugadores', JSON.stringify(res))
            setLoader(false)
        })
        
    }, []);


    return (
        <>  
        <div className='fondo-img-plantel'></div>
        <div className='filtro'></div>
        <div className='container-plantel-page'>
            <PlantelFooter jugadores={jugadores}></PlantelFooter>

            <div className='gap'></div>
            {/* <Loader></Loader> */}

        </div>
        </>
    )
}
