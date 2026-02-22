import { createRequire } from "module";

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer"),
    };

    return config;
  },
};

export default nextConfig;