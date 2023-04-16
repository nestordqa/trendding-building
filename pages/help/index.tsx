import {NextPage} from 'next';
import Layout from '@components/components/layout/Layout';
import { useT } from '@components/components/ContextProvider/LanguagesProvider';

const Help : NextPage = ()=>{

  const t = useT();

  return (
    <>
      <Layout title={t.help.help_page} content={t.help.help_page}>
        <h1>Desde {t.help.help}</h1>
      </Layout>
    </>
  );
};

export default Help;