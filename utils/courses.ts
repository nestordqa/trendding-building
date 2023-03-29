import axios from 'axios';
import {
    postCourses
} from '../app/types';

export const getCourse = async() =>{
    const response = await fetch('http://localhost:3000/api/courses');
    const courses = await response.json();
    
    if(!courses){
        return 'There is no data';
    };
    return courses;
};

export const getCourseById = async(id : String) =>{
    const response = await fetch(`http://localhost:3000/api/courses/${id}`);
    const courses = await response.json();
    
    if(!courses){
        return 'There is no data';
    };
    return courses;
};

export const postCourse = async(data : postCourses) =>{
    const response = await axios.post(`http://localhost:3000/api/courses/`, data);
    const courses = await response.data;
    
    if(!courses){
        return 'There is no data';
    };
    return courses;
};

export const updateCourse = async(data : any, id : String) =>{
    let datos = {
        ...data,
        updatedAt: new Date()
    }
    const response = await axios.put(`http://localhost:3000/api/courses/${id}`, datos);
    const courses = await response.data;
    
    if(!courses){
        return 'There is no data';
    };
    return courses;
};

export const deleteCourse = async(id : String) =>{
    const response = await axios.delete(`http://localhost:3000/api/courses/${id}`);
    const courses = await response.data;
    
    if(!courses){
        return 'There is no data';
    };
    return courses;
};