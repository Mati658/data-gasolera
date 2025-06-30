import { useEffect, useState } from 'react'
import './equipo.css'
import { useLocation } from 'react-router-dom';
import { useDatabase } from '../../context/DatabaseContext';
// import InfoPartido from '../../components/infoPartido/InfoPartido';
import { useLoader } from '../../context/LoaderContext';

export default function Equipo() {
    // const usuario : string | null = localStorage.getItem('usuario')
    const { setLoader, getLoader } = useLoader();
    const location = useLocation()
    const idEquipo = Number(location.pathname.split('historial/')[1]);
    const [equipoNombre, setEquipoNombre] = useState<string>('');
    // const [equipoInfo, setEquipoInfo] = useState<any>();
    const [equipoDatos, setEquipoDatos] = useState<any>();
    const titulos : string[] = ['TOTAL (AMAT+PROF)', 'PROFESIONAL', 'AMATEURISMO'];
    const {getInfoEquipo, getUno} = useDatabase()
    // const meses : any= {
    // enero: 0,
    // febrero: 1,
    // marzo: 2,
    // abril: 3,
    // mayo: 4,
    // junio: 5,
    // julio: 6,
    // agosto: 7,
    // septiembre: 8,
    // octubre: 9,
    // noviembre: 10,
    // diciembre: 11
    // };
    useEffect(()=>{
        window.scrollTo(0, 0);
        setLoader(true)

        getInfoEquipo(idEquipo).then((res:any)=>{
            // console.log(res);
            // const partidosOrdenados = res.sort((a:any, b:any) => {
            //     return parseFecha(a.fecha).getTime() - parseFecha(b.fecha).getTime();
            // });
            
            // setEquipoInfo(partidosOrdenados)
            getDatos(res)
            setLoader(false)
        })
        getUno('equipos', 'nombre', idEquipo).then((res:any)=>{
            setEquipoNombre(res[0].nombre)
            })
    },[])

    // ============ DESCOMENTAR ============
    // const parseFecha = (fechaStr:string) => {

    //     if (fechaStr.toLowerCase().split(" ")[0].length >=4) {
    //         const anio = fechaStr.toLowerCase().split(" ")[0];
    //         return new Date(Number(anio), 1, 1);
    //     }
        
    //     const dia = fechaStr.toLowerCase().split(" ")[0];
    //     const mesStr = fechaStr.toLowerCase().split(" ")[2];
    //     const anio = fechaStr.toLowerCase().split(" ")[4];
        
    //     console.log({dia:dia,mesStr:mesStr,anio:anio})

    //     const mes = meses[mesStr];

    //     return new Date(Number(anio), mes, Number(dia));
    // }

    const getDatos = async(info:any) => {
        // console.log(info)
        let amateur = {
            jugados:0,
            ganados:0,
            perdidos:0,
            empates:0,
            diferencia:0
        };
        let profesional = {
            jugados:0,
            ganados:0,
            perdidos:0,
            empates:0,
            diferencia:0
        };

        for await (const item of info) {
            if (item.equipo_local.nombre == 'Temperley') {    
                // console.log((item.fecha.split('/')[0]).split(' ').pop())
                
                if (Number((item.fecha.split('/')[0]).split(' ').pop()) <= 1931) { //amateur
                    amateur = calcularDatosLocales(item, amateur)
                }

                if (Number((item.fecha.split('/')[0]).split(' ').pop()) > 1931) { //profesional
                    profesional = calcularDatosLocales(item, profesional)
                }
            }
            else{
                if (Number((item.fecha.split('/')[0]).split(' ').pop()) <= 1931) { //amateur
                    amateur = calcularDatosVisitante(item, amateur)
                }

                if (Number((item.fecha.split('/')[0]).split(' ').pop()) > 1931) { //profesional
                    profesional = calcularDatosVisitante(item, profesional)
                }
            }
        }

        amateur.diferencia = amateur.ganados - amateur.perdidos;
        profesional.diferencia = profesional.ganados - profesional.perdidos;

        const total = {
            jugados:info.length,
            ganados: amateur.ganados + profesional.ganados,
            perdidos: amateur.perdidos + profesional.perdidos,
            empates: amateur.empates + profesional.empates,
            diferencia: profesional.diferencia + amateur.diferencia
        }

        const datos = [
            total,
            profesional,
            amateur
        ]
        setEquipoDatos(datos);
        // console.log(datos);
    }

    const calcularDatosLocales = (partido:any, nivel:any)=>{
        nivel.jugados++;
        if (partido.goles_local > partido.goles_visitante) {
            nivel.ganados++;
            return nivel
        }
        if(partido.goles_local < partido.goles_visitante){
            nivel.perdidos++;
            return nivel
        }

        nivel.empates++;
        return nivel
    }

    const calcularDatosVisitante = (partido:any, nivel:any)=>{
        nivel.jugados++;
        if (partido.goles_local < partido.goles_visitante) {
            nivel.ganados++;
            return nivel
        }
        if(partido.goles_local > partido.goles_visitante){
            nivel.perdidos++;
            return nivel
        }

        nivel.empates++;
        return nivel
    }

    // const armarObjecto = (partido:any, local:boolean) =>{
    //     if (local) {
    //         // console.log(partido)
    //         return {
    //             equipo:partido.equipo_local.nombre,
    //             url: partido.equipo_local.url,
    //             goles_num:partido.goles_local,
    //             goles:partido.goles.filter((item:any) => item.equipo_id == partido.equipo_local.id),
    //             id:partido.equipo_local.id,
    //             roja:partido.equipo_local.roja
    //         }
    //     }
    //     return {
    //             equipo:partido.equipo_visitante.nombre,
    //             url: partido.equipo_visitante.url,
    //             goles_num:partido.goles_visitante,
    //             goles:partido.goles.filter((item:any) => item.equipo_id == partido.equipo_visitante.id),
    //             id:partido.goles_visitante.id,
    //             roja:partido.goles_visitante.roja
    //         }
    // }

    // const agregarPartido = () =>{
    //     let data = {
    //         equipo_local:{id:0, nombre:''},
    //         equipo_visitante:{id:0, nombre:''},
    //         fecha:'',
    //         torneo:'',
    //         goles:[],
    //         goles_local:0,
    //         goles_visitante:0,
    //         id:0
    //     }
    //     setEquipoInfo([...equipoInfo, data]);
    // }

    // const eliminarPartido = (id: number) => {
    //     setEquipoInfo(equipoInfo.filter((j:any) => j.id !== id));
    // };

  return (
    <div className='container-equipo'>
          {!getLoader() && (
            <>
            <div className='historial-data'>
                {equipoDatos && equipoDatos.map((item:any,i=0)=>(
                    <div key={i}>
                        <h1 className='titulo-data'>{titulos[i]}</h1>
                        <h4>Jugaron <strong>{item.jugados}</strong> veces</h4>
                        <h4>Temperley ganó <strong>{item.ganados}</strong> veces</h4>
                        <h4>{equipoNombre} ganó <strong>{item.perdidos}</strong> veces</h4>
                        <h4>Empataron <strong>{item.empates}</strong> veces</h4>
                        <h4>{item.diferencia > 0 ? (
                            <>Temperley lleva una diferencia de <strong>{item.diferencia}</strong> partidos</>
                        ): (item.diferencia == 0 ? (
                            <>El historial esta empatado</>
                        ) : <>{equipoNombre} lleva una diferencia de <strong>{Math.abs(item.diferencia)}</strong> partidos</>)
                        }</h4>
                    </div>
                ))}
            </div>


            <div className='historial-info-partido'>

                <h1 className='titulo-data'>PARTIDOS</h1>
                <h2 className='titulo-data'>Proximamente...</h2>
                {/* ========== DESCOMENTAR ========== */}
                {/* <h1 className='titulo-data'>PARTIDOS</h1>
                {equipoInfo && equipoInfo.map((item:any, i=0)=>(
                    <InfoPartido key={i++} fecha={item.fecha} equipoLocal={armarObjecto(item, true)} equipoContrario={equipoNombre}
                    equipoVisitante={armarObjecto(item, false)} torneo={item.torneo} id={item.id} idContrario={idEquipo} onEliminarPartido={eliminarPartido}></InfoPartido>
                ))}

                {usuario && (
                    <button type='button' className="submit-alta" onClick={agregarPartido}>Agregar Partido</button>
                )} */}

            </div>
            </>
          )}


        <div className='gap'></div>
    </div>
  )
}
