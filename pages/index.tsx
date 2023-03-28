import Head from 'next/head';
import {NextPage} from 'next/types';
import { getAdmin } from '../utils/fetchingDB';

const Home : NextPage = ()=>{

  console.log(getAdmin());
  getAdmin()
  .then((data)=>{
    console.log(data);
  })
  .catch((err)=>{
    console.log(err);
  })

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>
          Hola mundo!!!
        </h1>
      </main>
    </>
  );
};

export default Home;
