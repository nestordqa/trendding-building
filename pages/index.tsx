import {NextPage} from 'next';
import Layout from '@components/components/layout/Layout';
import { useT } from '@components/components/ContextProvider/LanguagesProvider';
import Landing from '@components/components/pagesComponents/home/Landing';

const Home : NextPage = ()=>{

  const t = useT();

  return (
    <>
      <Layout title={t.home.home_page} content={t.home.home_page}>
        <Landing/>
        {/* <Reviews/>
        <CourseExample/>
        <StepByStep/>
        <WhyUs/>
        <Metrics/>
        <UsersReviews/>
        <GetStarted/> */}
      </Layout>
    </>
  );
};

export default Home;
