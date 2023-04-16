import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useT } from '../ContextProvider/LanguagesProvider';

const AuthButton = (props:any) => {

    const {
        user,
        error,
        isLoading
    } = useUser();  
    
    const t = useT();

    const router = useRouter();
    const { asPath } = useRouter();
    if(user){
        return(
            <button 
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onClick={()=>router.push('/api/auth/logout')}
            >
                Log Out
            </button>
        )
    }
    if(isLoading){
        return <div>Loading user...</div>
    }
    return(

        <>
            <Link href={asPath} locale={'es'}>
                ES
            </Link>
            <Link href={asPath} locale={'en'}>
                EN
            </Link>
            {
                t.login
            }
        </>
        // <button 
        //     className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-xl"
        //     onClick={()=>router.push('/api/auth/login')}
        // >
        //     {props.locales}
        // </button>
    )
}

export default AuthButton;