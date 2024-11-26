import ".././styles/globals.css";
import type { AppProps } from 'next/app';
import  UserProvider from '../contexts/userid'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <UserProvider>
    <Component {...pageProps} />
    </UserProvider>
}