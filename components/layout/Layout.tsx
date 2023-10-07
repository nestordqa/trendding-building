import Head from 'next/head';
import {NextPage} from 'next';
import { Navbar } from './layout/Navbar';



const Layout = ({children, title, content}:any)=>{

  return (
    <>
      <Head>
        <title>Trendding - {title}</title>
        <meta name="description" content={content} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar/> */}
      <main className='bg-black-50 w-full flex flex-1 flex-wrap justify-center items-center mx-auto h-auto relative'>
        {children}
      </main>
    </>
  );
};

export default Layout;
