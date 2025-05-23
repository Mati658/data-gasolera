import './tablaPartidos.css';

type Props = {
    data:any | undefined
    columna : string
}

export default function TablaPartidos({data, columna}: Props) {
    let flag = false
    return (
        <div className='container-table-scroll scroll-1'>
            <table className='tabla-liga'>
                <thead>
                <tr className='bg-fila-dk'>
                    <th className='th-liga'>Día</th>
                    <th className='th-liga'>L/V</th>
                    <th className='th-liga'>VS</th>
                    <th className='th-liga'>{columna}</th>
                </tr>
                </thead>

                <tbody>
                    {data?.map((item:any, i=0) => (
                    <tr key={i++} className={`bg-fila-${flag == false ? "lg" : "dk"}`}>
                        <td className='td-liga' key={i+=1}>{item.dia}</td>
                        <td className='td-liga' key={i+=1}>{item['L/V']}</td>
                        <td className='td-liga' key={i+=1}>{item.vs}</td>
                        <td className='td-liga' key={i+=1} style={{backgroundColor: columna=='Res' ? getResultado(item.res, item['L/V'])  : ''}} >{item[columna.toLowerCase()]}</td>
                        {flag=!flag}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function getResultado(goles:string, cancha: 'V' | 'L') {
    const item = goles.split("-");
    const gol1 : number = Number(item[0]);
    const gol2 : number = Number(item[1]);

    if(gol1 == gol2)
        return 'rgb(175, 175, 43)';

    if (cancha == "L") {
        if (gol1 > gol2) {
            return 'rgb(46, 134, 46)';
        }else{
            return 'rgb(138, 46, 46)';
        }
    }else{
        if (gol1 < gol2) {
            return 'rgb(46, 134, 46)';
        }else{
            return 'rgb(138, 46, 46)';
        }
    }
}
