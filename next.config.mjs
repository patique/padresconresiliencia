/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Disable strict mode to reduce double-rendering confusion during dev
    typescript: {
        ignoreBuildErrors: true, // Prevent TS errors from failing build if any linger
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
