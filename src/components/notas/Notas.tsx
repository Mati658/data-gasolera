import { useEffect, useState } from "react";
import { useDatabase } from "../../context/DatabaseContext";
import "./notas.css"
import NotaCaratula from "../nota_caratula/NotaCaratula";

export default function Body() {
    const { getNotas } = useDatabase()
    const [ notas, SetNotas ] = useState([]);

    useEffect(() => {
        getNotas(3).then((res:any)=>{
            SetNotas(res);
            localStorage.setItem('listaNotas', JSON.stringify(notas))
        })
    }, [notas]);

  return (
        <div className="parent">

            {notas.map((item:any, i:number=1)=>(i++,
                <div key={item.id} className={'div'+i}> 
                    <NotaCaratula nota={item} onEliminar={()=>{}}></NotaCaratula>
                </div>
            ))}

            {/* <div className="div2">
                <div className="img-wrapper">
                    <img className="img-grid" src="/Screenshot_8.png" /> 
                    <h1 className="titulo-nota lucidity">
                        <span className="text-effect">BRR BRR PATAPIM </span> 
                    </h1>
                </div>
            </div>

            <div className="div3"> 
                <div className="img-wrapper">
                    <img className="img-grid" src="/Screenshot_7.png" /> 
                    <h1 className="titulo-nota lucidity">
                        <span className="text-effect2">VACA SATURNO SATURNITA</span>
                    </h1>
                </div>
            </div> */}
            
        </div>
  )
}
