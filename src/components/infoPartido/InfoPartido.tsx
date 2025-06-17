import { useState } from 'react';
import BtnIcon from '../btn_icon/BtnIcon';
import './infoPartido.css'
import { useDatabase } from '../../context/DatabaseContext';
import { useLoader } from '../../context/LoaderContext';
import Confirm from '../confirm/Confirm';

type Props = {
    fecha:string,
    equipoLocal:any,
    equipoVisitante:any,
    torneo:string,
    equipoContrario:string,
    idContrario:number,
    id:number,
    onEliminarPartido:(id:number)=> void
}

export default function InfoPartido({fecha, equipoLocal, equipoVisitante, torneo, id, onEliminarPartido, equipoContrario, idContrario}: Props) {
  const {altaDB, altaGolesDB, update, bajaDB} = useDatabase()
  const { setLoader } = useLoader();
  const usuario : string | null = localStorage.getItem('usuario')
  const [flagEdit, setFlagEdit] = useState<boolean>(false);
  const [flagDialog, setFlagDialog] = useState<boolean>(false);
  const [inputsLocal, setInputsLocal] = useState<any[]>(equipoLocal.goles);
  const [inputsVisitante, setInputsVisitante] = useState<any[]>(equipoVisitante.goles);

  const [equipoLocalNombre, setLocalNombre] = useState<string>(equipoLocal.equipo);
  const [equipoVisitanteNombre, setVisitanteNombre] = useState<string>(equipoVisitante.equipo);
  
  const [equipoLocalGoles, setLocalGoles] = useState<string>(equipoLocal.goles_num);
  const [equipoVisitanteGoles, setVisitanteGoles] = useState<string>(equipoVisitante.goles_num);

  const [fechaActualizada, setFechaActualizada] = useState<string>(fecha);
  const [torneoActualizado, setTorneoActualizado] = useState<string>(torneo);
  
  const eliminarJugador = async(i:number, local:boolean) =>{
    console.log(i)
    if (local) {       
      setInputsLocal(prev => prev.filter((_, index) => index !== i));
      return
    }
    setInputsVisitante(prev => prev.filter((_, index) => index !== i));
  }


  const eliminarPartido = async() =>{
    console.log("lol")
    setFlagDialog(false);
    onEliminarPartido(id);
    setLoader(true)
    await bajaDB('partidos', id)

    const goles :any[]= [...inputsLocal, ...inputsVisitante];

    goles.map(gol =>
      bajaDB('goles', gol.id)
    ),

    setLoader(false)

    // await bajaDB('plantel', jugador.id);
    // await deleteFoto(jugador.imagen.split('public/storage/')[1]);
    // onEliminar(jugador.id);
  }

  const editarPartido = async() =>{
    setLoader(true)
    const partido = {
      equipo_local_id: equipoLocalNombre == 'Temperley' ? 77 : idContrario,
      equipo_visitante_id: equipoVisitanteNombre == 'Temperley' ? 77 : idContrario,
      fecha:fechaActualizada,
      torneo:torneoActualizado,
      goles_local:Number(equipoLocalGoles),
      goles_visitante:Number(equipoVisitanteGoles),
    }
    const goles :any[]= [...inputsLocal, ...inputsVisitante];
    console.log(partido)

    if (id == 0) {
      await subirPartido(partido, goles);
      setLoader(false)
      setFlagEdit(false)
      return
    }
    await updatePartido(partido, goles);
    setLoader(false)
    setFlagEdit(false)
  }

  const subirPartido = async(partido:any, goles:any[]) =>{
    await altaDB('partidos', partido, goles);
  }

  const updatePartido = async(partido:any, goles:any[]) =>{
    await update('partidos',partido, id)

    const golesOriginales :any[]= [...equipoLocal.goles, ...equipoVisitante.goles];

    const golesAActualizar = goles.filter(g => g.id); // tienen id
    const golesANuevos = goles.filter(g => !g.id); // sin id → nuevos

    const idsNuevos = goles.filter(g => g.id).map(g => g.id);
    const golesAEliminar = golesOriginales.filter(g => !idsNuevos.includes(g.id));

    await Promise.all([
      ...golesAActualizar.map(gol =>
        update('goles', {jugador: gol.jugador, equipo_id: gol.equipo_id }, gol.id)
      ),
      ...golesAEliminar.map(gol =>
        bajaDB('goles', gol.id)
      ),
      golesANuevos.length > 0 && altaGolesDB(golesANuevos)
    ]);
  }

  const agregarInputLocal = async() =>{
    let data = {
      equipo_id:equipoLocalNombre == 'Temperley' ? 77 : idContrario,
      jugador:'',
      partido_id:id
    }
    setInputsLocal([...inputsLocal, data]);
  }

  const agregarInputVisitante = async() =>{
    let data = {
      equipo_id:equipoVisitanteNombre == 'Temperley' ? 77 : idContrario,
      jugador:'',
      partido_id:id
    }
    setInputsVisitante([...inputsVisitante, data]);
  }

  if (flagEdit) {
    return(
      <div className='container-info-partido'>
        <div className='container-btns'>
          <div onClick={()=>setFlagEdit(false)}> <BtnIcon icon='cancel'/> </div>
          <div onClick={editarPartido}> <BtnIcon icon='check'/> </div>
        </div>
      <table>
        <thead>
          <tr>
            <th colSpan={4} style={{background:'#3f94a5'}}>
              <input className='input-titulo' placeholder='Fecha' type="text" onChange={(e) => {setFechaActualizada(e.target.value);}} value={fechaActualizada} />
              <input className='input-titulo' placeholder='Torneo' type="text" onChange={(e) => {setTorneoActualizado(e.target.value);}} value={torneoActualizado} />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{padding:'5px 10px', width:'150px', background:'#0b65ff'}}>
              <select className='select-equipo' value={equipoLocalNombre != '' ? (equipoLocalNombre == 'Temperley' ? '77' : idContrario) : ''} onChange={(e) => {setLocalNombre(e.target.value == '77' ? 'Temperley' : equipoContrario);}}>
                <option value="-1">Equipo</option>
                <option value="77">Temperley</option>
                <option value={idContrario}>{equipoContrario}</option>
              </select>
            </td>
            <td style={{fontSize:'2rem',padding:'5px', width:'50px', background:'#d9d9d9'}}>
              <input className='input-goles-num' type="number" onChange={(e) => {setLocalGoles(e.target.value);}} value={equipoLocalGoles} />
            </td>
            <td style={{fontSize:'2rem', width:'50px', background:'#d9d9d9'}}>
              <input className='input-goles-num' type="number" onChange={(e) => {setVisitanteGoles(e.target.value);}} value={equipoVisitanteGoles} />
            </td>
            <td style={{padding:'5px 10px', width:'150px', background:'#0b65ff'}}>
              <select className='select-equipo' value={equipoVisitanteNombre != '' ? (equipoVisitanteNombre == 'Temperley' ? '77' : idContrario) : ''} onChange={(e) => {setVisitanteNombre(e.target.value == '77' ? 'Temperley' : equipoContrario);}}>
                <option value="-1">Equipo</option>
                <option value="77">Temperley</option>
                <option value={idContrario}>{equipoContrario}</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan={2} rowSpan={1} className='td-equipo' style={{textAlign:'left', padding:'15px 10px'}}>
              {inputsLocal && inputsLocal.map((item:any, i=0)=>(console.log(item),
                <>
                  <div style={{position:'relative'}} >
                    <input key={i} className='input-jugadores' type="text" 
                    onChange={(e) => {
                      const updated = [...inputsLocal];
                      updated[i++] = { ...item, jugador: e.target.value };
                      setInputsLocal(updated);
                    }} 
                    value={item.jugador}/>
                    <div className='btn-delete' onClick={()=>eliminarJugador(i, true)}>
                      <BtnIcon icon='delete'/> 
                    </div>
                  </div>
                </>
              ))}

              <button className="button" type="button" onClick={agregarInputLocal}>
                <span className="button__text">Agregar</span>
                <span className="button__icon"><svg className="svg" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
              </button>
            </td>

            <td colSpan={2} rowSpan={1} className='td-equipo' style={{textAlign:'left', padding:'15px 10px'}}>
              {inputsVisitante && inputsVisitante.map((item:any, i=0)=>(
                <>
                  <div style={{position:'relative'}}>
                    <input key={i} className='input-jugadores' type="text"  
                    onChange={(e) => {
                      const updated = [...inputsVisitante];
                      updated[i++] = { ...item, jugador: e.target.value };
                      setInputsVisitante(updated);
                    }} 
                    value={item.jugador}/>
                    <div className='btn-delete' onClick={()=>eliminarJugador(i, false)}>
                      <BtnIcon icon='delete'/> 
                    </div>
                  </div>
                </>
              ))}

              <button className="button" type="button" onClick={agregarInputVisitante}>
                <span className="button__text">Agregar</span>
                <span className="button__icon"><svg className="svg" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
              </button>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
    )
  }
  return (
    <div className='container-info-partido'>

      {flagDialog && (
        <Confirm onConfirm={()=>eliminarPartido()} onCancel={()=>setFlagDialog(false)}></Confirm>
      )}
      {usuario && (
        <div className='container-btns'>
          <div onClick={()=>setFlagDialog(true)}> <BtnIcon icon='delete'/> </div>
          <div onClick={()=>setFlagEdit(true)}> <BtnIcon icon='edit'/> </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th colSpan={4} style={{background:'#3f94a5'}}><h3>{fechaActualizada} - {torneoActualizado}</h3></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{padding:'5px 10px', width:'150px', background:'#0b65ff'}}>{equipoLocalNombre}</td>
            <td style={{fontSize:'2rem', width:'50px', background:'#d9d9d9'}}>{equipoLocalGoles}</td>
            <td style={{fontSize:'2rem', width:'50px', background:'#d9d9d9'}}>{equipoVisitanteGoles}</td>
            <td style={{padding:'5px 10px', width:'150px', background:'#0b65ff'}}>{equipoVisitanteNombre}</td>
          </tr>
          <tr>
            <td colSpan={2} rowSpan={1} className='td-equipo' style={{borderBottomLeftRadius:'50px'}}>
              {inputsLocal && inputsLocal.map((item:any, i=0)=>(
                <h4 key={i++}>{item.jugador}</h4>
              ))}
            </td>

            <td colSpan={2} rowSpan={1} className='td-equipo' style={{borderBottomRightRadius:'50px'}}>
              {inputsVisitante && inputsVisitante.map((item:any, i=0)=>(
                <h4 key={i++}>{item.jugador}</h4>
              ))}
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  )
}