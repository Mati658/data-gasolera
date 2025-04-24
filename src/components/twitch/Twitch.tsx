import './twitch.css'

export default function Twitch() {
  return (
    <iframe src={"https://player.twitch.tv/?video=2366292630&parent=localhost&autoplay=false"}  
    frameBorder={0} 
    allowFullScreen={true} 
    height="378"
    width="620"
    className='twitch'
    ></iframe>

  )
}
