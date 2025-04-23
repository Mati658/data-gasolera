import "./youtube.css"
import axios from 'axios';
import { environment } from '../../../env/environment.prod'
import { useEffect, useState } from 'react';
type Props = {
    videoId : string,
    className : any,
}

export default function Youtube({videoId, className = ""}: Props) {
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchVideoTitle = async () => {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${environment.YOUTUBE_API}`;

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
            <iframe className='video' src={`https://www.youtube.com/embed/${videoId}`} frameBorder={0} allowFullScreen></iframe>
            <div className={'righteous-regular titulo-video' + className}>
                <h2>{title}</h2>
            </div>
        </>
    )
}