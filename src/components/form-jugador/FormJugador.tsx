import { useState } from 'react';
import './formJugador.css'
import { Jugador } from '../../classes/Jugador';
import { useStorage } from '../../context/StorageContext';
import { useDatabase } from '../../context/DatabaseContext';
import { useLoader } from '../../context/LoaderContext';

type Props = {
    jugadorEdit:any | null;
    onSubmit:()=>void;
    sendJugador:(jugador:Jugador)=>void
}

export default function FormJugador({jugadorEdit = null, onSubmit, sendJugador}:Props) {
    // console.log(jugadorEdit)
    const { uploadFoto } = useStorage()
    const { altaDB, update } = useDatabase()
    const { setLoader } = useLoader();

    const [flagModal, SetFlagModal] = useState(false)
    const [flagImagenEdit, SetFlagImagenEdit] = useState(false)
    const [mensaje, SetMensaje] = useState('')
    const [claseModal, SetClaseMOdal] = useState('success')
    const [svgModal, setSvgModal] = useState<any>()

    const [imagen, SetImagen] = useState(jugadorEdit != null ? jugadorEdit.imagen : '')
    const [imagenURL, SetImagenURL] = useState(jugadorEdit != null ? jugadorEdit.imagen : '')
    
    const [nombre, SetNombre] = useState<string>(jugadorEdit != null ? jugadorEdit.nombre : '')
    const [apellido, SetApellido] = useState(jugadorEdit != null ? jugadorEdit.apellido : '')
    const [puesto, SetPuesto] = useState<string|number>(jugadorEdit != null ? jugadorEdit.puesto : 0)
    const [nacimiento, SetNacimiento] = useState(jugadorEdit != null ? jugadorEdit.nacimientoSinFormatear : '')
    const [nacionalidad, SetNacionalidad] = useState(jugadorEdit != null ? jugadorEdit.nacionalidad : '')
    const [lugarNacimiento, SetLugarNacimiento] = useState(jugadorEdit != null ? jugadorEdit.lugarNacimiento : '')
    const [altura, SetAltura] = useState(jugadorEdit != null ? jugadorEdit.altura : '')
    const [peso, SetPeso] = useState(jugadorEdit != null ? jugadorEdit.peso.split(" ")[0] : '')
    const [dato1, SetDato1] = useState(jugadorEdit != null ? jugadorEdit.datos['dato1'] : '')
    const [dato2, SetDato2] = useState(jugadorEdit != null ? jugadorEdit.datos['dato2'] : '')
    const [dato3, SetDato3] = useState(jugadorEdit != null ? jugadorEdit.datos['dato3'] : '')


    const obtenerImagen = ($event : any) => {
        if (jugadorEdit!=null) {
            SetFlagImagenEdit(true);
        }

        //---Para SUBIR la imagen---
        SetImagen($event.target.files[0]);        
    
        //---Para MOSTRAR la imagen---
        const fileURL = $event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
          SetImagenURL(reader.result as string);
        };
    
        reader.readAsDataURL(fileURL);
    }

    const verificar = () =>{
        setLoader(true)
        if (imagen != "" && (
            nombre && apellido && puesto != 0 && nacimiento && nacionalidad && lugarNacimiento && altura && peso)) {
                if (puesto != 'AA Cuerpo Técnico') {
                    if (dato1 && dato2 && dato3) {
                        return jugadorEdit != null ? updateJugador() : crearJugador()
                    }
                }
            return jugadorEdit != null ? updateJugador() : crearJugador()
        }
        setLoader(false)
        SetClaseMOdal('warning')
        setSvgModal(<svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            ></path>
          </svg>)
        SetMensaje('¡Verifique los campos!')
        SetFlagModal(true)
        return setTimeout(() => {
            SetFlagModal(false)
        }, 3100);

    }

    const crearJugador = async() =>{
        let url : string | false = await uploadFoto(imagen, nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "")+apellido.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
        if (url) {

            const datos = {
                dato1:dato1,
                dato2:dato2,
                dato3:dato3,
            }

            const jugador = new Jugador(nombre, apellido, String(puesto), nacimiento, lugarNacimiento, `${altura} Mts`, `${peso} Kgs`, nacionalidad, url, datos)
            
            if(await altaDB('plantel', jugador.toJson())){
                setLoader(false)
                limpiar();
                SetMensaje('¡Jugador Agregado!')
                SetClaseMOdal('success')
                setSvgModal(<svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    ></path>
                </svg>)
                SetFlagModal(true)
                return setTimeout(() => {
                    SetFlagModal(false)
                }, 3100);
            }
            setLoader(false)
            limpiar();
            SetClaseMOdal('error')
            setSvgModal(<svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                ></path>
              </svg>)
            SetMensaje('¡Error al agregar!')
            SetFlagModal(true)
            return setTimeout(() => {
                SetFlagModal(false)
            }, 3100);
        }   
    }

    const updateJugador = async() =>{
        let url : string | false = imagenURL
        if (flagImagenEdit) {
            setLoader(true)
            url = await uploadFoto(imagen, nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "")+apellido.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
        }
        if (url) {
            const datos = {
                dato1:dato1,
                dato2:dato2,
                dato3:dato3,
            }
            const jugador = new Jugador(nombre, apellido, String(puesto), nacimiento, lugarNacimiento, `${altura}`, `${peso} Kgs`, nacionalidad, url,datos)
            
            if(await update('plantel', jugador.toJson(), jugadorEdit.id)){
                setLoader(false)
                limpiar();
                SetMensaje('¡Jugador Modificado!')
                SetClaseMOdal('success')
                setSvgModal(<svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    ></path>
                </svg>)
                SetFlagModal(true)
                setTimeout(() => {
                    SetFlagModal(false)
                }, 3100);
                sendJugador(jugador)
                onSubmit();
                return;
            }
            setLoader(false)
            limpiar();
            SetClaseMOdal('error')
            setSvgModal(<svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                ></path>
              </svg>)
            SetMensaje('¡Error al modificar!')
            SetFlagModal(true)
            setTimeout(() => {
                SetFlagModal(false)
            }, 3100);
            onSubmit();
            return;
        }   
        setLoader(false)
    }

    const limpiar = () =>{
        SetNombre('');
        SetApellido('');
        SetPuesto(0);
        SetNacimiento('');
        SetNacionalidad('');
        SetLugarNacimiento('');
        SetAltura('');
        SetPeso('');
        SetImagen('');
        SetImagenURL('');
        SetFlagImagenEdit(true);

    }

  return (
    <div>  
        {flagModal ? ( 
            <div className='modal'>
                <ul className="notification-container">
                <li className={`notification-item ${claseModal}`}>
                    <div className="notification-content">
                    <div className="notification-icon">
                        {svgModal}
                    </div>
                    <div className="notification-text">{mensaje}</div>
                    </div>
                    <div className="notification-progress-bar"></div>
                </li>
                </ul>
            </div>  
            ) : (<></>)}
        

        <form className="form-alta">
            <p className="title-alta">Agregar Jugador </p>
            <div className="flex-alta">
            <label>
                <input value={nombre} className="input-alta" type="text" placeholder='' required onChange={(e) => SetNombre(e.target.value)} />
                <span>Nombre</span>
            </label>
            <label>
                <input value={apellido} className="input-alta" type="text"  placeholder='' required onChange={(e) => SetApellido(e.target.value)} />
                <span>Apellido</span>
            </label>
            </div>  

            <div className="flex-alta">
                <label>
                    <select value={puesto} className='input-alta' name="" onChange={(e) => SetPuesto(e.target.value)}>
                        <option value="0">Elegir puesto</option>
                        <option value="Arquero">Arquero</option>
                        <option value="Defensor">Defensor</option>
                        <option value="Mediocampista">Mediocampista</option>
                        <option value="Delantero">Delantero</option>
                        <option value="AA Cuerpo Técnico">Cuerpo Técnico</option>
                    </select>
                    <span>Puesto</span>
                </label>
                <label>
                    <input value={nacimiento} className="input-alta" type="date" placeholder='' required onChange={(e) => SetNacimiento(e.target.value)} />
                    <span>Nacimiento</span>
                </label>
            </div>  
        
            <div className="flex-alta">   
                <label>
                    <input value={nacionalidad} className="input-alta" type="text"  placeholder='' required onChange={(e) => SetNacionalidad(e.target.value)} />
                    <span>Nacionalidad</span>
                </label>
                <label>
                    <input value={lugarNacimiento} className="input-alta" type="text"  placeholder='' required onChange={(e) => SetLugarNacimiento(e.target.value)} />
                    <span>Lugar De Nacimiento</span>
                </label>
            </div> 

            <div className="flex-alta">
                <label>
                    <input value={altura} className="input-alta" type="text" placeholder='' required onChange={(e) => SetAltura(e.target.value)} />
                    <span>Altura</span>
                </label>
                <label>
                    <input value={peso} className="input-alta" type="number"  placeholder='' required onChange={(e) => SetPeso(e.target.value)} />
                    <span>Peso</span>
                </label>
            </div> 

            {puesto != 'AA Cuerpo Técnico' ? (
                <div className="flex-alta">
                    <label>
                        <input value={dato1} className="input-alta" type="text" placeholder='' required onChange={(e) => SetDato1(e.target.value)} />
                        <span>{puesto == 'Arquero' ? 'Atajadas' : 'Goles'}</span>
                    </label>
                    <label>
                        <input value={dato2} className="input-alta" type="number"  placeholder='' required onChange={(e) => SetDato2(e.target.value)} />
                        <span>{puesto == 'Arquero' ? 'Arcos en Cero' : 'Asistencias'}</span>
                    </label>
                    <label>
                        <input value={dato3} className="input-alta" type="number"  placeholder='' required onChange={(e) => SetDato3(e.target.value)} />
                        <span>Partidos Jugados</span>
                    </label>
                </div> 
            ) : (<></>)}

            <label htmlFor="file" className="custum-file-upload">
                <div >
                    {
                        imagenURL != '' ? (
                            <img src={imagenURL} className="icon-img" />
                        ) : (
                            <svg viewBox="0 0 24 24" fill='' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill='' /> </g></svg>
                    )}

                </div>
                <div className="text">
                    <span>Click para subir la imagen</span>
                </div>
                <input id="file" type="file" onChange={(e) => obtenerImagen(e)}/>
            </label>
            
            <button type='button' className="submit-alta" onClick={verificar}>Subir</button>
        </form>
    </div>
  )
}
