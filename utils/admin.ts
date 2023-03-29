import axios from 'axios';
import {
    postAdmins
} from '../app/types';

export const getAdmin = async() =>{
    const response = await fetch('http://localhost:3000/api/admin');
    const admins = await response.json();
    
    if(!admins){
        return 'There is no data';
    };
    return admins;
};

export const getAdminById = async(id : String) =>{
    const response = await fetch(`http://localhost:3000/api/admin/${id}`);
    const admins = await response.json();
    
    if(!admins){
        return 'There is no data';
    };
    return admins;
};

export const postAdmin = async(data : postAdmins) =>{

    const response = await axios.post(`http://localhost:3000/api/admin/`, data);
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
    const response = await axios.put(`http://localhost:3000/api/admin/${id}`, datos);
    const admins = await response.data;
    
    if(!admins){
        return 'There is no data';
    };
    return admins;
};

export const deleteAdmin = async(id : String) =>{
    const response = await axios.delete(`http://localhost:3000/api/admin/${id}`);
    const admins = await response.data;
    
    if(!admins){
        return 'There is no data';
    };
    return admins;
};