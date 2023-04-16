import '@components/styles/globals.css';
import type { AppProps } from 'next/app';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { appWithTranslation } from 'next-i18next';
import ContextProvider from '../components/ContextProvider/ContextProvider';
import LanguagesProvider from '../components/ContextProvider/LanguagesProvider';

const client = new QueryClient()

const App = ({ 
  Component, 
  pageProps
}: AppProps) =>{
  return( 
    <LanguagesProvider>
      <UserProvider>
        <QueryClientProvider client={client}>
          <ContextProvider>
            <Component {...pageProps} />
          </ContextProvider>
        </QueryClientProvider>
      </UserProvider>
    </LanguagesProvider>
  )
};

export default appWithTranslation(App);
