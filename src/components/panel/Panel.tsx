import { useEffect, useRef, useState } from 'react'
import { useDatabase } from '../../context/DatabaseContext'
import Reel from '../reel/Reel'
import Twitch from '../twitch/Twitch'
import Youtube from '../youtube/Youtube'
import './panel.css'
import BtnIcon from '../btn_icon/BtnIcon'

export default function Panel() {
    const {getTabla, update} = useDatabase();
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
        await update('links', {url:link}, url.id);

        cerrarModal();
        setUrlNueva('')
    }

    return (
        <div className="parent-panel">
            <div className="panel-div1">
                <Youtube videoId='PLDg6alCCoFu4z6NSkhhrwWxHgJHPLtOao' playlist={true}></Youtube>
            </div>
            <div className="panel-div2">
                <Twitch url='https://player.twitch.tv/?video=2366292630&parent=data-gasolera.netlify.app&autoplay=false'></Twitch>  
            </div>

            {urls ? (
                <>
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
                </>
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

