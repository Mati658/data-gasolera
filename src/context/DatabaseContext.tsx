// src/context/DatabaseContext.jsx
import { createClient } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext } from 'react';

// =================================================PROD==============================================
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);
// ==================================================DEV==============================================
// import { environment } from '../../env/environment.prod'; const supabase = createClient(environment.VITE_SUPABASE_URL, environment.VITE_SUPABASE_KEY);

type Props = {
    children:ReactNode,
}

interface DatabaseContextType {
    getUno : (tabla:string, select:string, id:number) => Promise<false | any[]>;
    getData : (columna:string) => Promise<false | any[]>;
    getNotas : (limite:number) => Promise<false | any[]>;
    getTabla : (tabla:string, select:string, limite:number) => Promise<false | any[]>;
    getInfoEquipo : (equipoId:number) => Promise<false | any[]>;
    altaDB : (tabla:string, datos : any, goles:any) => Promise<boolean>;
    altaGolesDB : (goles:any) => Promise<boolean>;
    bajaDB : (tabla:string, id : number) => Promise<boolean>;
    update : (tabla:string, datos : any, id:number) => Promise<false | any[]>
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export const DatabaseProvider = ({ children }: Props) => {

    const getUno = async (tabla:string, select:string, id:number)=>{
        // console.log(id)
        const data = (await supabase
        .from(tabla)
        .select(select)
        .eq('id', id)).data

        if (data) {
            return data;
        }
        
        // console.log(data);

        return false;
    }
  
    const getData = async (columna:string) => {

        const { data, error } = await supabase
        .from('fixture')
        .select(columna)

        if (data) {
            return data;
        }
        
        console.error(error);

        return false;

    } 

    const getNotas = async(limite:number) =>{
        if (limite == -1) {
            const { data, error } = await supabase
            .from('notas')
            .select('*')
            .order('time', {ascending:false})

            if (data) {
                return data;
            }
            
            console.error(error);

            return false;
        }

        const { data, error } = await supabase
        .from('notas')
        .select('*')
        .limit(limite)
        .order('time', {ascending:false})

        if (data) {
            return data;
        }
        
        console.error(error);

        return false;
    }

    const getTabla = async (tabla:string, select:string = '*', limite:number) => {

        if (limite == -1) {
            const { data, error } = await supabase
            .from(tabla)
            .select(select)
            .order('apellido', {ascending:true})
            if (data) {
                return data;
            }
            
            console.error(error);

            return false;
        }
        
        const { data, error } = await supabase
        .from(tabla)
        .select(select)
        .limit(limite)

        if (data) {
            return data;
        }
        
        console.error(error);

        return false;

    } 

    const getInfoEquipo = async(equipo:number) =>{
        const temperleyId : number = 77

        const { data, error } = await supabase
        .from('partidos')
        .select(`id, fecha, torneo, equipo_local:equipo_local_id ( id, nombre, url ), equipo_visitante:equipo_visitante_id ( id, nombre, url ), 
            goles_local, goles_visitante, goles (id, partido_id, jugador, equipo_id, roja)`)
        .or(`and(equipo_local_id.eq.${temperleyId},equipo_visitante_id.eq.${equipo}),and(equipo_local_id.eq.${equipo},equipo_visitante_id.eq.${temperleyId})`)
        .order('fecha', {ascending:true})
        
        if (data) {
            return data;
        }
        
        console.error(error);

        return false;
    }

    
    const altaDB = async(tabla:string, datos : any, goles:any = null) =>{
        // console.log(datos)
        let {data, error} = (await supabase
        .from(tabla)
        .insert([datos])
        .select())

        if (data != null){
            // console.log(data)
            if (goles) {
                for await (const item of goles) {
                    item.partido_id = data[0].id
                }
                // console.log(goles);
                
                let {error} = (await supabase
                .from('goles')
                .insert(goles))
    
                console.error(error)
    
            }
    
            return false;

        }else{
            console.error(error)
            return true;
        }

    }

    const altaGolesDB = async(goles:any) =>{
        // console.log(goles)
        let {data, error} = (await supabase
        .from('goles')
        .insert(goles)
        .select())

        if (data != null)
            return false;

        console.error(error)
        return true;

    }


    const bajaDB = async(tabla:string, id : number) =>{
        let {data} = (await supabase
        .from(tabla)
        .delete()
        .eq("id", id))

        if (data != null)  
            return true;

        return false;
    }

    const update = async(tabla:string, datos:any, id:number)=>{
        // console.log(datos)
        let data = (await supabase
        .from(tabla)
        .update([datos])
        .eq('id', id)
        .select()).data
    
        // console.log(data)
    
        if (data)  
          return data;
    
        return false;
    }

    return (
        <DatabaseContext.Provider
        value={{
            getUno,
            getData,
            getNotas,
            getTabla,
            getInfoEquipo,
            altaDB,
            altaGolesDB,
            bajaDB,
            update
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