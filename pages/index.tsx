import {NextPage} from 'next';
import Layout from '@components/components/layout/Layout';
import { useT } from '@components/components/ContextProvider/LanguagesProvider';
import Landing from '@components/components/pagesComponents/home/Landing';
import Reviews from '@components/components/pagesComponents/home/Reviews';
import CourseExample from '@components/components/pagesComponents/home/CourseExample';
import StepByStep from '@components/components/pagesComponents/home/StepByStep';
import WhyUs from '@components/components/pagesComponents/home/WhyUs';
import Metrics from '@components/components/pagesComponents/home/Metrics';
import UsersReviews from '@components/components/pagesComponents/home/UsersReviews';
import GetStarted from '@components/components/pagesComponents/home/GetStarted';

const Home : NextPage = ()=>{

  const t = useT();

  return (
    <>
      <Layout title={t.home.home_page} content={t.home.home_page}>
        <Landing/>
        <Reviews/>
        <CourseExample/>
        <StepByStep/>
        <WhyUs/>
        <Metrics/>
        <UsersReviews/>
        <GetStarted/>
      </Layout>
    </>
  );
};

export default Home;
