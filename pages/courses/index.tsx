import {NextPage} from 'next';
import Layout from '@components/components/layout/Layout';
import { useT } from '@components/components/ContextProvider/LanguagesProvider';

const Courses : NextPage = ()=>{

  const t = useT();

  return (
    <>
      <Layout title={t.courses.courses_page} content={t.courses.courses_page}>
        <h1>Desde {t.courses.courses}</h1>
      </Layout>
    </>
  );
};

export default Courses;