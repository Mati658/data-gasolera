import Reel from '../reel/Reel'
import Twitch from '../twitch/Twitch'
import Youtube from '../youtube/Youtube'
import './panel.css'

export default function Panel() {

  return (
    <div className="parent-panel">
        <div className="panel-div1">
            <Youtube videoId='PLDg6alCCoFu4z6NSkhhrwWxHgJHPLtOao' playlist={true}></Youtube>
        </div>
        <div className="panel-div2">
            <Twitch url='https://player.twitch.tv/?video=2366292630&parent=https://data-gasolera.netlify.app&autoplay=false'></Twitch>  
        </div>
        <div className="panel-div3">
            <Reel link='https://www.instagram.com/reel/DHzP_fdq8fI/'></Reel>
        </div>
        <div className="panel-div4">
            <Reel link='https://www.instagram.com/reel/DGtm1dkKDG7/'></Reel>
        </div>
        <div className="panel-div5">
            <Reel link='https://www.instagram.com/reel/DIaK1ScuvYf/'></Reel>
        </div>
    </div>
  )
}

