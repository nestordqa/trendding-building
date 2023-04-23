import { NextComponentType } from 'next';
import React, {useState, useEffect} from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useQuery } from 'react-query';
import { useUsers } from '@components/components/ContextProvider/ContextProvider';
import { useT } from "@components/components/ContextProvider/LanguagesProvider";


const getUserById = async(id : String) =>{
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    const user = await response.json();
    
    if(!user){
        return 'There is no data';
    };
    return user;
};

const MyCourses: NextComponentType = () => {

    const t = useT();
    const { user, isLoading: isLoadingU } = useUser();
    const [courses, setCourses] = useState();
    const [withOut, setWithOut] = useState(true);
    const usuario = useUsers();

    let id: string = ''
    if (user && user.sub && usuario) {
        id = usuario
    }
    const { data: dbUser, isLoading } = useQuery(['user', id], () =>
        getUserById(id)
    )

    useEffect(()=>{
        if(dbUser && !isLoading){

            if(dbUser.student){
                console.log(dbUser.student)

                if(dbUser.student.courses !== undefined){
                    setCourses(dbUser.student.courses);
                    setWithOut(false)
                }
                if(dbUser.student.courses === undefined){
                    setWithOut(true)
                }
            }
        }
    },[dbUser, isLoading, courses])



    return (
        <>
            {
                isLoading ?
                    <h1>Cargando cursos...</h1>
                :
                withOut ?
                    <h1>
                        Sin cursos...
                    </h1>
                :
                    <h1>
                        AQUI VAN LAS CARDS DE LOS CURSOS DEL ESTUDIANTE
                    </h1>
            }
        </>
    )
}
export default MyCourses;