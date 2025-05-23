import { useEffect, useState } from "react";
import { useDatabase } from "../../context/DatabaseContext";
import "./notas.css"
import NotaCaratula from "../nota_caratula/NotaCaratula";
// import { useLoader } from "../../context/LoaderContext";

export default function Body() {
    const { getNotas } = useDatabase()
    const [ notas, SetNotas ] = useState([]);
    // const { setLoader } = useLoader();

    useEffect(() => {
        // setLoader(true)
        getNotas(3).then((res:any)=>{
            // setLoader(false)
            SetNotas(res);
            // console.log("a")
            localStorage.setItem('listaNotas', JSON.stringify(notas))
        })
    }, []);

  return (
        <div className="parent">

            {notas.map((item:any, i:number=1)=>(i++,
                <div key={item.id} className={'div'+i}> 
                    <NotaCaratula nota={item} onEliminar={()=>{}}></NotaCaratula>
                </div>
            ))}            
        </div>
  )
}
