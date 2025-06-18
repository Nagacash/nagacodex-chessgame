/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enables React Strict Mode for enhanced checks in development.
    reactStrictMode: true,
    // Optimizes JavaScript and CSS for production builds.
    swcMinify: true,
  
    // Optional: If you intend to have a 'src' directory at the root containing
    // your pages (e.g., src/pages/index.tsx instead of just pages/index.tsx),
    // you might need to configure pageExtensions or basePath.
    // However, for standard Next.js setup, your 'pages' directory should be at the root.
    // Given your current setup, your pages are now directly under the 'pages' folder (e.g. pages/index.tsx)
    // and components/services are in 'src/'. This setup generally works fine without
    // special pageExtensions in next.config.js as long as imports are relative.
  
    // Example for handling assets if they were not in 'public' or needed specific paths:
    // assetPrefix: process.env.NODE_ENV === 'production' ? '/my-cdn-path/' : '',
  
    // Example for environment variables if you need to expose more beyond NEXT_PUBLIC_
    // env: {
    //   CUSTOM_ENV_VAR: process.env.CUSTOM_ENV_VAR,
    // },
  
    // Add any other Next.js specific configurations here as needed.
    // For example, if you want to use the experimental App Router in Next.js 13+
    // experimental: {
    //   appDir: true,
    // },
  };
  
  module.exports = nextConfig;