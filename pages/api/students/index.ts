import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

const students = async( req : NextApiRequest, res : NextApiResponse )=>{
    const method = req.method;
    const {
        id,
        firstName, 
        lastName, 
        email, 
        email_verified, 
        gender, 
        birthday, 
        address, 
        phone, 
        city, 
        province, 
        country, 
        photo,
        companie,
        superpower
    } = req.body;

    switch (method) {
        case 'GET':
            try{
                const students = await prisma.student.findMany({
                    where:{
                        active: true
                    }
                });
                if(students.length <= 0){
                    res.status(404).json({message: 'There are not studetns yet!'});
                };
                if(students.length > 0){
                    res.status(200).json(students);
                };
            }catch(error){
                res.status(400).json({error: error})
            }            
        break;
        
        case 'POST':
            try{
                const finding = await prisma.student.findUnique({
                    where:{
                        email: email
                    }
                });
                if(finding){
                     return res.status(401).json({message: 'User already exist.'})
                }
                if(!firstName || !lastName || !email || !email_verified || !gender || !birthday || !address || !phone || !city || !province || !country || !photo){
                    return res.status(401).json({error: 'Missing data!'})
                }
                if(!finding){
                    const newStudent = await prisma.student.create({
                        data:{
                            id,
                            firstName,
                            lastName,
                            email,
                            email_verified,
                            gender,
                            birthday,
                            address,
                            phone,
                            city,
                            province,
                            country,
                            photo,
                            companie,
                            superpower,
                            active: true,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }
                    });
                    return res.status(201).json(newStudent);
                }
            }catch(error){
                res.status(401).json({error: error})
            }        
        break;
        default:
            res.status(503).json({error: 'Bad request, invalid method'})
            break;
    }
};

export default students;