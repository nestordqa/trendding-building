import {NextPage} from 'next';
import Layout from '@components/components/layout/Layout';
import { useT } from '@components/components/ContextProvider/LanguagesProvider';

const About : NextPage = ()=>{

  const t = useT();

  return (
    <>
      <Layout title={t.about.about_page} content={t.about.about_page}>
        <h1>Desde {t.about.about}</h1>
      </Layout>
    </>
  );
};

export default About;