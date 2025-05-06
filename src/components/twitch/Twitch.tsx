import './twitch.css'

type Props = {
  url: string;
}

export default function Twitch({url}:Props) {
  return (
    <iframe src={url}  
    frameBorder={0} 
    allowFullScreen={true} 
    height="378"
    width="620"
    className='twitch'
    ></iframe>
  )
}
