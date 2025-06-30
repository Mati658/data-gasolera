import TablaNacional from '../../components/tabla_nacional/TablaNacional';
import TablaPartidos from '../../components/tabla_partidos/TablaPartidos';
import { useDatabase } from '../../context/DatabaseContext';
import { useLoader } from '../../context/LoaderContext';
import './fixture.css';
import { useEffect, useState } from 'react';

export default function Fixture() {
    const {getData} = useDatabase()
    const { setLoader, getLoader } = useLoader();

    const [tablaZonaA, setZonaA] = useState<any[]>([])
    const [tablaZonaB, setZonaB] = useState<any[]>([])
    const [tablaResultados, setResultados] = useState<any[]>([])
    const [tablaPartidos, setPartidos] = useState<any[]>([])

    
    useEffect(()=>{  
      window.scrollTo(0, 0);
      getPartidos('partidos')
      getTabla('tabla_nacional', 'imagenes')
    },[])

    const getTabla = async (columna:string, columna2:string) =>{
      const data : any = await getData(columna)
      const imagenes : any = await getData(columna2)
      // console.log(imagenes)
      let zona_a = [data[0].tabla_nacional.zona_a, [imagenes[0].imagenes.zona_a]]
      let zona_b = [data[0].tabla_nacional.zona_b, [imagenes[0].imagenes.zona_b]]
      setZonaA(zona_a)        
      setZonaB(zona_b)      
      setLoader(false)
    }

    const getPartidos = async (columna:string) =>{
      setLoader(true)
      const data : any = await getData(columna)
      setPartidos(data[0].partidos.prox_partidos)        
      setResultados(data[0].partidos.resultados)  
    }

  return (
    <>
    <div className='fondo-img'></div>
    <div className='filtro'></div>
        <div className='container-fix'>

          {!getLoader() && (
            <>
              <div className='container-tables'>
                <div className='table-titulo lucidity'>ZONA A</div>
                <TablaNacional data={tablaZonaA}></TablaNacional>
                <div className='gap'></div>
                
                <div className='table-titulo lucidity'>PRÓXIMOS PARTIDOS</div>
                <TablaPartidos data={tablaPartidos} columna='Hora'></TablaPartidos>
                <div className='gap'></div>
              </div>
              <div className='container-tables'>
                <div className='table-titulo lucidity'>ZONA B</div>
                <TablaNacional data={tablaZonaB}></TablaNacional>
                <div className='gap'></div>
                
                <div className='table-titulo lucidity'>RESULTADOS</div>
                <TablaPartidos data={tablaResultados} columna='Res'></TablaPartidos>
                <div className='gap'></div>
              </div>
            </>
          )}
        </div>
    </>

  )
}
