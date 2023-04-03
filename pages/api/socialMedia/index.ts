import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

const socialMedia = async( req : NextApiRequest, res : NextApiResponse ) => {
    const method = req.method;
    const { data } = req.body;

    switch (method) {
        case 'GET':
            try{
                const socialMedia = await prisma.socialMedia.findMany();
                if(!socialMedia){
                    return res.status(404).json({message: 'There are no students with social media.'})
                };
                if(socialMedia){
                    return res.status(200).json(socialMedia);
                }
            }catch(err){
                return res.status(401).json({error: err});                    
            };            
        break;
        case 'POST':
            try{
                if(data){
                    const { socialMedia, userName, studentId } = data;
                    const newSocialMedia = await prisma.socialMedia.create({
                        data:{
                           socialMedia,
                           userName,
                           studentId 
                        }
                    });
                    return res.status(200).json(newSocialMedia);                                      
                }
            }catch(err){
                return res.status(400).json({error: err})
            }
        default:
            res.status(404).json({error: 'Invalid request method.'})
        break;
    }

};

export default socialMedia;