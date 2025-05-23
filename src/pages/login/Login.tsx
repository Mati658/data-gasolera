import './login.css'
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../context/LoaderContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    const { login } = useAuth();
    const { setLoader } = useLoader();

    const usuario = localStorage.getItem('usuario')

    const navigate = useNavigate();
    
    const dialogRef = useRef<HTMLDialogElement>(null);

    const abrirModal = () => {
        dialogRef.current?.showModal();
    };

    const cerrarModal = () => {
        dialogRef.current?.close();
    };


    const loguear = async(e: React.FormEvent) => {
        e.preventDefault();
        if (!usuario ) {
            setLoader(true)
            console.log("===logeandose===");
            let flag = await login(email, password);
            if (!flag) {
                setMensaje('Mail o Contraseña incorrectos');
                abrirModal();
                setLoader(false)
                return;
            }
            setLoader(false)
            navigate('/');

        }
    };

    useEffect(()=>{
        if (usuario) {
            navigate('/');
        }
    })

    return (
        <div className="container-login">

            <dialog ref={dialogRef} className='msj-error'>
                <p>{mensaje}</p>
                <button onClick={cerrarModal}>Continuar</button>
            </dialog>

            <form className="form" onSubmit={loguear}>
                <span className="input-span">
                    <label className="label">Email</label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}
                /></span>
                <span className="input-span">
                    <label className="label">Password</label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}
                /></span>
                <input className="submit" type="submit" value="Log in" />
            </form>
        </div>

    )
}
