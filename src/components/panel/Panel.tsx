import { useEffect, useRef, useState } from 'react'
import { useDatabase } from '../../context/DatabaseContext'
import Reel from '../reel/Reel'
import Twitch from '../twitch/Twitch'
import Youtube from '../youtube/Youtube'
import './panel.css'
import BtnIcon from '../btn_icon/BtnIcon'
import { useLoader } from '../../context/LoaderContext'

export default function Panel() {
    const {getTabla, update} = useDatabase();
    const { setLoader } = useLoader();
    const [urls, setUrls] = useState<any>();
    const [url, setUrl] = useState<any>('');
    const [urlNueva, setUrlNueva] = useState('');
    const usuario : string | null = localStorage.getItem('usuario')
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(()=>{
        getTabla('links', '*', 3).then((res:any)=>{
            setUrls(res)
        })
    },[])

    const abrirModal = () => {
        dialogRef.current?.showModal();
    };

    const cerrarModal = () => {
        dialogRef.current?.close();
    };

    const updateUrl=async (link:string)=>{
        setLoader(true)

        await update('links', {url:link}, url.id);
        
        setLoader(false)
        cerrarModal();
        setUrlNueva('')
    }

    return (
        <div className="container-panel">
            <div className='gap'></div>
            <div className="panel-div1">
                <div style={{width:'100%', height:'100%'}}>
                    <div className={'righteous-regular titulo-video'}>
                        <h2>Streams Entrevistas</h2>
                    </div>
                    <Youtube videoId='PLDg6alCCoFu4z6NSkhhrwWxHgJHPLtOao' playlist={true}></Youtube>
                </div>
                    <Twitch url='https://player.twitch.tv/?video=2366292630&parent=data-gasolera.netlify.app&autoplay=false'></Twitch>  
                    {/* <div style={{width:'100%', height:'100%'}}>
                    </div> */}
            </div>
            
            {urls ? (
                <div className='parent-panel'>
                    <div className="panel-div3">
                        {usuario ? (
                            <div className='container-btns-reel'>
                                <div onClick={()=>{abrirModal(); setUrl(urls[0])}}> <BtnIcon icon='edit'/> </div>
                            </div>
                        ) : ( <></> )}
                        <Reel link={urls[0] ? `https://www.instagram.com/reel/${urls[0].url}/` : 'https://www.instagram.com/reel/DJkQ8Obyynn/'}></Reel>
                    </div>
                    <div className="panel-div4">
                        {usuario ? (
                            <div className='container-btns-reel'>
                                <div onClick={()=>{abrirModal(); setUrl(urls[1])}}> <BtnIcon icon='edit'/> </div>
                            </div>
                        ) : ( <></> )}
                        <Reel link={ urls[1] ? `https://www.instagram.com/reel/${urls[1].url}/` : 'https://www.instagram.com/reel/DJkQ8Obyynn/'}></Reel>
                    </div>
                    <div className="panel-div5">
                        {usuario ? (
                            <div className='container-btns-reel'>
                                <div onClick={()=>{abrirModal(); setUrl(urls[2])}}> <BtnIcon icon='edit'/> </div>
                            </div>
                        ) : ( <></> )}
                        <Reel link={urls[2] ? `https://www.instagram.com/reel/${urls[2].url}/` : 'https://www.instagram.com/reel/DJkQ8Obyynn/'}></Reel>
                    </div> 
                </div>
            ) : (<></>)}
            <dialog ref={dialogRef} className='msj-error'>
                <label >ID del Reel. ¡¡LINK NO!!</label><br />
                <input value={urlNueva} className="input-alta" type="text" placeholder='DJkMh21Khy4' required onChange={(e) => setUrlNueva(e.target.value)} />
                <br />
                <button style={{backgroundColor:'red'}} onClick={()=>{cerrarModal()}}>Cancelar</button>
                <button onClick={()=>{updateUrl(urlNueva) ;cerrarModal()}}>Continuar</button>
            </dialog>
        </div>
    )
}

