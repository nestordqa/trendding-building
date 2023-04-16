import {NextPage} from 'next';
import Layout from '@components/components/layout/Layout';
import { useT } from '@components/components/ContextProvider/LanguagesProvider';

const Memberships : NextPage = ()=>{

  const t = useT();

  return (
    <>
      <Layout title={t.memberships.memberships_page} content={t.memberships.memberships_page}>
        <h1>Desde {t.memberships.memberships}</h1>
      </Layout>
    </>
  );
};

export default Memberships;