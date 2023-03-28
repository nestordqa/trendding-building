import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

const subjects = async( req : NextApiRequest, res : NextApiResponse )=>{
    const method = req.method;
    const {
        tittle,
        teachers,
        courses
    } = req.body;

    switch (method) {
        case 'GET':
            try{
                const subjects = await prisma.subject.findMany({
                    select: {
                        id: true,
                        tittle: true,
                        teachers: true,
                        courses: true
                    }
                });
                if(subjects.length <= 0){
                    res.status(404).json({message: 'There are not subjects yet!'});
                };
                if(subjects.length > 0){
                    res.status(200).json(subjects);
                };
            }catch(error){
                res.status(400).json({error: error})
            }            
        break;
        
        case 'POST':
            try{

                if(!tittle){
                    return res.status(401).json({error: 'Missing data!'})
                }else{
                    const newsubject = await prisma.subject.create({
                        data:{
                            tittle,
                            active: true
                        }
                    });
                    return res.status(201).json(newsubject);
                }
            }catch(error){
                res.status(401).json({error: error})
            }        
        break;
        default:
            res.status(503).json({error: 'Bad request, invalid method'})
            break;
    }
};

export default subjects;