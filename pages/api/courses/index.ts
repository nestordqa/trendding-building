import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../lib/prisma';

const courses = async( req : NextApiRequest, res : NextApiResponse )=>{
    const method = req.method;
    const {
        tittle,
        description,
        photo,
        subject,
        courseRole
    } = req.body;

    switch (method) {
        case 'GET':
            try{
                const courses = await prisma.course.findMany({
                    where:{
                        active: true
                    }
                });
                if(courses.length <= 0){
                    res.status(404).json({message: 'There are not courses yet!'});
                };
                if(courses.length > 0){
                    res.status(200).json(courses);
                };
            }catch(error){
                res.status(400).json({error: error})
            }            
        break;
        
        case 'POST':
            try{

                if(!tittle || !description || !photo || !courseRole){
                    return res.status(401).json({error: 'Missing data!'})
                }else{
                    // const newCourse = await prisma.course.create({
                    //     data:{
                    //         // tittle,
                    //         // description,
                    //         // photo,
                    //         // subject,
                    //         // courseRole,
                    //         // active: true,
                    //         // createdAt: new Date(),
                    //         // updatedAt: new Date()
                    //     }
                    // });
                    // return res.status(201).json(newCourse);
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

export default courses;