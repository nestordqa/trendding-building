import axios from 'axios';
import {
    postTeachers,
    getUser
} from '../app/types';

export const getTeacher = async() =>{
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();
    const teachers = await data.filter((teacher : getUser, _idx : number)=>teacher.userRole === 'TEACHER')
    
    if(!teachers){
        return 'There is no data';
    };
    return teachers;
};

export const getTeacherById = async(id : String) =>{
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    const teachers = await response.json();
    
    if(!teachers){
        return 'There is no data';
    };
    return teachers;
};

export const postTeacher = async(data : postTeachers) =>{
    const response = await axios.post(`http://localhost:3000/api/users/`, data);
    const teachers = await response.data;
    
    if(!teachers){
        return 'There is no data';
    };
    return teachers;
};

export const updateTeacher = async(data : any, id : String) =>{
    let datos = {
        ...data,
        updatedAt: new Date()
    }
    const response = await axios.put(`http://localhost:3000/api/users/${id}`, datos);
    const teachers = await response.data;
    
    if(!teachers){
        return 'There is no data';
    };
    return teachers;
};

export const deleteTeacher = async(id : String) =>{
    const response = await axios.delete(`http://localhost:3000/api/users/${id}`);
    const teachers = await response.data;
    
    if(!teachers){
        return 'There is no data';
    };
    return teachers;
};