import "./youtube.css"
import axios from 'axios';
// import { environment } from '../../../env/environment.prod'
import { useEffect, useState } from 'react';
type Props = {
    videoId : string,
    playlist : boolean;
}

export default function Youtube({videoId, playlist}: Props) {
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchVideoTitle = async () => {
            let url : string = "";
            url = playlist ? `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API}` : `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API}`; 

            try {
            const response = await axios.get(url);
            const videoTitle = response.data.items[0].snippet.title;
            setTitle(videoTitle);
            } catch (error) {
            console.error('Error al obtener el título:', error);
            }
        };

        fetchVideoTitle();
    }, [videoId]);


    return (
        <>  
            <iframe className='video' src={playlist ? `https://www.youtube.com/embed?listType=playlist&list=${videoId}` : `https://www.youtube.com/embed/${videoId}`} frameBorder={0} allowFullScreen></iframe>
            <div className={'righteous-regular titulo-video'}>
                <h2>{title}</h2>
            </div>
        </>
    )
}