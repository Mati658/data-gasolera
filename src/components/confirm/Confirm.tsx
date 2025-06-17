import './confirm.css'

type Props = {
    onConfirm:()=>void
    onCancel:()=>void
}

export default function Confirm({onConfirm, onCancel}: Props) {
  return (
    <div className='container-dialog'>
        <h1>¿Seguro desea eliminarlo?</h1>
        <div className='dialog-btn'>
            <button className="card-button primary" onClick={()=>onConfirm()}>Eliminar</button>
            <button className="card-button secondary" onClick={()=>onCancel()}>Cancelar</button>
        </div>
    </div>
  )
}