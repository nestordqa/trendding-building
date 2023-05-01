import axios from 'axios';
import {
    postStudents,
    getUser
} from '../app/types';

export const getUsers = async() =>{
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();
    const users = await data.filter((student : getUser, _idx : number)=> student.userRole === 'STUDENT')
    
    if(!users){
        return 'There is no data';
    };
    return users;
};

export const getStudentById = async(id : String) =>{
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    const students = await response.json();
    
    if(!students){
        return 'There is no data';
    };
    return students;
};

export const postStudent = async(data : postStudents) =>{
    const response = await axios.post(`http://localhost:3000/api/users/`, data);
    const students = await response.data;
    
    if(!students){
        return 'There is no data';
    };
    return students;
};

export const updateStudent = async(data : any, id : String) =>{
    let datos = {
        ...data,
        updatedAt: new Date()
    }
    const response = await axios.put(`http://localhost:3000/api/users/${id}`, datos);
    const students = await response.data;
    
    if(!students){
        return 'There is no data';
    };
    return students;
};

export const deleteStudent = async(id : String) =>{
    const response = await axios.delete(`http://localhost:3000/api/users/${id}`);
    const students = await response.data;
    
    if(!students){
        return 'There is no data';
    };
    return students;
};

export const getStudentByEmail = async(email : string | null | undefined) =>{
    const response = await fetch('http://localhost:3000/api/users');
    const students = await response.json();
    
    if(!students){
        return 'There is no data';
    };
    if(students){
        let filtering = await students.filter((student : getUser, _idx : number)=> student.email === email);
        return await filtering;
    }
};