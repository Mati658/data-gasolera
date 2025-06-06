import { createContext, ReactNode, useContext } from "react"
import { createClient } from "@supabase/supabase-js";

// =================================================PROD==============================================
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);
// ==================================================DEV==============================================
// import { environment } from '../../env/environment.prod';const supabase = createClient(environment.VITE_SUPABASE_URL, environment.VITE_SUPABASE_KEY);
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
        
        // console.log(data.publicUrl);
        return data.publicUrl;
      }
      return false;
    }

    const uploadFoto = async(imagen:any, nombre:string) =>{
      const imagenWebp : any = await convertirWebp(imagen);
      const { data, error } = await supabase.storage
          .from('storage')
          .upload(`public/${nombre}.webp`, imagenWebp, {
              upsert: true,
              contentType: 'image/webp',
              cacheControl: '2592000'
      })
      
      if (error) 
          return false;
      console.log(data)

      return getFoto(data?.path);
    }

    const convertirWebp = async(imagen:any) =>{
      return new Promise((resolve, reject) => {
      const img = new Image()
      const reader = new FileReader()

      reader.onload = () => {
        img.src = reader.result as string
      }

      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height

        const ctx = canvas.getContext('2d')
        if (!ctx) return reject('No se pudo crear el contexto')

        ctx.drawImage(img, 0, 0)

        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else reject('Error al convertir a WebP')
        }, 'image/webp', 0.8)
      }

      reader.onerror = reject
      reader.readAsDataURL(imagen)
    })
    }

    const deleteFoto = async(path:string) => {
      // console.log(path)
      const { error } = await supabase.storage
      .from('storage')
      .remove([path])
    

      // console.log(data)
      console.error(error)

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