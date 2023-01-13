import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store, persistor} from '../store'
import { PersistGate } from 'redux-persist/integration/react'

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('next/config').setConfig({
    experimental: {
      reactRefresh: false,
    },
  });
}

export default function App({ Component, pageProps }: AppProps) {
  
  
  return (
    
  <div className='bg-neutral-900 h-screen flex lg:max-lg'>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  </div>

  )

  
}
