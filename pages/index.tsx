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
import AuthButton from '@components/components/auth/AuthButton';
// import { useUsers } from '../components/ContextProvider/ContextProvider';
// import { useUser } from '@auth0/nextjs-auth0/client';
// import ModalPayment from '@components/components/payments/ModalPayment';

const Home : NextPage = ()=>{
//Custom hook, trae ID del usuario si existe
  // const id = useUsers();
  // const {user} = useUser();

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
        {/* {
        user ? 
          <div className='w-full h-full flex flex-row justify-center items-center'>
            <div className='w-60 h-60 bg-gray-600 text-white text-lg mx-10  flex flex-col justify-center items-center'>
              <h2>
                Silver Membership
              </h2>
              <ModalPayment price={100} userRole={'SILVER'}/>            
            </div>
            <div className='w-60 h-60 bg-gray-600 text-white text-lg mx-10  flex flex-col justify-center items-center'>
              <h2>
                Gold Membership
              </h2> 
              <ModalPayment price={300} userRole={'GOLD'}/>             
            </div>
            <div className='w-60 h-60 bg-gray-600 text-white text-lg mx-10  flex flex-col justify-center items-center'>
              <h2>
                Platinum Membership
              </h2>         
              <ModalPayment price={550} userRole={'PLATINUM'}/>     
            </div>
          </div>
          :
          null
        } */}
      </main>
    </>
  );
};

export default Home;
