import { createContext, ReactNode, useContext } from "react"
import { environment } from "../../env/environment.prod";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);

type Props = {
    children:ReactNode,
}

interface StorageContextType {
    getFoto : (path:string|undefined) => string | false
    uploadFoto : (imagen:any, nombre:string) => Promise<string | false>;
    deleteFoto : (path:string) => Promise<boolean>;
}


const StorageContext = createContext<StorageContextType | null>(null);


export default function StorageProvider({ children }: Props) {

    const getFoto = (path:string|undefined) =>{
      if (path) { 
        const { data } = supabase.storage
        .from('storage')
        .getPublicUrl(path);
        
        console.log(data.publicUrl);
        return data.publicUrl;
      }
      return false;
    }

    const uploadFoto = async(imagen:any, nombre:string) =>{
      const { data, error } = await supabase.storage
          .from('storage')
          .upload(`public/${nombre}.png`, imagen, {
              upsert: true,
              contentType: 'image/jpeg/jpg/png',
      })
      
      if (error) 
          return false;
      

      return getFoto(data?.path);
    }

    const deleteFoto = async(path:string) => {
      console.log(path)
      const { data, error } = await supabase.storage
      .from('storage')
      .remove([path])
    

      console.log(data)
      console.log(error)

      if (error) {
        return false;
      }
      return true;
    }
    
    return (
        <StorageContext.Provider
          value={{
            getFoto,
            uploadFoto,
            deleteFoto
          }}
        >
          {children}
        </StorageContext.Provider>
      );
}


export const useStorage = () => {
    const context = useContext(StorageContext);
    if (!context) throw new Error("Error context useStorage");
    return context;
};