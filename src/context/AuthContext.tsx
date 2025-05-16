// src/context/AuthContext.jsx
import { createClient } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
// import { environment } from '../../env/environment.prod';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

type Props = {
    children:ReactNode,
}

interface AuthContextType {
    usuario: any;
    login:(email:string,password:string) => Promise<boolean>;
    signOut: () => Promise<void>;
    flagLogin:boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [usuario, setUsuario] = useState(null);
  const [flagLogin, setFlagLogin] = useState(false);

  const getState = async () => {
    const { data } = await supabase.auth.getUserIdentities();
    const identity : any = data?.identities?.[0];

    if (identity) {
      localStorage.setItem('usuario', identity.email);
      setUsuario(identity);
      setFlagLogin(true);
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAA")
      return;
    }
    setFlagLogin(false);
  };

  const login = async (email:string, password:string) =>{    
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    if (error) {
      return false;
    }
    
    console.log(data.user?.email)
    if (data.user?.email) {
      localStorage.setItem('usuario', data.user.email);
    }
    return true;
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('usuario');
    window.location.reload();
  };

  useEffect(() => {
    if (!localStorage.getItem('usuario')) {
      getState();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        signOut,
        flagLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("Error context useAuth");
    return context;
};