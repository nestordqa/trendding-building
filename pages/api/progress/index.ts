import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

const progress = async( req : NextApiRequest, res : NextApiResponse )=>{
    const method = req.method;
    const {
        studentId,
        courseId,
        progressFactor      
    } = req.body;

    switch (method) {
        case 'POST':
            try{
                
            }catch(error){
                res.status(401).json({error: error})
            }        
        break;
        default:
            res.status(503).json({error: 'Bad request, invalid method'})
            break;
    }
};

export default progress;