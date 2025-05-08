import "./button.css"

type Props = {
    text:string
    textColor:string,
    backgroundColor : string,
}

export default function Button({text}: Props) {
  return (
    <button className="btn">{text}</button>
  )
}