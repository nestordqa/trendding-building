import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

const courses = async( req : NextApiRequest, res : NextApiResponse )=>{
    const method = req.method;
    const id = req.query.id;

    switch (method) {
        case 'GET':
            try{
                if(id){
                    const course = await prisma.course.findUnique({
                        where:{
                            id: String(id)
                        }
                    });
                    if(course){
                        return res.status(200).json(course);
                    };
                    if(!course){
                        return res.status(404).json({message: 'course does not exist!'})
                    };
                };
            }catch(err){
                return res.status(401).json({error: err})
            }           
        break;
        
        case 'PUT':
            const data = req.body;
            try{
                const course = await prisma.course.update({
                    where:{
                        id: String(id)
                    },
                    data
                });
                res.status(200).json(course);
            }catch(err){
                return res.status(401).json({error: err})
            };
       
        break;

        case 'DELETE':
            try {
                const course = await prisma.course.update({
                    where:{ 
                        id: String(id) 
                    },
                    data:{
                        active: false,
                    },
                });
                course
                    ? res.status(200).json({ message: "course logic delete" })
                    : res.status(400).json({
                        message: "course does not exist in the database.",
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

export default courses;