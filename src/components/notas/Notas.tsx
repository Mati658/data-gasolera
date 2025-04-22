import "./notas.css"

export default function Body() {
  return (
        <div className="parent">

            <div className="div1"> 
                <div className="img-wrapper">
                    <img className="img-grid" src="/Screenshot_9.png" />
                    <h1 className="titulo-nota alfa-slab-one-regular">
                        <span className="text-effect2">TUNG TUNG TUNG SAHUR</span> 
                    </h1>
                </div>
            </div>

            <div className="div2">
                <div className="img-wrapper">
                    <img className="img-grid" src="/Screenshot_8.png" /> 
                    <h1 className="titulo-nota alfa-slab-one-regular">
                        <span className="text-effect">BRR BRR PATAPIM </span> 
                    </h1>
                </div>
            </div>

            <div className="div3"> 
                <div className="img-wrapper">
                    <img className="img-grid" src="/Screenshot_7.png" /> 
                    <h1 className="titulo-nota alfa-slab-one-regular">
                        <span className="text-effect2">VACA SATURTO SATURNITA</span>
                    </h1>
                </div>
            </div>
            
        </div>
  )
}
