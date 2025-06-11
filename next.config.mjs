/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      // Add http version for Cloudinary to handle both protocols
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      // Add webxnep.com for logo images
      {
        protocol: 'https',
        hostname: 'webxnep.com',
        port: '',
        pathname: '/logo/**',
      },
      {
        protocol: 'https',
        hostname: 'worldexpeditions.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow both http and https protocols for images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  // Enable production browser source maps for better debugging
  productionBrowserSourceMaps: true,
};

export default nextConfig;
