// src/context/AuthContext.jsx
import { createClient } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { environment } from '../../env/environment.prod';

const supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);

export const ThemeContext = createContext({
    
  });

type Props = {
    children:ReactNode,
}

interface AuthContextType {
    usuario: any;
    usuarioDB: any;
    sesion: any;
    flagLogin: boolean;
    handleSignInWithGoogle: (response: any) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [usuario, setUsuario] = useState(null);
  const [usuarioDB, setUsuarioDB] = useState(null);
  const [sesion, setSesion] = useState(null);
  const [flagLogin, setFlagLogin] = useState(false);

  const getState = async () => {
    const { data } = await supabase.auth.getUserIdentities();
    const identity : any = data?.identities?.[0];

    if (identity) {
      setUsuario(identity);
      const userDB = await getUsuarioDB(identity.email);
      if (userDB) {
        setUsuarioDB(userDB[0]);
      }
    }
  };

  const getUsuarioDB = async (email:string) => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email);

    if (error) {
      console.error(error);
      return false;
    }

    return data;
  };

  const handleSignInWithGoogle = async (response:any) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
    });

    const sessionResult : any = data ?? error;
    setSesion(sessionResult);
    setFlagLogin(!data);
    await getState();
  };

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
        usuarioDB,
        sesion,
        flagLogin,
        handleSignInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    return context;
};