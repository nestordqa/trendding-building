  // const testing = {
  //   firstName: 'Nestor',
  //   lastName: 'Quinones',
  //   email: 'jjjjj.com',
  //   email_verified: true,
  //   gender: 'MALE',
  //   birthday: 'keli',
  //   address: 'Elkoño',
  //   phone: 'telefonito',
  //   city: 'Elñoko',
  //   province: 'Elñokito',
  //   country: 'Elñokazo',
  //   photo: 'webazo.jpg',
  //   role: 'DEVELOPER'
  // }

//   const testing = {
//     tittle: 'Matematicas',
//     description: 'El mejor curso del mundo mundial',
//     photo: 'ola.jpg',
//     courseRole: 'GOLD'
// }

import Head from 'next/head';
import {NextPage} from 'next';
import { useState, useEffect } from 'react';
import AuthButton from '@components/components/auth/AuthButton';
import { 
  getStudentByEmail, 
  postStudent
} from '../utils/students';

import { useUsers } from '../components/ContextProvider/ContextProvider';
import { useUser } from '@auth0/nextjs-auth0/client';

const Home : NextPage = ()=>{
//Custom hook, trae ID del usuario si existe
  const id = useUsers();
  const {user} = useUser();
  console.log(id);

  id ? console.log(id) : console.log('No existo :(')

  return (
    <>
      <Head>
        <title>Trendding App v0.0.1</title>
        <meta name="description" content="Trendding App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col justify-center items-center w-screen h-screen'>
        <AuthButton/>
      </main>
    </>
  );
};

export default Home;
