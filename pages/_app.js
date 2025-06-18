import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#10b981" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/public/icon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
