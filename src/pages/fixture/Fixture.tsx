import TablaNacional from '../../components/tabla_nacional/TablaNacional';
import TablaPartidos from '../../components/tabla_partidos/TablaPartidos';
import { useDatabase } from '../../context/DatabaseContext';
import { useLoader } from '../../context/LoaderContext';
import './fixture.css';
import { useEffect, useState } from 'react';

export default function Fixture() {
    const {getData} = useDatabase()
    const { setLoader } = useLoader();

    const [tablaZonaA, setZonaA] = useState<any[]>([])
    const [tablaZonaB, setZonaB] = useState<any[]>([])
    const [tablaResultados, setResultados] = useState<any[]>([])
    const [tablaPartidos, setPartidos] = useState<any[]>([])

    
    useEffect(()=>{  
      getTabla('tabla_nacional')
      getPartidos('partidos')
    },[])

    const getTabla = async (columna:string) =>{
      setLoader(true)
      const data : any = await getData(columna)
      setLoader(false)
      setZonaA(data[0].tabla_nacional.zona_a)        
      setZonaB(data[0].tabla_nacional.zona_b)      
        
    }

    const getPartidos = async (columna:string) =>{
      setLoader(true)
      const data : any = await getData(columna)
      setLoader(false)
      setPartidos(data[0].partidos.prox_partidos)        
      setResultados(data[0].partidos.resultados)        
    }
  return (
    <>
    <div className='fondo-img'></div>
    <div className='filtro'></div>
      <div className='container-fix'>
        <div className='container-tables'>
          <div className='table-titulo lucidity'>ZONA A</div>
          <TablaNacional data={tablaZonaA}></TablaNacional>
          <div className='gap'></div>
          <div className='table-titulo lucidity'>ZONA B</div>
          <TablaNacional data={tablaZonaB}></TablaNacional>
          <div className='gap'></div>
        </div>

        <div className='container-tables'>
          <div className='table-titulo lucidity'>PRÓXIMOS PARTIDOS</div>
          <TablaPartidos data={tablaPartidos} columna='Hora'></TablaPartidos>
          <div className='gap'></div>
          <div className='table-titulo lucidity'>RESULTADOS</div>
          <TablaPartidos data={tablaResultados} columna='Res'></TablaPartidos>
          <div className='gap'></div>
        </div>
        

      </div>
    </>

  )
}
