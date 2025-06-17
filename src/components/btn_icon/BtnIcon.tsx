import './btnIcon.css'

type Props = {
    icon:'edit' | 'delete' | 'check' | 'cancel';
}

export default function BtnIcon({icon}: Props) {
  return (
    <div className='btn-icon'> 
        { icon == 'delete' ? ( 
            <button className="deleteButton">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 50 59"
                className="bin"
                >
                    <path
                        fill="#B5BAC1"
                        d="M0 7.5C0 5.01472 2.01472 3 4.5 3H45.5C47.9853 3 50 5.01472 50 7.5V7.5C50 8.32843 49.3284 9 48.5 9H1.5C0.671571 9 0 8.32843 0 7.5V7.5Z"
                    ></path>
                    <path
                        fill="#B5BAC1"
                        d="M17 3C17 1.34315 18.3431 0 20 0H29.3125C30.9694 0 32.3125 1.34315 32.3125 3V3H17V3Z"
                    ></path>
                    <path
                        fill="#B5BAC1"
                        d="M2.18565 18.0974C2.08466 15.821 3.903 13.9202 6.18172 13.9202H43.8189C46.0976 13.9202 47.916 15.821 47.815 18.0975L46.1699 55.1775C46.0751 57.3155 44.314 59.0002 42.1739 59.0002H7.8268C5.68661 59.0002 3.92559 57.3155 3.83073 55.1775L2.18565 18.0974ZM18.0003 49.5402C16.6196 49.5402 15.5003 48.4209 15.5003 47.0402V24.9602C15.5003 23.5795 16.6196 22.4602 18.0003 22.4602C19.381 22.4602 20.5003 23.5795 20.5003 24.9602V47.0402C20.5003 48.4209 19.381 49.5402 18.0003 49.5402ZM29.5003 47.0402C29.5003 48.4209 30.6196 49.5402 32.0003 49.5402C33.381 49.5402 34.5003 48.4209 34.5003 47.0402V24.9602C34.5003 23.5795 33.381 22.4602 32.0003 22.4602C30.6196 22.4602 29.5003 23.5795 29.5003 24.9602V47.0402Z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                    ></path>
                    <path fill="#B5BAC1" d="M2 13H48L47.6742 21.28H2.32031L2 13Z"></path>
                </svg>
            
                <span className="tooltip">Eliminar</span>
            </button>

        ) : (icon == 'edit' ? (

            <button className="editButton">
                <svg className="bin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#B5BAC1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#B5BAC1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <span className="tooltip">Editar</span>

            </button>
        ) :(icon == 'check' ? (
            <button className="checkButton">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#B5BAC1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#B5BAC1" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>                
                <span className="tooltip">Confirmar</span>
            </button>

        ) :
            <button className="cancelButton">
                <svg fill="#B5BAC1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <style></style> </defs> <path id="cancel" className="cls-1" d="M936,120a12,12,0,1,1,12-12A12,12,0,0,1,936,120Zm0-22a10,10,0,1,0,10,10A10,10,0,0,0,936,98Zm4.706,14.706a0.951,0.951,0,0,1-1.345,0l-3.376-3.376-3.376,3.376a0.949,0.949,0,1,1-1.341-1.342l3.376-3.376-3.376-3.376a0.949,0.949,0,1,1,1.341-1.342l3.376,3.376,3.376-3.376a0.949,0.949,0,1,1,1.342,1.342l-3.376,3.376,3.376,3.376A0.95,0.95,0,0,1,940.706,112.706Z" transform="translate(-924 -96)"></path> </g></svg>
                <span className="tooltip">Cancelar</span>
            </button>
        )) }
    </div>
  )
}