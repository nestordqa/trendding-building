import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

export default async function users( req : NextApiRequest, res : NextApiResponse ){
    const method = req.method;
    const {
        id,
        info,
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
        photo
    } = req.body;

    switch (method) {
        case 'GET':
            try{
                const admins = await prisma.user.findMany({
                    where:{
                        active: true
                    },
                });
                if(admins.length <= 0){
                    res.status(400).json({message: 'There are not users yet!'});
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
                const newUser = await prisma.user.upsert({
                    where: { id: id },
                    update: {
                        email,
                        email_verified,
                        photo,
                        updatedAt: new Date()
                    },
                    create: {
                        id: id,
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
                        updatedAt: new Date()
                    }
                })
                newUser
                    ? res.status(200).json({ message: 'created' })
                    : res.status(400).json({ message: 'could not create user' })
                }catch(error){
                res.status(401).json({error: error})
            }        
        break;
        default:
            res.status(503).json({error: 'Bad request, invalid method'})
            break;
    }
};