import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

export default async function admins( req : NextApiRequest, res : NextApiResponse ){
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
        role, 
    } = req.body;

    switch (method) {
        case 'GET':
            try{
                const admins = await prisma.admin.findMany({
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
                        role: true,
                        active: true,
                        createdAt: true
                    }
                });
                if(admins.length <= 0){
                    res.status(400).json({message: 'There are not admins yet!'});
                };
                if(admins.length > 0){
                    res.status(200).json(admins);
                };
            }catch(error){
                res.status(400).json({error: error})
            }            
        break;
        
        case 'POST':
            try{
                const finding = await prisma.admin.findUnique({
                    where:{
                        email: email
                    }
                });
                if(finding){
                     return res.status(401).json({message: 'Admin already exist.'})
                }
                if(!firstName || !lastName || !email || !email_verified || !gender || !birthday || !address || !phone || !city || !province || !country || !photo){
                    return res.status(401).json({error: 'Missing data!'})
                }
                if(!finding){
                    const newAdmin = await prisma.admin.create({
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
                            role,
                            active: true,
                            createdAt: new Date()
                        }
                    });
                    return res.status(201).json(newAdmin);
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