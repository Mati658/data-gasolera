import { createContext, ReactNode, useContext, useState } from "react"

type Props = {
    children:ReactNode,
}

interface LoaderContextType {
    setLoader : (flag:boolean) => void,
    getLoader : () => boolean,
    flagLoader: boolean,
}


const LoaderContext = createContext<LoaderContextType | null>(null);


export default function LoaderProvider({ children }: Props) {

    const [flagLoader, setFlagLoader] = useState(false);


    const setLoader = (flag:boolean) =>{
        setFlagLoader(flag);
    }  
    
    const getLoader = () =>{
        return flagLoader;
    }    
    
    return (
        <LoaderContext.Provider
          value={{
            setLoader,
            getLoader,
            flagLoader
          }}
        >
          {children}
        </LoaderContext.Provider>
      );
}


export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) throw new Error("Error context useLoader");
    return context;
};