import {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';
import { useRouter } from 'next/router';

import en from '../../public/locale/en';
import es from '../../public/locale/es';

const languageContext = createContext();

export const useT = () =>{
    return useContext(languageContext);
};

const ContextProvider = ({ children }) =>{
    
    const { locale } = useRouter();
    
    const [t, setT] = useState(es);

    useEffect(()=>{
        console.log(locale)
        if(locale === 'en'){
            setT(en)
        }
        if(locale === 'es'){
            setT(es)
        }
    }, [locale])

    return(
        <languageContext.Provider value={t}
        >
            {children}
        </languageContext.Provider>
    );

};

export default ContextProvider;