import './tablaNacional.css';

type Props = {
    data:any | undefined
}

export default function TablaNacional({data}: Props) {
  let flag = false
  console.log(data)
  return (
    <div className='container-liga-scroll'>
      <table className='tabla-liga'>
        <thead>
          <tr className='bg-fila-dk'>
            <th className='th-liga'>#</th>
            <th className='th-liga'>Equipos</th>
            <th className='th-liga'>PTS</th>
            <th className='th-liga'>J</th>
            <th className='th-liga'>Gol</th>
            <th className='th-liga'>+/-</th>
            <th className='th-liga'>G</th>
            <th className='th-liga'>E</th>
            <th className='th-liga'>P</th>
          </tr>
        </thead>

        <tbody>
            {data[0]?.map((item:any, i=0) => (
              <tr key={item.num} className={`bg-fila-${flag == false ? "lg" : "dk"}`}>
                <td className='td-liga' key={i+=1}>{item.num}</td>
                <td className='td-liga-e' key={i+=1}> <img className='img-table-equipo' src={data[1][0][item.num]}/> {item.entity.object.name}</td>
                <td className='td-liga' key={i+=1}>{item.values[3].value}</td>
                <td className='td-liga' key={i+=1}>{item.values[0].value}</td>
                <td className='td-liga' key={i+=1}>{item.values[1].value}</td>
                <td className='td-liga' key={i+=1}>{item.values[2].value}</td>
                <td className='td-liga' key={i+=1}>{item.values[4].value}</td>
                <td className='td-liga' key={i+=1}>{item.values[5].value}</td>
                <td className='td-liga' key={i+=1}>{item.values[6].value}</td>
                {flag=!flag}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
