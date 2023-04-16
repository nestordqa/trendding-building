import {NextPage} from 'next';
import Layout from '@components/components/layout/Layout';
import { useT } from '@components/components/ContextProvider/LanguagesProvider';

const Resources : NextPage = ()=>{

  const t = useT();

  return (
    <>
      <Layout title={t.resources.resources_page} content={t.resources.resources_page}>
        <h1>Desde {t.resources.resources}</h1>
      </Layout>
    </>
  );
};

export default Resources;