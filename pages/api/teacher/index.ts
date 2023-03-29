import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

const teachers = async( req : NextApiRequest, res : NextApiResponse )=>{
    const method = req.method;
    const {
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
        subject
    } = req.body;

    switch (method) {
        case 'GET':
            try{
                const teachers = await prisma.teacher.findMany({
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        gender: true,
                        phone: true,
                        city: true,
                        province: true,
                        country: true,
                        subject: true,
                        courses: true,
                        active: true,
                        createdAt: true
                    }
                });
                if(teachers.length <= 0){
                    res.status(404).json({message: 'There are not teachers yet!'});
                };
                if(teachers.length > 0){
                    res.status(200).json(teachers);
                };
            }catch(error){
                res.status(400).json({error: error})
            }            
        break;
        
        case 'POST':
            try{
                const finding = await prisma.teacher.findUnique({
                    where:{
                        email: email
                    }
                });
                if(finding){
                     return res.status(401).json({message: 'Teacher already exist.'})
                }
                if(!firstName || !lastName || !email || !email_verified || !gender || !birthday || !address || !phone || !city || !province || !subject || !country || !photo){
                    return res.status(401).json({error: 'Missing data!'})
                }
                if(!finding){
                    const newTeacher = await prisma.teacher.create({
                        data:{
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
                            subject,
                            active: true,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }
                    });
                    return res.status(201).json(newTeacher);
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

export default teachers;