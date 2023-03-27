import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

const admins = async( req : NextApiRequest, res : NextApiResponse )=>{
    const method = req.method;
    const id = req.query.id;

    switch (method) {
        case 'GET':
            try{
                if(id){
                    const admin = await prisma.admin.findUnique({
                        where:{
                            id: String(id)
                        }
                    });
                    if(admin){
                        return res.status(200).json(admin);
                    };
                    if(!admin){
                        return res.status(404).json({message: 'Admin does not exist!'})
                    };
                };
            }catch(err){
                return res.status(401).json({error: err})
            }           
        break;
        
        case 'PUT':
            const data = req.body;
            try{
                const admin = await prisma.admin.update({
                    where:{
                        id: String(id)
                    },
                    data
                });
                res.status(200).json(admin);
            }catch(err){
                return res.status(401).json({error: err})
            };
       
        break;

        case 'DELETE':
            try {
                const admin = await prisma.admin.update({
                    where:{ 
                        id: String(id) 
                    },
                    data:{
                        active: false,
                    },
                });
                admin
                    ? res.status(200).json({ message: "Admin logic delete" })
                    : res.status(400).json({
                        message: "Admin does not exist in the database.",
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

export default admins;