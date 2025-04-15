import { useEffect } from 'react';
import connectDB from '../lib/mongodb';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    connectDB();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;