import '@components/styles/globals.css';
import type { AppProps } from 'next/app';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import ContextProvider from '../components/ContextProvider/ContextProvider';

const client = new QueryClient()

export default function App({ 
  Component, 
  pageProps
}: AppProps) {
  return( 
    <UserProvider>
      <QueryClientProvider client={client}>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </QueryClientProvider>
    </UserProvider>
  )
}
