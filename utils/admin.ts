import axios from 'axios';
import {
    postUser,
    getUser
} from '../app/types';

export const getAdmin = async() =>{
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();
    const admins = await data.filter((admin : getUser, _idx : number)=>admin.userRole === 'ADMIN')
    
    if(!admins){
        return 'There is no data';
    };
    return admins;
};

export const getAdminById = async(id : String) =>{
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    const admins = await response.json();
    
    if(!admins){
        return 'There is no data';
    };
    return admins;
};

export const postAdmin = async(data : postUser) =>{

    const response = await axios.post(`http://localhost:3000/api/users/`, data);
    const admins = await response.data;
    
    if(!admins){
        return 'There is no data';
    };
    return admins;
};

export const updateAdmin = async(data : any, id : String) =>{
    let datos = {
        ...data,
        updatedAt: new Date()
    }
    const response = await axios.put(`http://localhost:3000/api/users/${id}`, datos);
    const admins = await response.data;
    
    if(!admins){
        return 'There is no data';
    };
    return admins;
};

export const deleteAdmin = async(id : String) =>{
    const response = await axios.delete(`http://localhost:3000/api/users/${id}`);
    const admins = await response.data;
    
    if(!admins){
        return 'There is no data';
    };
    return admins;
};