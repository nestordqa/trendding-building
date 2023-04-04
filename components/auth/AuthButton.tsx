import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { getStudentByEmail, postStudent } from '../../utils/students';
const AuthButton = () => {

    const {
        user,
        error,
        isLoading
    } = useUser();    
    const router = useRouter();
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
        <button 
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            onClick={()=>router.push('/api/auth/login')}
        >
            Log In
        </button>
    )
}

export default AuthButton;