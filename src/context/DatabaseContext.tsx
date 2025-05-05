// src/context/DatabaseContext.jsx
import { createClient } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { environment } from '../../env/environment.prod';

const supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);

type Props = {
    children:ReactNode,
}

interface DatabaseContextType {
    getData:(columna:string) => Promise<false | any[]>;
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export const DatabaseProvider = ({ children }: Props) => {
  
    const getData = async (columna:string) => {

        const { data, error } = await supabase
        .from('fixture')
        .select(columna)

        if (data) {
            return data;
        }
        
        console.log(error);

        return false;

    } 

    return (
        <DatabaseContext.Provider
        value={{
            getData
        }}
        >
        {children}
        </DatabaseContext.Provider>
    );
};

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context) throw new Error("Error context useAuth");
    return context;
};