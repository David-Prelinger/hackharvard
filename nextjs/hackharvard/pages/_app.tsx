import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'

import { AuthContextProvider } from '@/components/AuthContext';


export default function App({ Component, pageProps }: AppProps) {
  return     (
  <>
 
<AuthContextProvider>
  <Component {...pageProps} />
  </AuthContextProvider>
  </>
  )
}
