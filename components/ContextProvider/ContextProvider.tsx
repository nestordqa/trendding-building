import {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

import {
    postUser 
} from '../../app/types';
import { useMutation } from 'react-query';
import axios from 'axios';

const userContext = createContext('No user yet');

type Props = {
    children: string | JSX.Element | JSX.Element[]
  }

export const useUsers = () =>{
    return useContext(userContext);
};

const getUserById = async(id: string) =>{

        if(id === undefined) return;
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        const user = await response.json();
        
        if(!user){
            return 'There is no data';
        };
        return user;
}

const postUser = async(data : postUser) =>{

    const response = await axios.post(`http://localhost:3000/api/users/`, data);
    const user = await response.data;
    
    if(!user){
        return 'There is no data';
    };
    return user;
};

const ContextProvider = ({ children } : Props) =>{ 
    
    const { user } = useUser();

    let id = user?.sub?.slice(user?.sub.indexOf('|')+1, user.sub.length);

    const [usuario, setUsuario] = useState('');

    const mutation = useMutation((data: any) => postUser(data),
        {
            onSuccess: ()=>{
                let id = String(user?.sub?.slice(user?.sub.indexOf('|')+1, user.sub.length));
                setUsuario(id)
                console.log('User created successfully!')
            },
            onError: (error)=>{
                console.log(error)
            }
        })
    
    const [exist, setExist] = useState(false);
    useEffect(()=>{
        let datos = {
            id: id,
            firstName: '',
            lastName: '',
            email: user?.email,
            email_verified: user?.email_verified,
            gender: '',
            birthday: '',
            address: '',
            phone: '',
            city: '',
            province: '',
            country: '',
            photo: user?.picture,
            updatedAt: new Date()
        }
        if(datos.id === undefined || datos.email === undefined) return;
        getUserById(datos.id)
            .then((data)=>{
                data ? setExist(true) : setExist(false)
            })
            .catch((err)=>{
                console.log(err);
                setExist(false);
            })
        if(user && exist) return;
        if(!user) return;
        if(user && !exist){
            mutation.mutate(datos);
        }
    },[user])

    return(
        <userContext.Provider value={usuario}>
            {children}
        </userContext.Provider>
    );

};

export default ContextProvider;