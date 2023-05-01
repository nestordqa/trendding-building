import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

export default async function transactions( req : NextApiRequest, res : NextApiResponse ){
    const method = req.method;

    switch (method) {
        case 'GET':
            try{
                const transactions = await prisma.payment.findMany({
                    include:{
                        student: true
                    }
                });
                if(transactions.length > 0){
                    res.status(202).json(transactions)
                }
                if(transactions.length === 0){
                    res.status(401).json({error: 'There are not transactions yet'})
                }
            }catch(error){
                res.status(400).json({error: error})
            }            
        break;

        default:
            res.status(503).json({error: 'Bad request, invalid method'})
            break;
    }
};