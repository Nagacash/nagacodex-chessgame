import '../styles/globals.css'; // Import global styles (ensure this file exists)
// IMPORTANT FIX: Correctly import AppProps using named import destructuring
import type { AppProps } from 'next/app'; 
import Head from 'next/head'; // For managing document head (meta tags, title, favicon)

/**
 * MyApp is the custom App component for Next.js.
 * It initializes pages and wraps them with global settings, styles, or state.
 * All pages in your application will be rendered within this component.
 *
 * @param {AppProps} { Component, pageProps } - Component is the active page, pageProps are initial props.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Head component for global meta data and favicon. Next.js manages this. */}
      <Head>
        {/* Basic meta tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Page title */}
        <title>Naga Codex AI Chess</title>
        
        {/* Favicon from public directory is automatically picked up by Next.js if placed in public/favicon.ico */}
        <link rel="icon" href="/favicon.ico" /> 

        {/* Google Fonts imports */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Sixtyfour&display=swap" rel="stylesheet" />
        
        {/* Page description for SEO */}
        <meta name="description" content="A dynamic chess application where you can play against a Gemini-powered AI opponent. Features adjustable difficulty levels and a visual chess board." />
      </Head>
      {/* The currently active page component is rendered here */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
