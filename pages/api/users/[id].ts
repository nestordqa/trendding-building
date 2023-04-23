import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

export default async function users( req : NextApiRequest, res : NextApiResponse ){
    const method = req.method;
    const id = req.query.id;

    switch (method) {
        case 'GET':
            try{
                if(id){
                    let data;
                    const user = await prisma.user.findUnique({
                        where:{
                            id: String(id)
                        }
                    });
                    if(user){
                        const student = await prisma.student.findUnique({
                            where:{
                                id: String(id)
                            }
                        });
                        if(student){
                            data = {
                                ...user,
                                student: student
                            }
                            return res.status(200).json(data);
                        }
                    };
                    if(!user){
                        return res.status(404).json({message: 'User does not exist!'})
                    };
                };
            }catch(err){
                return res.status(401).json({error: err})
            }           
        break;
        
        case 'PUT':
            const {
                info,
                firstName,
                lastName,
                email,
                gender,
                birthday,
                address,
                phone,
                city,
                province,
                photo,
                userRole,
                active
            } = req.body
            const obj ={
                firstName,
                lastName,
                email,
                gender,
                birthday,
                address,
                phone,
                city,
                province,
                photo,
                userRole,
                active
            };
            try{
                let datos ={};
                for(const [key, value] of Object.entries(obj)){
                    let mini = {[key]: value};
                    if(value !== ''){                        
                        datos = {...datos, ...mini}
                    }
                };
                const user = await prisma.user.update({
                    where: { id: String(id) },
                    data: {...datos}
                })
                    res.status(200).json(user);
            }catch(err){
                return res.status(401).json({error: err})
            };
       
        break;

        case 'DELETE':
            try {
                const admin = await prisma.user.update({
                    where:{ 
                        id: String(id) 
                    },
                    data:{
                        active: false,
                    },
                });
                admin
                    ? res.status(200).json({ message: "User logic delete" })
                    : res.status(400).json({
                        message: "User does not exist in the database.",
                    });
            } catch (error) {
                res.status(400).json({ message: error });
            }       
        break;
        default:
            res.status(503).json({error: 'Bad request, invalid method'})
            break;
    }
};