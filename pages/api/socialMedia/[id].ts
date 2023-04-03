import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

const socialMedia = async( req : NextApiRequest, res : NextApiResponse )=>{
    const method = req.method;
    const id = req.query.id;

    switch (method) {
        
        case 'PUT':
            const data = req.body;
            try{
                const update = await prisma.socialMedia.update({
                    where:{
                        id: String(id)
                    },
                    data
                });
                res.status(200).json(update);
            }catch(err){
                return res.status(401).json({error: err})
            };       
        break;

        case 'DELETE':
            try {
                const deleter = await prisma.socialMedia.delete({
                    where:{ 
                        id: String(id) 
                    },
                });
                res.status(200).json({deleter, message: 'The social media entrie was successfully deleted'})
            } catch (error) {
                res.status(400).json({ message: error });
            }       
        break;
        default:
            res.status(503).json({error: 'Bad request, invalid method'})
        break;
    }
};

export default socialMedia;