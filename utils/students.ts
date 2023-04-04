import axios from 'axios';
import {
    postStudents
} from '../app/types';

export const getStudent = async() =>{
    const response = await fetch('http://localhost:3000/api/students');
    const students = await response.json();
    
    if(!students){
        return 'There is no data';
    };
    return students;
};

export const getStudentById = async(id : String) =>{
    const response = await fetch(`http://localhost:3000/api/students/${id}`);
    const students = await response.json();
    
    if(!students){
        return 'There is no data';
    };
    return students;
};

export const postStudent = async(data : postStudents) =>{
    const response = await axios.post(`http://localhost:3000/api/students/`, data);
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
    const response = await axios.put(`http://localhost:3000/api/students/${id}`, datos);
    const students = await response.data;
    
    if(!students){
        return 'There is no data';
    };
    return students;
};

export const deleteStudent = async(id : String) =>{
    const response = await axios.delete(`http://localhost:3000/api/students/${id}`);
    const students = await response.data;
    
    if(!students){
        return 'There is no data';
    };
    return students;
};

export const getStudentByEmail = async(email : string | null | undefined) =>{
    const response = await fetch('http://localhost:3000/api/students');
    const students = await response.json();
    
    if(!students){
        return 'There is no data';
    };
    if(students){
        let filtering = await students.filter((student : any, idx : string)=> student.email === email);
        return await filtering;
    }
};