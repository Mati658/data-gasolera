import Youtube from '../youtube/Youtube'
import './panel.css'

export default function Panel() {

  return (
    <div className="parent-panel">
        <div className="panel-div1">
            <Youtube videoId='Hcs7a9y1w4Y'></Youtube>
        </div>
        <div className="panel-div2">
            <Youtube videoId='ZHqDE9TM8kE'></Youtube>
        </div>
        <div className="panel-div3">
            <Youtube videoId='2EpHLQYcqOM'></Youtube>
        </div>
        <div className="panel-div4">
            <Youtube videoId='THoyU07y9UA'></Youtube>
        </div>
        <div className="panel-div5">
            <Youtube videoId='t7a_gUMvP4g'></Youtube>
        </div>
    </div>
  )
}

