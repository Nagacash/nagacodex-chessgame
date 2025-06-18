
import '@/styles/globals.css';
import type AppProps from 'next/app'; // Changed import style
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Naga Codex AI Chess</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Sixtyfour&display=swap" rel="stylesheet" />
        <meta name="description" content="A dynamic chess application where you can play against a Gemini-powered AI opponent. Features adjustable difficulty levels and a visual chess board." />
      </Head>
      <Component {...pageProps} />
    </>
  );
}