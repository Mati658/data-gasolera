import { useLocation } from 'react-router-dom';
import { useLoader } from '../../context/LoaderContext'
import './loader.css'

export default function Loader() {
  const {flagLoader} = useLoader();
  const location = useLocation();

  if (location.pathname == '/') {
    return (
      <div className={flagLoader ? 'loader-home background-loader' : 'hidden'}>
          <div className='conatiner-loader'>
              <img src={Boolean(localStorage.getItem('theme')) ? '/loader.png' : "/loader_dk.png"} className="img-loader" />
              <p className='pulse-loader'></p>
          </div>
      </div>
    )
  }
  return (
    <div className={flagLoader ? 'loader' : 'hidden'}>
        <div className='conatiner-loader'>
            <img src={Boolean(localStorage.getItem('theme')) ? '/loader.png' : "/loader_dk.png"} className="img-loader" />
            <p className='pulse-loader'></p>
        </div>
    </div>
  )
}
