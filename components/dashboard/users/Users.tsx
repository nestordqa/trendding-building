import { getUsers } from '@components/utils/users';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {getUser} from '@components/app/types';


export const Users = () => {

    const { data: users, isLoading } = useQuery(['user'], () => getUsers());
    const [usuarios, setUsuarios] = useState<getUser[]>();

    useEffect(()=>{
        if(users){
            setUsuarios(users)
            console.log(users)
        }
    },[users, usuarios])


    return (
        <div className='w-full h-full bg-gray-500'>
            {
                isLoading ?
                    <h2>Cargando usuarios...</h2>
                :
                usuarios ?
                    usuarios.map((user, idx)=>
                        <div key={idx+user.birthday}>
                            <h1>{user.firstName}</h1>
                        </div>
                    )
                :
                    <h1>No hay usuarios...</h1>               
            }
        </div>
    )
}
