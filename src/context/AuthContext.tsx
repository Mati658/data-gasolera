// src/context/AuthContext.jsx
import { createClient } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { environment } from '../../env/environment.prod';

const supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);

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
      setUsuario(identity);
      setFlagLogin(true);
      return;
    }
    setFlagLogin(false);
  };

  const login = async (email:string, password:string) =>{    
    console.log(email);
    console.log(password);
    console.log("hola")
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    if (error) {
      return false;
    }

    console.log(data)
    return true;
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  useEffect(() => {
    getState();
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