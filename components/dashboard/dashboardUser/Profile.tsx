import { NextComponentType } from 'next';
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from 'next/link';
import Image from 'next/image'
import IsoGreen from '@components/public/images/testing-logo.jpg';
import { useQuery } from 'react-query';
import { useUsers } from '@components/components/ContextProvider/ContextProvider';
import { useT } from "@components/components/ContextProvider/LanguagesProvider";


const getUserById = async(id : String) =>{
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    const user = await response.json();
    
    if(!user){
        return 'There is no data';
    };
    return user;
};

const MyProfile: NextComponentType = () => {

    const t = useT();
    const { user, isLoading: isLoadingU } = useUser();
    const usuario = useUsers();

    let id: string = ''
    if (user && user.sub && usuario) {
        id = usuario
    }
    const { data: dbUser, isLoading } = useQuery(['user', id], () =>
        getUserById(id)
    )

    let photo: string;
    if(!isLoading){
    console.log(dbUser);
    photo = dbUser?.photo
    }

    return (
        <div className="p-8 flex flex-col justify-evenly items-center bg-pwgreen-100 rounded-lg md:flex-row">
            <div className="w-full flex flex-col gap-3 justify-center items-center md:w-1/3">
                {
                    isLoading ?
                    <>
                        <Image
                            src={IsoGreen}
                            alt="not found"
                            width={150}
                            height={150}
                        />
                        <h1>{t.profile.wait}</h1>
                    </>
                    :
                    <>
                        <div className='flex flex-col justify-center items-center w-60 h-60 bg-pwpurple-100 rounded-full'>
                            <Image
                                src={dbUser?.photo}
                                alt="not found"
                                width={200}
                                height={200}
                                className="rounded-full static"
                            />
                        </div>
                        
                    </>
                }
                <div className="font-Rubik font-bold text-4xl lg:text-6xl">
                    {isLoading ?
                        t.profile.myProfile
                    :
                    <>
                    <h2 className='text-1x4'>{t.profile.hi}, <span className='font-bold'>{dbUser?.firstName}</span></h2>
                    </>
                        
                
                }
                </div>
                
                <p className="text-md text-center mb-2 md:text-xl md:text-center">
                    {t.profile.updateData}
                </p>
            </div>

            <div className="w-full grid grid-cols-1 gap-2 items-center justify-center md:w-2/3 lg:gap-3">

                {isLoading ?
                <div className="flex flex-col gap-1 items-start justify-center">
                    <h1>{t.profile.loading}</h1>
                </div>
                :
                <>
                    
                    <div className='w-3/4 p-5 flex flex-col justify-end'>
                        <div className="input">
                            <h2><span className='font-bold'>{t.profile.fullName}</span>{`${dbUser?.firstName} ${dbUser?.lastName}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>{t.profile.email}</span>{`${dbUser?.email}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>{t.profile.gender}</span>{`${dbUser?.gender}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>{t.profile.country}</span>{`${dbUser?.country}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>{t.profile.province}</span>{`${dbUser?.province}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>{t.profile.city}</span>{`${dbUser?.city}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>{t.profile.address}</span>{`${dbUser?.address}`}</h2>
                        </div>
                        <div className="input">
                            <h2><span className='font-bold'>{t.profile.phone}</span>{`${dbUser?.phone}`}</h2>
                        </div>
                    </div>

                    <Link href={'/dashboard/myprofile/updateuser'}>
                        <button className="text-center bg-pwgreen-500 py-3 my-2 rounded-md shadow-xl text-pwgreen-900 font-bold uppercase font-Rubik">
                            ACTUALIZAR DATOS
                        </button>   
                    </Link>
             
                </>


                }               

            </div>
        </div>
    )
}
export default MyProfile;