import { useEffect, useState } from 'react';
import './controlNotas.css'
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../../context/DatabaseContext';
import NotaCaratula from '../../components/nota_caratula/NotaCaratula';
import { useLoader } from '../../context/LoaderContext';
// import { useStorage } from '../../context/StorageContext';

export default function ControlNotas() {
    const navigate = useNavigate();
    const usuario = localStorage.getItem('usuario')
    const { getNotas } = useDatabase()
    // const { uploadFoto } = useStorage()
    const [ notas, SetNotas ] = useState([]);
    const { setLoader } = useLoader();

    useEffect(()=>{
        // document
        // .querySelector('input[type="file"]')
        // ?.addEventListener('change', handleMultipleUploads);


        if (!usuario) {
            navigate('/');
            return;
        }
        setLoader(true)
        window.scrollTo(0, 0);

        getNotas(-1).then((res:any)=>{
            setLoader(false)
            SetNotas(res);

        })
    },[])

    const eliminarNota = (id: number) => {
            SetNotas(notas.filter((item:any) => item.id !== id));
        };

//     const handleMultipleUploads = async (event: Event) => {
//         const input = event.target as HTMLInputElement;
//         if (!input.files || input.files.length === 0) return;

//         const archivos = Array.from(input.files); // convierte FileList a array

//         const resultados = await Promise.all(
//             archivos.map(async (file) => {
//             const nombreSinExtension = file.name.split('.').slice(0, -1).join('');
//             const url = await uploadFoto(file, nombreSinExtension);
//             return { nombre: file.name, url };
//         })
//      );

//      };

  return (
    <div className='container-control'>
        {/* <input type="file" multiple accept="image/png" /> */}

        {notas.map((item:any)=>(
            <div key={item.id} style={{maxWidth:'200px', minWidth:'200px', maxHeight:'300px', minHeight:'300px'}}>
                <NotaCaratula  nota={item} onEliminar={eliminarNota}></NotaCaratula>
            </div>
        ))}
    </div>
  )
}
