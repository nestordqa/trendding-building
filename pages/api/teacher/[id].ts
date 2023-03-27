import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

const teachers = async( req : NextApiRequest, res : NextApiResponse )=>{
    const method = req.method;
    const id = req.query.id;

    switch (method) {
        case 'GET':
            try{
                if(id){
                    const teacher = await prisma.teacher.findUnique({
                        where:{
                            id: String(id)
                        }
                    });
                    if(teacher){
                        return res.status(200).json(teacher);
                    };
                    if(!teacher){
                        return res.status(404).json({message: 'teacher does not exist!'})
                    };
                };
            }catch(err){
                return res.status(401).json({error: err})
            }           
        break;
        
        case 'PUT':
            const data = req.body;
            try{
                const teacher = await prisma.teacher.update({
                    where:{
                        id: String(id)
                    },
                    data
                });
                res.status(200).json(teacher);
            }catch(err){
                return res.status(401).json({error: err})
            };
       
        break;

        case 'DELETE':
            try {
                const teacher = await prisma.teacher.update({
                    where:{ 
                        id: String(id) 
                    },
                    data:{
                        active: false,
                    },
                });
                teacher
                    ? res.status(200).json({ message: "teacher logic delete" })
                    : res.status(400).json({
                        message: "teacher does not exist in the database.",
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

export default teachers;