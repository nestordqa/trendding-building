import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

const students = async( req : NextApiRequest, res : NextApiResponse )=>{
    const method = req.method;
    const id = req.query.id;

    switch (method) {
        case 'GET':
            try{
                if(id){
                    const student = await prisma.student.findUnique({
                        where:{
                            id: String(id)
                        }
                    });
                    if(student){
                        return res.status(200).json(student);
                    };
                    if(!student){
                        return res.status(404).json({message: 'User does not exist!'})
                    };
                };
            }catch(err){
                return res.status(401).json({error: err})
            }           
        break;
        
        case 'PUT':
            const data = req.body;
            try{
                const student = await prisma.student.update({
                    where:{
                        id: String(id)
                    },
                    data
                });
                res.status(200).json(student);
            }catch(err){
                return res.status(401).json({error: err})
            };
       
        break;

        case 'DELETE':
            try {
                const student = await prisma.student.update({
                    where:{ 
                        id: String(id) 
                    },
                    data:{
                        active: false,
                    },
                });
                student
                    ? res.status(200).json({ message: "Student logic delete" })
                    : res.status(400).json({
                        message: "Student does not exist in the database.",
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

export default students;