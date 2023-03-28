import axios from "axios";

export const getAdmin = async() =>{
    const response = await fetch('/api/admin');
    const admins = await response;

    if(!admins) return 'There is no data!';

    return admins;
};