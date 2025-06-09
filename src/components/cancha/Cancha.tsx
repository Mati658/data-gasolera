import './cancha.css'
// import { pos } from '../../ubicaciones.ts';
import { useEffect, useState } from 'react';

type Props = {
    edit:boolean,
    posPrincipalRecibida: number,
    posSecundarias:number[],
    onSendData:(datos:any) => any,
}

export default function Cancha({edit, posPrincipalRecibida, posSecundarias, onSendData}: Props) {
    const divs : any[] = new Array(35).fill('')
    const [flagPosPrimaria, setFlagposPrimaria] = useState(true);
    const [posPrincipalAlta, setPosPrincipalAlta] = useState<number>(posPrincipalRecibida ? posPrincipalRecibida : 0);
    const [secunds , setSecunds] = useState<number[]>(posSecundarias ? posSecundarias : [])
    // console.log(posPrincipalRecibida)

    useEffect(()=>{
        const primaria = document.getElementById('primaria');
        const secundaria = document.getElementById('secundaria');
        if (primaria && secundaria) {
            setFlagposPrimaria(true)
            primaria.style.transform = 'translateY(-5px)'
            secundaria.style.transform = 'translateY(5px)'
            return
        }
    },[])

    const crearListaSecun = (value:number) =>{
        const posGeted = value;
        let temp:any = secunds;

        if (!secunds.includes(posGeted)) {
            temp = [...secunds, posGeted];
        } else {
            temp = secunds.filter((item: number) => item !== posGeted);
        }
        setSecunds(temp);
        seleccionar(posPrincipalAlta, temp);

    }

    const seleccionar = (principal:number, secunds:number[]) => {
        onSendData(crearData(principal, secunds))
    }

    
    const selectPrimario = (id:number) =>{
        setPosPrincipalAlta(id)
        seleccionar(id, secunds);
    }

    const selectFlag = (flag:boolean) =>{
        const primaria = document.getElementById('primaria');
        const secundaria = document.getElementById('secundaria');
        if (primaria && secundaria) {
            if (flag) {
                setFlagposPrimaria(true)
                primaria.style.transform = 'translateY(-5px)'
                secundaria.style.transform = 'translateY(5px)'
                return
            }
            setFlagposPrimaria(false)
            primaria.style.transform = 'translateY(5px)'
            secundaria.style.transform = 'translateY(-5px)'
        }
    }

    const crearData = (principal:number, secundarios:number[]) =>{
        return {
            "pr": principal, 
            "sc": secundarios
        }
    }

    if (edit) {
        return (
            <div className='container-column-cancha'>
                <div className='container-btn-cancha'>
                    <button type='button' className="submit-alta" id='primaria' onClick={()=>selectFlag(true)}>Pos Primaria</button>
                    <button type='button' className="submit-alta" id='secundaria' onClick={()=>selectFlag(false)}>Pos Secundarias</button>
                </div>

                {flagPosPrimaria ? (
                    <div className='container-cancha'>
                        {divs.map((e, i = 0 )=>(
                            <div key={`${e}${i}`} id={`${i}`} onClick={()=>selectPrimario(i)} className={`div${i+=1} general-grid`}>
                                {posPrincipalAlta == (i) && (console.log(posPrincipalAlta),
                                    <div className={`pj-pr-cancha ${(posPrincipalAlta!=33 && 'center')} `} ></div>
                                )}

                                {secunds.includes(i) && (
                                    secunds.map((item:number)=>(
                                        item == i && <div key={item} className='pj-sc-cancha center' ></div>
                                    ))
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='container-cancha'>
                        {divs.map((e, i = 0 )=>(
                            <div key={`${e}${i}`} id={`${i}`} onClick={()=>crearListaSecun(i)} className={`div${i+=1} general-grid`}>
                                {posPrincipalAlta == (i) && (
                                    <div className={`pj-pr-cancha ${(posPrincipalAlta!=33 && 'center')} `} ></div>
                                )}

                                {secunds.includes(i) && (
                                    secunds.map((item:number)=>(
                                        item == i && <div key={item} className='pj-sc-cancha center' ></div>
                                    ))
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className='container-cancha'>
            {divs.map((e, i = 0 )=>(
                <div key={`${e}${i}`} className={`div${i+=1} general-grid`}>
                    {posPrincipalRecibida == (i) && (
                        <div className={`pj-pr-cancha ${(posPrincipalRecibida!=33 && 'center')} `} ></div>
                    )}
                    
                    {posSecundarias.includes(i) && (
                        posSecundarias.map((item:number)=>(
                            item == i && <div key={item} className='pj-sc-cancha center' ></div>
                        ))
                    )}
                </div>
            ))}
        </div>
    )
}