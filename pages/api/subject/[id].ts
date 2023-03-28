import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

const subjects = async( req : NextApiRequest, res : NextApiResponse )=>{
    const method = req.method;
    const id = req.query.id;

    switch (method) {
        case 'GET':
            try{
                if(id){
                    const subject = await prisma.subject.findUnique({
                        where:{
                            id: String(id)
                        }
                    });
                    if(subject){
                        return res.status(200).json(subject);
                    };
                    if(!subject){
                        return res.status(404).json({message: 'subject does not exist!'})
                    };
                };
            }catch(err){
                return res.status(401).json({error: err})
            }           
        break;
        
        case 'PUT':
            const data = req.body;
            try{
                const subject = await prisma.subject.update({
                    where:{
                        id: String(id)
                    },
                    data
                });
                
                res.status(200).json(subject);
            }catch(err){
                return res.status(401).json({error: err})
            };
       
        break;

        case 'DELETE':
            try {
                const subject = await prisma.subject.update({
                    where:{ 
                        id: String(id) 
                    },
                    data:{
                        active: false,
                    },
                });
                subject
                    ? res.status(200).json({ message: "subject logic delete" })
                    : res.status(400).json({
                        message: "subject does not exist in the database.",
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

export default subjects;